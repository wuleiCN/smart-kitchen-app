<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="设备出库"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="scan u-flex u-row-around">
			<view class="describe u-flex-col">
				<text>扫码设备条码/二维码</text>
				<text>或输入设备编号</text>
			</view>
			<u-image width="180rpx" height="180rpx" src="/static/tabbar/Scanning-code.png" shape="circle" @click="scan"></u-image>
		</view>
		<view class="code u-flex">
			<text>设备编码：</text>
			<u-input v-model="scanCode" type="text" />
			<u-button type="success" size="medium" @click="distributeByCode">确定</u-button>
		</view>
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">出库设备</span>
		</view>
		<view class="info u-flex-col">
			<span><strong>设备型号：</strong>{{device.model}}</span>
			<span><strong>设备类别：</strong></span>
			<span><strong>设备编码：</strong></span>
			<span><strong>设备状态：</strong></span>
		</view>
		<u-modal v-model="show" :content="content" @confirm="define"></u-modal>
		<u-modal v-model="distributeShow" :content="distributeContent" show-cancel-button @confirm="distributed"></u-modal>
	</view>
</template>

<script>
	import permision from "@/common/permission.js"
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				optionId: '',
				scanCode: '',
				device: {
					model: ''
				},
				show: false,
				content: '',
				distributeShow: false,
				distributeContent: '确定要出库吗？',
				Code: ''
			}
		},
		onLoad(option) {
			this.optionId = option.id
		},
		methods: {
			// 编码出库
			distributeByCode() {
				if (this.scanCode.length === 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入设备编码!'
					})
					return;
				}

				this.$u.api.orderSaleDeviceDistributeByCode({
					order: this.optionId,
					code: this.scanCode
				}).then(res => {
					if(res.success === true) {
						this.show = true
						this.content = '设备出库成功！'
					} else {
						this.show = true
						this.content = '设备出库失败！' + res.message
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '出现错误！'
					})
				})
			},
			define() {
				this.content = ''
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
			distributed() {
				this.$u.api.orderSaleDeviceDistribute({code: this.Code}).then(res => {
					if(res.success !== 'false') {
						uni.showToast({
							title: '出库成功！'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '出库失败！'
						})
					}
					console.log(res)
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '出库失败！'
					})
				})
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
	.scan {
		width: 100%;
		height: 240rpx;
		background: #FFFFFF;

		.describe {
			text:nth-child(1) {
				font-size: 36rpx;
				font-weight: 600;
				display: block;
				margin-bottom: 5rpx;
				color: #666666;
			}

			text:nth-child(2) {
				color: $u-tips-color;
				font-size: 30rpx;
			}
		}
	}

	.code {
		width: 100%;
		height: 80rpx;
		background: #ffffff;
		padding: 0 30rpx;
		border-top: 1rpx solid #eeeeee;
		border-buttom: 1rpx solid #eeeeee;

		text {
			font-size: 30rpx;
			color: #666666;
		}

		::v-deep .u-btn {
			width: 116rpx;
		}
	}

	.section {
		z-index: 9;
		position: sticky;
		width: 100%;
		height: 80rpx;
		background: #FFFFFF;
		border-bottom: 1px solid #f3f3f3;
		box-shadow: 6rpx 1rpx 6rpx rgba(0, 0, 0, 0.1);

		._title {
			height: 80rpx;
			margin-left: 20rpx;
		}

		.line {
			height: 30rpx;
			border-radius: 30%;
			border: 5rpx solid #0081ff;
			margin-left: 5%;
		}
	}

	.info {
		height: 260rpx;
		background: #FFFFFF;
		padding: 30rpx;

		span {
			padding-bottom: 10rpx;
		}
	}
</style>
