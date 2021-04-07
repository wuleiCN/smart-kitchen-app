<template>
	<view class="content">
		<u-navbar :is-back="true" :title="title" title-color="#000000" :title-size="36" />
			<view class="correspondLevels">
				<view class="Levels" @click="$u.route('pages/autManagement/correspondLevels')" />
			</view>
			<view class="correspondLevels">
				<view class="companyLevels" />
				<view class="customerLevels" />
			</view>
		<Modal />
	</view>
</template>

<script>
	// import {
	// 	mapState
	// } from "vuex"
	import Modal from "../components/modal.vue"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				title: '权限管理'
			}
		},
		mounted() {
			
		},
		watch: {
			'$store.state.vuex_popupShow': {
				handler() {
					this.warning = uni.getStorageSync('warnInfo')
				},
				immediate: true
			}
		},
		computed: {

		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.correspondLevels {
			width: 702rpx;
			height: 301rpx;
			border-radius: 20rpx;
			margin-top: 24rpx;
			margin-left: 50%;
			transform: translateX(-50%);
			.Levels {
				height: 100%;
				background-image: url(../../static/comment/AutManage.png);
				background-size: 702rpx 301rpx;
			}
			.companyLevels {
				float: left;
				height: 301rpx;
				width: 340rpx;
				background-image: url(../../static/comment/compManage.png);
				background-size: 340rpx 301rpx;
			}
			.customerLevels {
				float: right;
				height: 301rpx;
				width: 340rpx;
				background-image: url(../../static/comment/custManage.png);
				background-size: 340rpx 301rpx;
			}
		}
	}
</style>
