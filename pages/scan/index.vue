<template>
	<view class="content">
		<u-navbar :is-back="false" title="香道云厨智慧厨房" />
		<u-tabbar :list="vuex_tabbar" bg-color="#ffffff" active-color="#FC7930" inactive-color="#aaaaaa" :mid-button="true" :border-top="false" />
		<u-modal v-model="show" :content="content" @confirm="back"></u-modal>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	import permision from "@/common/permission.js"
	export default {
		data() {
			return {
				title: 'scan',
				show: false,
				content: ''
			}
		},
		onLoad() {

		},
		onShow() {
			this.scan()
		},
		computed: {
			...mapState(["vuex_tabbar"])
		},
		methods: {
			back() {
				this.$u.route({
					url: 'pages/index/index',
					type: 'switchTab'
				})
			},
			async scan() {
				// #ifdef APP-PLUS
				const status = await this.checkPermission()
				if (status !== 1) {
					return;
				}
				// #endif
				uni.scanCode({
					success: (res) => {
						// this.show = true
						// this.content = '扫码成功' + res.result
						// console.log(res)
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
					},
					complete: (res) => {
						if(res.result) {
							this.show = true
							this.content = '扫码成功' + res.result
						} else {
							this.$u.route({
								url: 'pages/index/index',
								type: 'switchTab'
							})
						}
						console.log(res)
					}
				});
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
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
