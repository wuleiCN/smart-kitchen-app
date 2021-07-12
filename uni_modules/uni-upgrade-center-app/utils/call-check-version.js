export default function() {
	// #ifdef APP-PLUS
	return new Promise((resolve, reject) => {
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			console.log(plus.runtime.appid);
			console.log(plus.runtime.version);
			uniCloud.callFunction({
				name: 'check-version',
				data: {
					appid: 'uni.UNI9D024B4',
					appVersion: '1.1.0',
					wgtVersion: widgetInfo.version
				},
				success: (e) => {
					resolve(e)
				},
				fail: (error) => {
					reject(error)
				}
			})
		})
	})
	// #endif
	// #ifndef APP-PLUS
	return new Promise((resolve, reject) => {
		reject({
			message: '请在App中使用'
		})
	})
	// #endif
}
