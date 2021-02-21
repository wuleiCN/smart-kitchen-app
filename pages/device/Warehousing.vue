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
		<view class="code u-flex" v-if="modelInput">
			<text>设备型号：</text>
			<u-input v-model="modelValue" type="select" :select-open="modelShow" :border-top="true"
			 placeholder="请选择型号" @click="modelShow = true" />
		</view>
		<view class="code u-flex">
			<text>通讯号码：</text>
			<u-input v-model="ComNumber" :border-bottom="true" placeholder="请输入通讯号码" />
		</view>
		<view class="code u-flex" v-if="CMValue && CMValue[0].value === 2 && CMValue[0].label.indexOf('AT') !== -1">
			<text>报警设备型号：</text>
			<u-input v-model="modelNum" :border-bottom="true" placeholder="请输入报警设备型号" />
		</view>
		<view class="code u-flex" v-if="CMValue && CMValue[0].value === 2 && CMValue[0].label.indexOf('AT') !== -1">
			<text>报警设备防区：</text>
			<u-input v-model="deviceArea" :border-bottom="true" placeholder="请输入报警设备防区" />
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
			<u-input v-model="Code" type="text" :border-top="true" />
			<u-button type="success" size="medium" @click="distributeByCode">确定</u-button>
		</view>
		<view>{{arrValue === null ? [] : arrValue[0].value}}</view>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" value-name="Type" label-name="TypeName"
		 @confirm="selectConfirm"></u-select>
		<u-select mode="single-column" :list="modelList" v-model="modelShow" value-name="Type" label-name="Name" @confirm="CMJSConfirm" />
		<u-modal v-model="warehousShow" :content="warehousContent" show-cancel-button @confirm="warehoused" />
		<u-modal v-model="scanShow" :content="warehousContent" title="扫描成功" show-cancel-button @confirm="warehoused" />
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
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				selectShow: false,
				modelShow: false,
				modelInput: false,
				modelNum: '',
				deviceArea: '',
				deviceValue: '',
				modelValue: '',
				// 通讯号码
				ComNumber: null,
				warehousContent: '确定要入库设备吗？',
				// 入库设备标识
				arrValue: null,
				CMValue: null,
				Code: '',
				warehousShow: false,
				scanShow: false,
				selectList: [],
				modelList: [],
				CMJS: [],
				camera: [],
				EC: []
			}
		},
		onShow() {
			this.$u.api.DeviceModelsList().then(res => {
				res.map(v => v.extra = v.Id)
				this.CMJS = res.filter(v => v.Type === 2)
				this.camera = res.filter(v => v.Type === 4)
				this.EC = res.filter(v => v.Type === 1)
				this.filterObj(res)
				this.selectList = res
				console.log(res)
			}).catch(err => {})
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
						this.Code = res.result
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
				if (this.Code.length === 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入设备编码!'
					})
					return;
				}
				if (this.ComNumber.length === 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入通讯号码!'
					})
					return;
				}
				this.warehousShow = true
			},
			// 确定入库
			warehoused() {
				if (this.arrValue !== null) {
					switch (this.arrValue[0].value) {
						// 智能网关设备入库
						case 0:
							this.$u.api.StockInGateway({
								ComNumber: this.ComNumber,
								ModelId: this.arrValue[0].extra,
								Code: this.Code
							}).then((res) => {
								this.finishCB(res)
								console.log(res);
							}).catch(err => {
								console.log(err);
							})
							break;
							// 报警设备入库
						case 1:
							this.$u.api.StockInAlertDevice({
								ComNumber: this.ComNumber,
								ModelId: this.CMValue[0].extra,
								Code: this.Code
							}).then((res) => {
								this.finishCB(res)
								console.log(res);
							}).catch(err => {
								uni.showToast({
									icon: 'none',
									title: '发生错误!'
								})
								console.log(err);
							})
							break;
							// 灭火设备入库
						case 2:
							if (this.CMValue[0].label.indexOf('AT') !== -1) {
								// 灭火设备入库（集成报警设备）
								this.$u.api.StockInFireDeviceWithAlert({
									ComNumber: this.ComNumber,
									ModelId: this.CMValue[0].extra,
									AlertDeviceModel: this.modelNum,
									DefenceAreaNo: this.deviceArea,
									Code: this.Code
								}).then((res) => {
									this.finishCB(res)
									console.log(res);
								}).catch(err => {
									console.log(err);
								})
							} else {
								// 灭火设备入库（未集成报警设备）
								this.$u.api.StockInFireDevice({
									ComNumber: this.ComNumber,
									ModelId: this.CMValue[0].extra,
									Code: this.Code
								}).then((res) => {
									this.finishCB(res)
									console.log(res);
								}).catch(err => {
									console.log(err);
								})
							}

							break;
							// NVR设备入库
						case 3:
							this.$u.api.StockInNvr({
								ComNumber: this.ComNumber,
								ModelId: this.arrValue[0].extra,
								Code: this.Code
							}).then((res) => {
								this.finishCB(res)
								console.log(res);
							}).catch(err => {
								console.log(err);
							})
							break;
							// 摄像机设备入库
						case 4:
							this.$u.api.StockInCamera({
								ComNumber: this.ComNumber,
								ModelId: this.arrValue[0].extra,
								Code: this.Code
							}).then((res) => {
								this.finishCB(res)
								console.log(res);
							}).catch(err => {
								console.log(err);
							})
							break;
					}
				}
			},
			finishCB(res) {
				if (res.success) {
					uni.showToast({
						title: '设备入库成功！'
					})
					this.ComNumber = ''
					this.Code = ''
				} else {
					uni.showToast({
						icon: 'none',
						title: '设备入库失败！'
					})
					this.ComNumber = ''
					this.Code = ''
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
				this.deviceValue = ''
				this.modelValue = ''
				this.ComNumber = ''
				this.Code = ''
				this.arrValue = e
				console.log(e)
				e.map((val, index) => {
					this.deviceValue += this.deviceValue == '' ? val.label : '-' + val.label;
				})
				if (e[0].value === 2) {
					this.modelList = this.CMJS
					this.modelInput = true
					console.log(2)
				} else if (e[0].value === 1) {
					this.modelList = this.EC
					this.modelInput = true
				} else if (e[0].value === 4) {
					this.modelList = this.camera
					this.modelInput = true
				} else {
					this.modelList = []
					this.modelInput = false
					return
				}
			},
			CMJSConfirm(e) {
				this.modelValue = '';
				this.CMValue = e
				this.modelNum = e[0].extra
				console.log(e,this.modelNum)
				e.map((val, index) => {
					this.modelValue += this.modelValue == '' ? val.label : '-' + val.label;
				})
			},
			// 去重
			filterObj(objcArray) {
				for (var i = 0; i < objcArray.length; i++) {
					for (var j = i + 1; j < objcArray.length;) {
						if (objcArray[i].Type === objcArray[j].Type) { //通过type属性进行匹配；
							objcArray.splice(j, 1); //去除重复的对象；
						} else {
							j++;
						}
					}
				}
				return objcArray;
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
