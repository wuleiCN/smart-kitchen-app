<template>
	<view class="content">
		<view class="text-area">
			<view class="user-box">
				<view class="u-p-l-24">
					<u-avatar :src="user.Avatar" size="140" @click="changeAvatarFn" />
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
				<view class="info_ud" @click="updataName">
					更新公司名字
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
		<u-modal v-model="refuseShow" title="更新公司名称" show-cancel-button @confirm="refuseOrderBute">
			<view class="slot-content">
				<u-input v-model="company.name" type="textarea" focus border />
			</view>
		</u-modal>
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
				token: uni.getStorageSync('token'),
				company: {
					id: '',
					name: ''
				},
				avatar: '',
				refuseShow: false,
				sign: false,
				log: false
			}
		},
		onShow() {
			console.log(this.user);
		},
		created() {
			uni.$on('uAvatarCropper', path => {
				uni.uploadFile({
					url: 'http://175.6.77.126:9001/api/file/avatar',
					fileType: 'image',
					filePath: path,
					header: {
						Token: this.token
					},
					name: 'imgFile',
					success: (res) => {
						this.user.Avatar = path
						this.changeUserAvatar(res.filename)
						console.log(res);
					},
					fail: (err) => {
						this.$u.toast('更新头像失败')
						console.log(err);
					}
				});
			})
		},
		mounted() {
			this.company.id = this.user.OrgId
		},
		computed: {
			...mapState(["vuex_tabbar"])
		},
		methods: {
			changeUserAvatar(param) {
				this.$u.api.changeAvatar({
					avatar: param
				}).then(res => {
					if (res.success) this.$u.toast('更新头像成功')
					console.log(res);
				})
			},
			changeAvatarFn() {
				this.$u.route({
					url: 'pages/components/u-avatar-cropper',
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			updataInfo() {
				this.$u.route('pages/my/company')
			},
			updataName() {
				this.refuseShow = true
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
			refuseOrderBute() {
				this.$u.api.updataName(this.company).then(res => {
					if (res.success) this.$u.toast('更新公司名称成功')
					else this.$u.toast(res.message)
				})
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

	.slot-content {
		width: 100%;
		padding: 30rpx;
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
