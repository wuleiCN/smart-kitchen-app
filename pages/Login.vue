<template>
	<view class="content">
		<view class="Logon">
			<u-image width="100%" height="150rpx" src="/static/logon.png" mode="aspectFit" />
		</view>
		<u-form :model="model" :rules="rules" ref="uForm">
			<u-form-item label-position="left" :border-bottom="false" label="账号:" :label-style="{color: '#fff'}" label-align="center"
			 label-width="135" prop="account">
				<u-input :password-icon="true" :trim="true" :border="true" v-model="model.account " placeholder="请输入账号"></u-input>
			</u-form-item>
			<u-form-item label-position="left" :border-bottom="false" :label-style="{color: '#fff'}" label-align="center"
			 label-width="135" label="密码:" prop="password">
				<u-input :password-icon="true" :trim="true" :border="true" type="password" v-model="model.password" placeholder="请输入密码"></u-input>
			</u-form-item>
		</u-form>
		<u-button type="success" shape="square" :custom-style="customStyle" @tap="login">确 定</u-button>
		<view class="register">
			<a>注册新用户</a>
			<a>忘记密码</a>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				model: {
					account: '',
					password: ''
				},
				user: uni.getStorageSync('userInfo'),
				customStyle: {
					margin: '5px 15px',
					'font-size': '19px'
				},
				rules: {
					account: [{
						required: true,
						message: '请输入账号',
						trigger: ['blur', 'change']
					}],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['blur', 'change']
						},
						{
							min: 6,
							max: 12,
							message: '长度在6-12之间',
							trigger: ['change', 'blur']
						}
					]
				}
			}
		},
		onLoad() {
			if (this.user !== '') {
				// this.user = ''
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		computed: {
			...mapState(["vuex_token"])
		},
		methods: {
			login() {
				this.$refs.uForm.validate(async vaild => {
					if(vaild) {
						const res = await this.$u.api.Login({
							username: this.model.account,
							password: this.model.password
						}).catch(err => {
							console.log(err)
						})
						if (!res.success) {
							this.$u.toast(res.message + ', 请重新登录');
						}
						if (res !== undefined) {
							uni.setStorageSync('token', res.Token)
							const info = await this.$u.api.getInfo().catch(err => {
								console.log(err)
							})
							console.log(info)
							if (info !== undefined) {
								uni.setStorageSync('userInfo', info)
								this.getDictionary()
								uni.switchTab({
									url: '/pages/index/index'
								});
							}
						} else {
							this.$u.toast('发生错误，请重新登陆！')
							return false
						}
					}
				})
			},
			// 数据字典
			getDictionary() {
				// 设备类别
				this.$u.api.getDeviceType().then(res => {
					uni.setStorageSync('DeviceType', res)
				}).catch(err => {})
				// 设备状态
				this.$u.api.getDeviceStatus().then(res => {
					uni.setStorageSync('DeviceStatus', res)
				}).catch(err => {})
				// 摄像机/NVR品牌
				this.$u.api.getCameraBrand().then(res => {
					uni.setStorageSync('CameraBrand', res)
				}).catch(err => {})
				// 公司类别
				this.$u.api.getCompanyType().then(res => {
					uni.setStorageSync('CompanyType', res)
				}).catch(err => {})
				// 公司状态
				this.$u.api.getCompanyStatus().then(res => {
					uni.setStorageSync('CompanyStatus', res)
				}).catch(err => {})
				// 客户状态
				this.$u.api.getCustomerStatus().then(res => {
					uni.setStorageSync('CustomerStatus', res)
				}).catch(err => {})
				// 员工类别
				this.$u.api.getEmployeeType().then(res => {
					uni.setStorageSync('EmployeeType', res)
				}).catch(err => {})
				// 员工状态
				this.$u.api.getEmployeeStatus().then(res => {
					uni.setStorageSync('EmployeeStatus', res)
				}).catch(err => {})
				// 工单类别
				this.$u.api.getOrderType().then(res => {
					uni.setStorageSync('OrderType', res)
				}).catch(err => {})
				// 工单状态
				this.$u.api.getOrderStatus().then(res => {
					uni.setStorageSync('OrderStatus', res)
				}).catch(err => {})
				// 设备类别
				this.$u.api.GetAllModle().then(res => {
					uni.setStorageSync('GetAllModle', res)
				})
				// 客户单位列表
				this.$u.api.getCustomersList().then(res => {
					uni.setStorageSync('GetCustomersList', res)
				}).catch(() => {})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		height: 100vh;
		background-image: linear-gradient(-45deg, rgb(115, 108, 260), rgb(40, 200, 160)) !important;

		::v-deep .u-form-item--right {
			margin-right: 30rpx;
		}
	}

	.Logon {
		width: 100%;
		height: 340rpx;

		::v-deep .u-image {
			transform: translateY(80%);
		}
	}

	::v-deep .u-input__input {
		color: #FFFFFF;
	}

	.register {
		display: flex;
		justify-content: space-around;

		a {
			font-size: 16px;
			color: #f4f4f4
		}
	}
</style>
