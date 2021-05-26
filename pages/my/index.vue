<template>
	<view class="content">
		<view class="text-area">
			<view class="user-box">
				<view class="u-p-l-24">
					<u-avatar src="/static/icon/Avatar.png" size="140"></u-avatar>
				</view>
				<view class="u-p-l-12">
					<view class="u-font-16">{{user.Name}}</view>
					<view class="u-font-14">微信号:{{user.WeChat}}</view>
				</view>
			</view>
			<view class="user_updata">
				<view class="info_ud" @click="updataInfo">
					更新公司信息
					<u-icon class="u-font-24" name="arrow-right" />
				</view>
				<view class="info_ud" @click="updataAdder">
					更新公司地址
					<u-icon class="u-font-24" name="arrow-right" />
				</view>
				<view class="info_ud" @click="updataGPS">
					更新公司GPS定位
					<u-icon class="u-font-24" name="arrow-right" />
				</view>
			</view>
			<view class="user_updata info_top">
				<view class="info_ud" @click="$u.route('pages/my/user')">
					修改用户信息
					<u-icon class="u-font-24" name="arrow-right" />
				</view>
				<view class="info_ud" @click="$u.route('pages/my/userPwd')">
					修改密码
					<u-icon class="u-font-24" name="arrow-right" />
				</view>
			</view>
			<view class="user_updata info_top_b">
				<view class="info_ud">
					关于
					<u-icon class="u-font-24" name="arrow-right" />
				</view>
				<view class="info_ud">
					通知
					<u-icon class="u-font-24" name="arrow-right" />
				</view>
			</view>
		</view>
		<!-- <u-button type="error" shape="circle" size="default" style="margin: 10px;" @click="signOut">退出登录</u-button> -->
		<button class="outLogin" @click="signOut">退出登录</button>
		<button class="outLogin log" @click="logOut">注销</button>
		<u-tabbar :list="vuex_tabbar" bg-color="#ffffff" active-color="#FC7930" inactive-color="#aaaaaa"
			:mid-button="true" :border-top="false" />
		<u-modal v-model="sign" content="确定要退出吗？" title="提示" show-cancel-button @confirm="signHandle" />
		<u-modal v-model="log" content="确定要注销吗？" title="提示" show-cancel-button @confirm="logHandle" />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				user: uni.getStorageSync('userInfo'),
				sign: false,
				log: false
			}
		},
		onShow() {
			console.log(this.user);
		},
		computed: {
			...mapState(["vuex_tabbar"])
		},
		methods: {
			updataInfo() {
				console.log('set')
			},
			updataAdder() {
				console.log('1');
			},
			updataGPS() {
				console.log('2');
			},
			signOut() {
				this.sign = true
			},
			logOut() {
				this.log = true
			},
			signHandle() {
				console.log('===> out')
				uni.clearStorageSync()
				this.$u.route('pages/Login')
			},
			logHandle(e) {
				console.log(e);
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-box {
		display: flex;
		align-items: center;
		background-image: url(../../static/NavBar.png);
		height: 378rpx;
		color: #FFFFFF;
	}

	.user_updata {
		width: 702rpx;
		height: 240rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		position: absolute;
		top: 297rpx;
		left: 50%;
		transform: translateX(-50%);
		.info_ud {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-weight: 600;
			padding: 0 20rpx;
			width: 100%;
			height: 80rpx;
			&:nth-child(1) {
				border-bottom: 1rpx solid #F5F5F5;
			}
			&:nth-child(2) {
				border-bottom: 1rpx solid #F5F5F5;
			}
		}
	}
	.info_top {
		height: 150rpx;
		top: 561rpx !important;
	}
	.info_top_b {
		height: 150rpx;
		top: 736rpx !important;
	}
	.outLogin {
		position: absolute;
		width: 702rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 28rpx;
		font-weight: 600;
		color: #919191;
		border: 0;
		background: #FFFFFF;
		border-radius: 30rpx;
		top: 940rpx;
		left: 50%;
		transform: translateX(-50%);
		&::after {
			border: 0;
		}
	}
	.log {
		top: 1060rpx;
	}
</style>
