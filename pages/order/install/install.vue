<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="设备安装"
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
			<u-input v-model="Code" type="text" />
			<u-button type="success" size="medium" @click="distributeByCode">确定</u-button>
		</view>
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">设备安装信息</span>
		</view>
		<view class="code u-flex">
			<text>安装设备：</text>
			<u-input v-model="deviceName" type="text" />
		</view>
		<view class="code u-flex">
			<text>安装区域：</text>
			<u-input v-model="areaValue" type="select" :select-open="selectShow" @click="selectShow = true" />
		</view>
		<!-- 灭火设备 -->
		<view v-if="deviceNum && deviceNum == 2" class="code u-flex">
			<text>防 区：</text>
			<u-input v-model="sectorValue" type="text" />
		</view>
		<!-- 摄像机 -->
		<view v-if="deviceNum && deviceNum == 0">
			<view class="code u-flex u-row-between">
				<text>人脸智能：</text>
				<u-switch v-model="hasFaceAI" active-color="#19be6b"></u-switch>
			</view>
			<view class="code u-flex u-row-between">
				<text>485串口：</text>
				<u-switch v-model="hasSerial" active-color="#19be6b"></u-switch>
			</view>
		</view>
		<!-- nvr -->
		<view v-if="deviceNum && deviceNum == 3">
			<view class="code u-flex">
				<text>接入智能网关：</text>
				<u-input v-model="nvr.nvrValue" type="select" :select-open="nvr.nvrShow" @click="nvrClick" />
			</view>
			<view class="code u-flex">
				<text>设备IP地址：</text>
				<u-input v-model="nvr.ip" type="text" />
			</view>
			<view class="code u-flex">
				<text>登录账号：</text>
				<u-input v-model="nvr.username" type="text" />
			</view>
			<view class="code u-flex">
				<text>登录密码：</text>
				<u-input v-model="nvr.password" type="text" />
			</view>
			<view class="code u-flex">
				<text>登录端口：</text>
				<u-input v-model="nvr.port" type="text" />
			</view>
		</view>
		<!-- 智能网关 -->
		<view v-if="deviceNum && deviceNum == 4">
			<view class="code u-flex">
				<text>接入 NVR：</text>
				<u-input v-model="camera.cameraValue" type="select" :select-open="camera.cameraShow" @click="cameraClick" />
			</view>
			<view class="code u-flex">
				<text>设备IP地址：</text>
				<u-input v-model="camera.ip" type="text" />
			</view>
			<view class="code u-flex">
				<text>登录账号：</text>
				<u-input v-model="camera.username" type="text" />
			</view>
			<view class="code u-flex">
				<text>登录密码：</text>
				<u-input v-model="camera.password" type="text" />
			</view>
			<view class="code u-flex">
				<text>登录端口：</text>
				<u-input v-model="camera.port" type="text" />
			</view>
			<view class="code u-flex">
				<text>接入通道：</text>
				<u-input v-model="camera.channel" type="text" />
			</view>
			<view class="code u-flex u-row-between">
				<text>人脸识别：</text>
				<u-switch v-model="camera.face" active-color="#19be6b"></u-switch>
			</view>
			<view class="code u-flex u-row-between">
				<text>人体识别：</text>
				<u-switch v-model="camera.human" active-color="#19be6b"></u-switch>
			</view>
		</view>
		<u-select mode="single-column" :list="camera.cameraList" v-model="camera.cameraShow" value-name="Id" label-name="Code" @confirm="cameraConfirm" />
		<u-select mode="single-column" :list="nvr.nvrList" v-model="nvr.nvrShow" value-name="Id" label-name="Name" @confirm="nvrConfirm" />
		<u-select mode="single-column" :list="areas" v-model="selectShow" value-name="Id" label-name="Name" @confirm="areasConfirm" />
		<u-modal v-model="installShow" :content="installContent" show-cancel-button @confirm="installed" />
		<u-modal v-model="scanShow" :content="installContent" title="扫描成功" show-cancel-button @confirm="installed" />
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
				nvr: {
					nvrValue: '',
					nvrShow: false,
					ip: '',
					username: '',
					password: '',
					port: null,
					nvrList: [],
					gateway: ''
				},
				camera: {
					cameraValue: '',
					cameraShow: false,
					ip: '',
					username: '',
					password: '',
					port: null,
					cameraList: [],
					channel: null,
					nvr: '',
					face: false,
					human: false
				},
				optionId: null,
				orderId: null,
				order: {},
				device: {},
				areas: [],
				areasId: null,
				Code: '',
				areaValue: '',
				nameValue: '',
				modelValue: '',
				deviceName: '',
				deviceValue: '',
				customerName: '',
				deviceNum: null,
				sectorValue: '',
				hasSerial: false,
				hasFaceAI: false,
				selectShow: false,
				deviceShow: false,
				modelShow: false,
				sectorShow: false,
				installShow: false,
				scanShow: false,
				installContent: '确定要安装该设备吗？'
			}
		},
		onLoad(option) {
			// this.optionId = option.id
			this.deviceNum = option.type
			this.orderId = option.order
			this.$u.api.getById({
				id: option.deviceId
			}).then(res => {
				this.device = res
				this.deviceName = res.Name
				console.log(res)
			}).catch(err => {})
			// 获得指定客户区域信息
			setTimeout(() => {
				this.$u.api.getAreasByCustomer({
					// customer: this.device.CustomerId
					customer: "2f487e80-0fd6-412d-a0d8-45a3ed183d62"
				}).then(res => {
					this.areas = res
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}, 300)
		},
		mounted() {

		},
		methods: {
			nvrClick() {
				this.$u.api.getByGatewaysCompany().then(res => {
					this.nvr.nvrList = res
					console.log(res)
				}).catch(err => {})
				this.nvr.nvrShow = true
			},
			nvrConfirm(e) {
				this.nvr.nvrValue = '';
				this.nvr.gateway = e[0].value
				console.log(e)
				e.map((val, index) => {
					this.nvr.nvrValue += this.nvr.nvrValue == '' ? val.label : '-' + val.label;
				})
			},
			cameraClick() {
				this.$u.api.getByNvrsCompany().then(res => {
					this.camera.cameraList = res
					console.log(res)
				}).catch(err => {})
				this.camera.cameraShow = true
			},
			cameraConfirm(e) {
				this.camera.cameraValue = '';
				this.camera.nvr = e[0].value
				console.log(e)
				e.map((val, index) => {
					this.camera.cameraValue += this.camera.cameraValue == '' ? val.label : '-' + val.label;
				})
			},
			// 扫描安装
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
			// 输入编码安装
			distributeByCode() {
				if (!this.device) {
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
				this.installShow = true
			},
			installed() {
				console.log(this.deviceNum)
				if (this.deviceNum !== null) {
					switch (this.deviceNum) {
						// 智能网关设备安装
						case '0':
							this.$u.api.InstallGateway({
								order: this.orderId,
								code: this.Code,
								name: this.deviceName,
								area: this.areasId,
								hasFaceAI: this.hasFaceAI,
								hasSerial: this.hasSerial
							}).then(res => {
								this.finishCB(res)
								console.log(res)
							}).catch(err => {})
							break;
							// 报警设备安装
						case '1':
							this.$u.api.InstallAlertDevice({
								order: this.orderId,
								code: this.Code,
								name: this.deviceName,
								area: this.areasId
							}).then(res => {
								this.finishCB(res)
								console.log(res)
							}).catch(err => {})
							break;
							// 灭火设备安装
						case '2':
							if (this.deviceName.indexOf('AT') !== -1) {
								this.$u.api.InstallFireDeviceCombineAlert({
									order: this.orderId,
									code: this.Code,
									name: this.deviceName,
									area: this.areasId
								}).then(res => {
									this.finishCB(res)
									console.log(res)
								}).catch(err => {})
							} else {
								this.$u.api.InstallFireDevice({
									order: this.orderId,
									code: this.Code,
									name: this.deviceName,
									// alert: this.device.AlertDeviceId,
									alert: "4c01b764-ca9e-4a8b-998b-6e3071592519",
									area: this.areasId
								}).then(res => {
									this.finishCB(res)
									console.log(res)
								}).catch(err => {})
							}
							break;
							// NVR设备安装
						case '3':
							this.$u.api.InstallGateway({
								order: this.orderId,
								code: this.Code,
								name: this.deviceName,
								area: this.areasId,
								ip: this.nvr.ip,
								username: this.nvr.username,
								password: this.nvr.password,
								port: this.nvr.port,
								gateway: this.nvr.gateway
							}).then(res => {
								this.finishCB(res)
								Object.assign(this.$data.nvr, this.$options.data().nvr)
								console.log(res)
							}).catch(err => {})
							break;
							// 摄像机设备安装
						case '4':
							this.$u.api.InstallGateway({
								order: this.orderId,
								code: this.Code,
								name: this.deviceName,
								area: this.areasId,
								ip: this.camera.ip,
								username: this.camera.username,
								password: this.camera.password,
								port: this.camera.port,
								nvr: this.camera.nvr,
								face: this.camera.face,
								human: this.camera.human
							}).then(res => {
								this.finishCB(res)
								Object.assign(this.$data.camera, this.$options.data().camera)
								console.log(res)
							}).catch(err => {})
							break;
					}
				}
			},
			// 安装完成
			finishCB(res) {
				if (res.success) {
					uni.showToast({
						title: '设备安装成功！'
					})
					this.Code = ''
					this.deviceName = ''
				} else {
					uni.showToast({
						icon: 'none',
						title: '设备安装失败！'
					})
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
			// 选择区域
			areasConfirm(e) {
				this.areaValue = '';
				this.areasId = e[0].value
				e.map((val, index) => {
					this.areaValue += this.areaValue == '' ? val.label : '-' + val.label;
				})
			},
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
</style>
