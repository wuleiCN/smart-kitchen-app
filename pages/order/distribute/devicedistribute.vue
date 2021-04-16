<template>
	<view class="content">
		<u-navbar :is-back="true" title="设备出库" :title-width="300" />
		<view class="card scan">
			<view class="circle">
				<u-image src="@/static/order/scan_B.png" width="78" height="78" />
			</view>
			<view class="text">
				扫码设备条码/二维码
			</view>
		</view>
		<view class="codeCard">
			<view class="card code" v-if="show">
				<view class="circle" @click="show = false">
					<u-image src="@/static/order/Nub.png" width="78" height="78" />
				</view>
				<view class="text">
					输入设备编号
				</view>
			</view>
			<view class="card code" v-else>
				<view class="codeInput">
					<u-input v-model="codeValue" placeholder="请输入设备编码" border border-color="#FC7930" />
					<u-button class="submit_ck" @click="toDeviceDelivery">更新</u-button>
				</view>
			</view>
		</view>
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
				deviceId: '',
				scanCode: '',
				show: true,
				codeValue: '',
				content: '',
				Code: ''
			}
		},
		onLoad(option) {
			this.optionId = option.order
			this.deviceId = option.device
		},
		methods: {
			toDeviceDelivery() {
				if (this.codeValue === '') {
					this.$u.toast('请输入设备编码')
					return false
				}
				this.$u.route('pages/order/distribute/deviceDelivery', {
					id: this.optionId,
					device: this.deviceId
				})
				console.log(this.codeValue);
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
						this.Code = res.result
						this.distributeShow = true
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

		.codeInput {
			display: flex;

			.u-input {
				width: 400rpx;
				height: 68rpx;
				background: #F5F5F5;
				border-radius: 10rpx;
			}

			.u-btn {
				color: #FFFFFF;
				width: 148rpx;
				height: 68rpx;
				padding: 0;
				margin-left: 20rpx;
				background: #FC7930;
				border-radius: 10rpx;
			}
		}
	}

	.scan {
		margin-top: 116rpx;
	}

	.code {
		margin-top: 24rpx;
	}
</style>
