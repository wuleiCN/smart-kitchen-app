<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="设备安装"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">订单信息</span>
		</view>
		<view class="info u-flex-col">
			<span><strong>客户名称：</strong>{{order.CustomerId}}</span>
			<span><strong>联系人：</strong>{{order.Contact}}</span>
			<span><strong>联系电话：</strong>{{order.Phone}}</span>
			<span><strong>销售说明：</strong>{{order.Comment}}</span>
		</view>
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
			<u-button type="success" size="medium">确定</u-button>
		</view>
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">设备基本信息</span>
		</view>
		<view class="info u-flex-col u-row-around">
			<span>设备型号：{{device}}</span>
			<span>设备类别：{{device}}</span>
			<span>设备编码：{{device}}</span>
		</view>
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">设备安装信息</span>
		</view>
		<view class="code u-flex">
			<text>安装区域：</text>
			<u-input v-model="areaValue" type="select" :select-open="selectShow" @click="selectShow = true" />
		</view>
		<view class="code u-flex">
			<text>设备名称：</text>
			<u-input v-model="nameValue" type="text" />
		</view>
		<view class="code u-flex">
			<text>报警设备：</text>
			<u-input v-model="deviceValue" type="select" :select-open="deviceShow" @click="deviceShow = true" />
		</view>
		<view class="code u-flex">
			<text>防区：</text>
			<u-input v-model="sectorValue" type="select" :select-open="sectorShow" @click="sectorShow = true" />
		</view>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-select mode="single-column" :list="deviceList" v-model="deviceShow" @confirm="deviceConfirm"></u-select>
		<u-select mode="single-column" :list="sectorList" v-model="sectorShow" @confirm="sectorConfirm"></u-select>
		<view class="_submit">
			<u-button type="success">提交安装信息</u-button>
		</view>
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
				order: {},
				device: {},
				areas: [],
				scanCode: '',
				areaValue: '',
				nameValue: '',
				deviceValue: '',
				sectorValue: '',
				selectShow: false,
				deviceShow: false,
				sectorShow: false,
				selectList: [],
				deviceList: [],
				sectorList: [],
				optionId: ''
			}
		},
		onLoad(option) {
			this.optionId = option.id
			// 获得指定客户信息
			this.$u.api.getCustomer({
				id: option.id
			}).then(res => {
				console.log(res)
			})
			// 获取销售信息
			this.$u.api.getOrderInfo({
				id: option.id
			}).then(res => {
				this.order = res
				console.log(res,this.order)
			}).catch(err => {})
			// 获得指定客户区域信息
			setTimeout(() => {
				this.$u.api.getAreasByCustomer({
					customer: this.order.CustomerId
				}).then(res => {
					this.areas = res
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},300)
		},
		methods: {
			async scan() {
				// #ifdef APP-PLUS
				const status = await this.checkPermission()
				if (status !== 1) {
					return;
				}
				// #endif
				uni.scanCode({
					success: (res) => {
						this.device = res.result
						console.log(res)
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
			},
			selectConfirm(e) {
				this.areaValue = '';
				e.map((val, index) => {
					this.areaValue += this.areaValue == '' ? val.label : '-' + val.label;
				})
			},
			deviceConfirm(e) {
				this.deviceValue = '';
				e.map((val, index) => {
					this.deviceValue += this.deviceValue == '' ? val.label : '-' + val.label;
				})
			},
			sectorConfirm(e) {
				this.sectorValue = '';
				e.map((val, index) => {
					this.sectorValue += this.sectorValue == '' ? val.label : '-' + val.label;
				})
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
		color: #666666;
		border-bottom: 1px solid #f5f5f5;

		span {
			padding-bottom: 10rpx;
		}
	}

	._submit {
		// width: 100%;
		// height: 110rpx;

		::v-deep .u-btn {
			margin: 30rpx 0 0;
		}
	}
</style>
