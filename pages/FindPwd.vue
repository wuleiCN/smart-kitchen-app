<template>
	<view class="content">
		<u-navbar :is-back="true" :back-icon-size="50" :border-bottom="false" />
		<view class="uform">
			<view class="findPwd">
				<u-field v-model="iphone" :error-message="errMsg" label-width="0"
					placeholder-style="color: #bbbbbb;fontSize: 30rpx" placeholder="请输入手机号" trim />
			</view>
			<view class="findPwd">
				<u-field v-model="iphCode" label-width="0" :error-message="iphMsg" placeholder-style="color: #bbbbbb;fontSize: 30rpx"
					placeholder="请输入验证码" trim>
					<u-button size="mini" slot="right" @click="getCode">{{codeText}}
					</u-button>
				</u-field>
				<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
			</view>
			<view class="findPwd">
				<u-field v-model="password" :error-message="pwdMsg" :password="true" label-width="0"
					placeholder-style="color: #bbbbbb;fontSize: 30rpx" placeholder="请输入密码" trim />
			</view>
			<view class="findPwd">
				<u-field v-model="isPassword" :error-message="pswMsg" :password="true" label-width="0"
					placeholder-style="color: #bbbbbb;fontSize: 30rpx" placeholder="请再次输入密码" trim />
			</view>
		</view>
		<button class="sign_ck" @tap="sendCode" :disabled="isTure">下一步</button>
	</view>
</template>

<script>
	// import { mapState } from "vuex";
	export default {
		data() {
			return {
				codeText: '',
				iphone: '',
				iphCode: '',
				password: '',
				isPassword: '',
				errMsg: '',
				iphMsg: '',
				pwdMsg: '',
				pswMsg: '',
				isTure: true
			}
		},
		onLoad(e) {

		},
		onShow() {

		},
		computed: {

		},
		watch: {
			iphone: {
				handler(e) {
					this.errMsg = ""
					this.isTure = true
					if (e === '') this.errMsg = "请输入手机号"
					if (!this.$u.test.mobile(e)) this.errMsg = "请输入正确的手机号"
					else this.isTure = false
				}
			},
			iphCode: {
				handler(e) {
					this.iphMsg = ""
					if (!this.$u.test.code(e, 4)) this.iphMsg = "请输入正确都验证码"
				}
			},
			password: {
				handler(e) {
					this.pwdMsg = ""
					if (e === '') this.pwdMsg = "请输入密码"
					if (!this.$u.test.rangeLength(e, [6, 24])) this.pwdMsg = "密码长度为6-24字符"
				}
			},
			isPassword: {
				handler(e) {
					this.pswMsg = ""
					if (e === '') this.pswMsg = "请再次输入密码"
					if (e !== this.password) this.pswMsg = "请输入正确的密码"
				}
			},
			deep: true
		},
		methods: {
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		// background: #19BE6B;
		background: #FFFFFF !important;
		height: 100vh;
	}

	.uform {
		margin-top: 60rpx;
	}

	::v-deep .findPwd {
		display: flex;
		justify-content: space-between;

		.u-icon {
			width: 88rpx;
			height: 88rpx;
			margin-left: 10rpx;

			.u-icon__icon {
				font-size: 54rpx !important;
				color: #bbbbbb;
				margin-left: 50%;
				transform: translateX(-50%);
			}
		}

		.u-field {
			flex: 1;
			padding: 20rpx 0;
			margin: 0 30rpx;

			.u-btn {
				height: 24rpx;
				color: #FC7930 !important;
			}

			.u-hairline-border:after {
				border: 0;
				border-left: 2rpx solid #FC7930 !important;
				border-radius: 0;
			}
		}
	}

	.sign_ck {
		width: 702rpx;
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
</style>
