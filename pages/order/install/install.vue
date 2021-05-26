<template>
	<view class="content">
		<u-navbar :is-back="true" title="设备出库" :title-width="300" />
		<view class="card">
			<view class="circle" @click="scan">
				<u-image src="@/static/order/scan_B.png" width="78" height="78" />
			</view>
			<view class="text">
				扫码设备条码/二维码
			</view>
		</view>
		<u-modal v-model="show" :content="content" @confirm="confirm" />
		<Modal />
	</view>
</template>

<script>
	import permision from "@/common/permission.js"
	import Modal from "@/pages/components/modal.vue"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				optionId: '',
				show: false,
				Code: '',
				content: '',
				type: ''
			}
		},
		onLoad(option) {
			this.optionId = option.order
			this.modelId = option.model
			this.type = option.type
			console.log(option.model);
		},
		methods: {
			getDevice(res) {
				this.$u.api.complexfindById({
					device: res.result
				}).then(r => {
					if (r.success) {
						if (r.data.Model === this.modelId) {
							this.Code = res.result
							this.content = '扫码成功!'
							this.show = true
						} else {
							this.content = '设备型号不一致'
							this.show = true
						}
					} else {
						this.content = '扫码失败'
						this.show = true
					}
					console.log(r);
				})
			},
			// 出库设备详情
			confirm() {
				if (this.Code !== '') {
					this.$u.route('pages/order/install/deviceDelivery', {
						code: this.Code,
						order: this.optionId,
						type: this.type
					})
				}
			},
			// 扫码出库
			async scan() {
				// #ifdef APP-PLUS
				const status = await this.checkPermission()
				if (status !== 1) {
					return;
				}
				// #endif
				uni.scanCode({
					success: (res) => {
						this.getDevice(res)
						console.log(res);
					},
					fail: (err) => {
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.camera'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要使用您的相机，请在设置界面打开相关权限',
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
			},
			// 相机权限
			async checkPermission(code) {
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
		}
	}
</script>

<style scoped lang="scss">
	.card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 20%;
		width: 702rpx;
		height: 395rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		background: #FFFFFF;
		border-radius: 20rpx;

		.circle {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 204rpx;
			height: 204rpx;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 35rpx 0rpx rgba(252, 121, 48, 0.23);
			border-radius: 50%;
		}

		.text {
			width: 313rpx;
			height: 66rpx;
			line-height: 66rpx;
			margin-top: 43rpx;
			text-align: center;
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 600;
			color: #000000;
		}
	}
</style>
