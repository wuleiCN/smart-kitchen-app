<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="我的"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="text-area">
			<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
				<view class="u-m-r-10">
					<u-avatar :src="pic" size="140"></u-avatar>
				</view>
				<view class="u-flex-1">
					<view class="u-font-18 u-p-b-20">叶轻眉</view>
					<view class="u-font-14 u-tips-color">微信号:helang_uView</view>
				</view>
				<view class="u-m-l-10">
					<view class="u-font-18" @tap="setting">设置</view>
				</view>
				<view class="u-p-10">
					<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
			</view>
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item title="昵称"></u-cell-item>
					<u-cell-item title="电话"></u-cell-item>
					<u-cell-item title="修改密码"></u-cell-item>
					<u-cell-item title="发布通知"></u-cell-item>
					<u-cell-item title="关于"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
		<u-button type="error" shape="circle" size="default" style="margin: 10px;">退出登录</u-button>
	<u-tabbar :list="vuex_tabbar" bg-color="#303133" active-color="#0081ff" inactive-color="#aaaaaa" :mid-button="true" />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				title: 'My',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				pic: 'https://uviewui.com/common/logo.png',
				show: true
			}
		},
		onLoad() {

		},
		computed: {
			...mapState(["vuex_tabbar"])
		},
		methods: {
			setting() {
				console.log('set')
			}
		}
	}
</script>

<style>
	.user-box {
		background-color: #fff;
	}
</style>
