<template>
	<view class="content">
		<u-navbar :is-back="true" :back-icon-size="50" title="登录获取验证码" :title-width="300" :title-size="40" title-bold title-color="#111" :border-bottom="false" />
		<view class="code">
			<p>输入验证码</p>
			<view class="tip">
				验证码已发送至 + {{Iphone}}
			</view>
			<u-message-input :value="snedMsg" mode="bottomLine" :focus="true" :bold="false" @finish="GitCode" @change="changeMsg" />
			<view v-show="errMsg" class="error base">
				密码错误，请重新输入
			</view>
			<view v-show="gitMsg" class="waitCode base">
				{{time}}秒后重新获取验证码
			</view>
			<view v-show="unMsg" class="waitCode base">
				收不到验证码点击这里
			</view>
		</view>
	</view>
</template>

<script>
	// import { mapState } from "vuex";
	export default {
		data() {
			return {
				Iphone: '',
				snedMsg: '',
				time: 60,
				errMsg: false,
				gitMsg: true,
				unMsg: false
			}
		},
		onLoad(e) {
			var reg = /^(\d{3})\d*(\d{4})$/;
			this.Iphone = JSON.parse(e.params).replace(reg,'$1****$2')
			console.log(this.Iphone);
			this.setTime()
		},
		onShow() {

		},
		computed: {

		},
		methods: {
			GitCode(v) {
				if(v !== '1234') this.errMsg = true;
				console.log(v);
			},
			changeMsg(v) {
				if(v.length <= 3) this.errMsg = false;
			},
			setTime() {
				var timer = null;
				if(timer === null) {
					timer = setInterval(v => {
						this.time--;
						if (this.time <= 0) {
							clearInterval(timer)
							this.unMsg = true
							this.gitMsg = false
						}
					}, 1000)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		height: 100vh;
		background: #FFFFFF;
	}
	.code {
		height: 400rpx;
		margin: 12rpx 0 0 60rpx;
		p {
			font-size: 56rpx;
			color: #333;
		}
		.tip {
			font-size: 32rpx;
			margin: 10rpx 0 50rpx;
		}
		.error {
			font-size: 34rpx;
			color: #ff0000;
		}
		.waitCode {
			font-size: 34rpx;
			color: #FF9900;
		}
		.base {
			margin-top: 30rpx;
		}
	}
</style>
