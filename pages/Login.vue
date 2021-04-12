<template>
	<view class="content">
		<view class="Login">
			<u-image width="100%" height="150rpx" src="/static/Logo.png" mode="aspectFit" />
		</view>
		<view class="circle"></view>
		<view v-show="isPwd" class="Login_pwd">
			<u-form :model="model" ref="uForm">
				<u-form-item lable="+86" prop="account" :border-bottom="false">
					<u-input v-model="model.account" type="text" border placeholder="请输入手机号/用户名"
						placeholder-style="color: #CCCCCC;fontSize: 28rpx" trim />
				</u-form-item>
				<u-form-item prop="password" :border-bottom="false">
					<u-input v-model="model.password" type="password" border placeholder="请输入密码"
						placeholder-style="color: #CCCCCC;fontSize: 28rpx" trim />
				</u-form-item>
			</u-form>
			<view class="sign">
				<a @tap="ckSms">短信验证登录</a>
				<a @tap="findPwd">忘记密码</a>
			</view>
			<button class="sign_ck" @tap="login">确 定</button>
			<view class="register">
				<span>还没有账号？</span>
				<a>立即注册</a>
			</view>
		</view>
		<view v-show="!isPwd" class="Login_pwd">
			<u-form :model="model" ref="uFormB">
				<u-form-item lable="+86" prop="iphone" :border-bottom="false">
					<u-input v-model="model.iphone" type="text" border placeholder="请输入手机号/用户名"
						placeholder-style="color: #CCCCCC;fontSize: 28rpx" trim />
				</u-form-item>
				<u-form-item lable="+86" :border-bottom="false">
					<u-field label-width="0" placeholder-style="color: #CCCCCC;fontSize: 28rpx"
						placeholder="请输入验证码" :border-bottom="false" trim>
						<u-button size="mini" slot="right" @click="getCode">{{codeText}}
						</u-button>
					</u-field>
					<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
				</u-form-item>
			</u-form>
			<button class="sign_ck" @tap="sendCode" :disabled="isTure">
				获取短信验证码</button>
			<view class="register">
				<a @click="ckPwd">返回密码登录</a>
			</view>
		</view>
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
					password: '',
					iphone: ''
				},
				smsMsg: '',
				codeText: '',
				isPwd: true,
				isTure: true,
				user: uni.getStorageSync('userInfo'),
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
					],
					iphone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
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
			this.$refs.uFormB.setRules(this.rules);
		},
		watch: {
			'model.iphone': {
				handler(e) {
					this.model.iphMsg = ""
					this.isTure = true
					if (this.$u.test.mobile(e)) this.isTure = false
					console.log(e, this.isTure);
				}
			},
			deep: true
		},
		computed: {
			...mapState(["vuex_token"])
		},
		methods: {
			async login() {
				if (this.model.account === '' && this.model.password === '') {
					this.$u.toast('请输入用户名或密码')
				} else {
					const res = await this.$u.api.Login({
						username: this.model.account,
						password: this.model.password
					}).catch(err => {
						console.log(err)
					})
					console.log(res);
					if (!res.success) {
						this.$u.toast(res.message + ', 请重新登录');
					}
					if (res !== undefined) {
						uni.setStorageSync('token', res.data.Token)
						const info = await this.$u.api.getInfo().catch(err => {
							console.log(err)
						})
						console.log(info)
						if (info !== undefined) {
							uni.setStorageSync('userInfo', info.data)
							this.getDictionary()
							uni.switchTab({
								url: '/pages/index/index'
							});
						} else {
							this.$u.toast('发生错误，请重新登陆！')
							return false
						}
					} else {
						this.$u.toast('发生错误，请重新登陆！')
						return false
					}
				}
			},
			ckSms() {
				this.isPwd = false
			},
			ckPwd() {
				this.isPwd = true
			},
			// 忘记密码
			findPwd() {
				this.$u.route('pages/FindPwd')
			},
			// 发送验证码
			codeChange(text) {
				this.codeText = text;
			},
			sendCode() {},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 1000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			// sendCode() {
			// 	this.$u.route('pages/SendSms', {
			// 		params: JSON.stringify(this.model.iphone)
			// 	})
			// },
			// 数据字典
			getDictionary() {
				// 设备类别
				this.$u.api.getDeviceType().then(res => {
					if (res.success) uni.setStorageSync('DeviceType', res.data)
					console.log(res);
				}).catch(err => {})
				// 设备状态
				this.$u.api.getDevicestatus().then(res => {
					if (res.success) uni.setStorageSync('DeviceStatus', res.data)
					console.log(res);
				}).catch(err => {})
				// 摄像机/NVR品牌
				this.$u.api.getIpcsdk().then(res => {
					if (res.success) uni.setStorageSync('CameraBrand', res.data)
					console.log(res);
				}).catch(err => {})
				// 角色类别
				this.$u.api.getRoletype().then(res => {
					if (res.success) uni.setStorageSync('CompanyType', res.data)
					console.log(res);
				}).catch(err => {})
				// 角色状态
				this.$u.api.getRolestatus().then(res => {
					if (res.success) uni.setStorageSync('CompanyStatus', res.data)
					console.log(res);
				}).catch(err => {})
				// 用户类别
				this.$u.api.getUsertype().then(res => {
					if (res.success) uni.setStorageSync('EmployeeType', res.data)
					console.log(res);
				}).catch(err => {})
				// 用户状态
				this.$u.api.getUserstatus().then(res => {
					if (res.success) uni.setStorageSync('CustomerStatus', res.data)
					console.log(res);
				}).catch(err => {})
				// 工单类别
				this.$u.api.getOrderopertype().then(res => {
					if (res.success) uni.setStorageSync('OrderType', res.data)
					console.log(res);
				}).catch(err => {})
				// 工单状态
				this.$u.api.getOrderstatus().then(res => {
					if (res.success) uni.setStorageSync('OrderStatus', res.data)
					console.log(res);
				}).catch(err => {})
				// 客户单位列表
				this.$u.api.getCustomersList().then(res => {
					if (res.success) uni.setStorageSync('GetCompanyList', res.data)
					console.log(res);
				}).catch(() => {})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		height: 100vh;
		background: #FFFFFF !important;

		::v-deep .u-form-item--right {
			margin-right: 30rpx;
		}
	}

	::v-deep .Login {
		width: 100%;
		height: 377rpx;
		background-image: url(../static/NavBar.png);

		.u-image {
			transform: translateY(150%);
			z-index: 999;
		}
	}

	::v-deep .Login_pwd {
		margin-top: 50%;
		transform: translateY(-40%);
		z-index: 999;

		.u-form-item {
			width: 600rpx;
			height: 88rpx;
			background: #F2F2F2;
			border-radius: 20rpx;
			margin-left: 50%;
			transform: translateX(-50%);
			margin-top: 40rpx;
			padding: 0;

			.u-input,
			.u-input__input {
				width: 600rpx;
				height: 88rpx;
				border-radius: 20rpx;
			}

			.u-field {
				padding: 0 20rpx;
				height: 88rpx;
				line-height: 88rpx;

				.u-btn {
					height: 24rpx;
					background: #F2F2F2;
					color: #B3B3B3;
				}

				.u-hairline-border:after {
					border: 0;
					border-left: 2rpx solid #B3B3B3 !important;
					border-radius: 0;
				}
			}
		}
	}

	.sign {
		display: flex;
		justify-content: space-around;
		margin-top: 40rpx;

		a {
			font-size: 20rpx;
			color: #d5d5d5
		}
	}

	.register {
		margin-left: 50%;
		margin-top: 40rpx;
		text-align: center;
		transform: translateX(-50%);
		font-size: 32rpx;
		color: #CCCCCC;

		a {
			color: #919191;
		}
	}

	.sign_ck {
		width: 600rpx;
		height: 88rpx;
		font-size: 32rpx;
		background: #CCCCCC;
		border-radius: 20rpx;
		margin-top: 60rpx;
		color: #FFFFFF;
		background: #FB8D50;
		&:after {
			border: 0 !important;
		}
	}

	.circle {
		position: absolute;
		background: #FFFFFF;
		border-radius: 50%;
		width: 1500rpx;
		height: 1000rpx;
		top: 300rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
