<template>
	<view class="content">
		<view class="Logon">
			<u-image width="100%" height="150rpx" src="/static/logon.png" mode="aspectFit"></u-image>
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
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		computed: {
			...mapState(["vuex_token"])
		},
		methods: {
			 login() {
				 uni
				this.$u.api.Login({username: this.model.account,password: this.model.password}).then(res => {
					uni.setStorageSync('token',res.Token)
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
				this.$u.api.getInfo().then(res => {
					uni.setStorageSync('userInfo',res)
					uni.switchTab({
					    url: '/pages/index/index'
					});
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		height: 100vh;
		background-image: linear-gradient(-45deg, rgb(115, 108, 260), rgb(40, 200, 160)) !important;

		::v-deep .u-form-item--right {
			margin-right: 15px;
		}
	}
	
	.Logon {
		width: 100%;
		height: 170px;
		::v-deep .u-image {
			transform: translateY(80%);
		}
	}
	::v-deep .u-input__input {
		color: #FFFFFF;
	}
</style>
