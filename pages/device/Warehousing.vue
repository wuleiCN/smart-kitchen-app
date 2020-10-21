<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="入库信息"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">设备入库信息</span>
		</view>
		<view class="code u-flex">
			<text>入库设备：</text>
			<u-input v-model="deviceValue" type="select" :select-open="selectShow" :border-top="true" placeholder="请选择设备" @click="selectShow = true" />
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
			<u-input v-model="scanCode" type="text" :border-top="true" />
			<u-button type="success" size="medium" @click="distributeByCode">确定</u-button>
		</view>
		<view>{{arrValue === null ? [] : arrValue[0].value}}</view>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-modal v-model="warehousShow" :content="warehousContent" show-cancel-button @confirm="warehoused"></u-modal>
		<u-modal v-model="scanShow" :content="warehousContent" title="扫描成功" show-cancel-button @confirm="warehoused"></u-modal>
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
				selectShow: false,
				deviceValue: '',
				scanCode: '',
				warehousContent: '确定要入库设备吗？',
				// 入库设备标识
				arrValue: null,
				ModelId: '',
				warehousShow: false,
				scanShow: false,
				selectList: [{
						value: 1,
						label: '报警设备入库'
					},
					{
						value: 2,
						label: '灭火设备入库（未集成报警设备）'
					},
					{
						value: 3,
						label: '灭火设备入库（集成报警设备）'
					},
					{
						value: 4,
						label: '智能网关设备入库'
					},
					{
						value: 5,
						label: 'NVR设备入库'
					},
					{
						value: 6,
						label: '摄像机设备入库'
					}
				]
			}
		},
		onShow() {

		},
		methods: {
			// 扫描入库
			async scan() {
				if (this.deviceValue === '') {
					uni.showToast({
						icon: 'none',
						title: '请先选择需要入库的设备名称!'
					})
					return;
				}
				// #ifdef APP-PLUS
				const status = await this.checkPermission()
				if (status !== 1) {
					return;
				}
				// #endif
				uni.scanCode({
					success: (res) => {
						this.scanShow = true
						this.ModelId = res.result
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
			// 输入编码入库
			distributeByCode() {
				if (this.deviceValue === '') {
					uni.showToast({
						icon: 'none',
						title: '请先选择需要入库的设备名称!'
					})
					return;
				}
				if (this.scanCode.length === 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入设备编码!'
					})
					return;
				}
				this.warehousShow = true
			},
			// 确定入库
			warehoused() {
				if (this.arrValue !== null) {
					switch (this.arrValue[0].value) {
						// 报警设备入库
						case 1:
							this.$u.api.StockInAlertDevice({ModelId:this.ModelId}).then((res) => {
								console.log(res);
							}).catch(err => {
								console.log(err);
							})
							break;
							// 灭火设备入库（未集成报警设备）
						case 2:
							this.$u.api.StockInFireDevice({
								ModelId: '8b69df5f-2991-43cd-b2d7-cb430f4f3b26',
								Code: ''
							}).then((res) => {
								console.log(res);
							}).catch(err => {
								console.log(err);
							})
							break;
							// 灭火设备入库（集成报警设备）
						case 3:
							this.$u.api.StockInFireDeviceWithAlert({
								AlertDeviceModel: 'c4e01995-3139-445d-ab9a-59cdeb09fd30',
								ComNumber: 13907310001,
								DefenceAreaNo: '',
								ModelId: '2370bf13-513c-4f1b-a643-947d2438147f',
								Code: ''
							}).then((res) => {
								console.log(res);
							}).catch(err => {
								console.log(err);
							})
							break;
							// 智能网关设备入库
						case 4:
							this.$u.api.StockInGateway({
								ModelId: '2bb8951b-2b17-4654-abc6-74cf849aaafc',
								Code: ''
							}).then((res) => {
								console.log(res);
							}).catch(err => {
								console.log(err);
							})
							break;
							// NVR设备入库
						case 5:
							this.$u.api.StockInNvr({
								ComNumber: 13907310001,
								ModelId: '596f6d62-c82c-47b2-b47e-259ef6567846',
								Code: ''
							}).then((res) => {
								console.log(res);
							}).catch(err => {
								console.log(err);
							})
							break;
							// 摄像机设备入库
						case 6:
							this.$u.api.StockInCamera({
								ComNumber: 13907310001,
								ModelId: '8c1a55f9-66e3-47a5-9400-ead84b1fd7c2',
								Code: ''
							}).then((res) => {
								console.log(res);
							}).catch(err => {
								console.log(err);
							})
							break;
					}
				}
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
				this.deviceValue = '';
				this.arrValue = e
				e.map((val, index) => {
					this.deviceValue += this.deviceValue == '' ? val.label : '-' + val.label;
				})
			}
		}

	}
</script>

<style scoped lang="scss">
	.content {
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
	}
</style>
