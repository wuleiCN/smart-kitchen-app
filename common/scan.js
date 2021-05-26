import permision from "@/common/permission.js"
// 扫码出库
export const scaned = async (config) => {
	// #ifdef APP-PLUS
	const status = await checkPermission()
	if (status !== 1) {
		return;
	}
	// #endif
	uni.scanCode({
		success: (res) => {
			config(res) || false
		},
		fail: (err) => {
			// #ifdef MP
			uni.getSetting({
				success: (res) => {
					let authStatus = res.authSetting['scope.camera'];
					if (!authStatus) {
						uni.showModal({
							title: '授权失败',
							content: '精安智慧厨房需要使用您的相机，请在设置界面打开相关权限',
							success: (res) => {
								if (res.confirm) {
									uni.openSetting()
								}
							}
						})
					}
				}
			})
			// #endif
		}
	});
}
// 相机权限
async function checkPermission(code) {
	let status = permision.isIOS ? await permision.requestIOS('camera') :
		await permision.requestAndroid('android.permission.CAMERA');

	if (status === null || status === 1) {
		status = 1;
	} else {
		uni.showModal({
			content: "需要相机权限",
			confirmText: "设置",
			success: function(res) {
				if (res.confirm) {
					permision.gotoAppSetting();
				}
			}
		})
	}
	return status;
}
