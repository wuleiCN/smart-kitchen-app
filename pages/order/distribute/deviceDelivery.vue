<template>
	<view class="content">
		<u-navbar :is-back="true" title="客户注册" :title-width="300" title-color="#000000" :title-size="36" />
			<view class="info">
				<view class="section u-flex">
					<span class="line" />
					<span class="_title u-flex">设备信息</span>
				</view>
			</view>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit">更新</button>
		</view>
		<u-modal v-model="show" content="更新成功!" @confirm="confirm" />
	</view>
</template>

<script>
	// import { mapState } from "vuex";
	export default {
		data() {
			return {
				form: {},
				optionId: null,
				show: false,
			}
		},
		onLoad(e) {
			// this.optionId = e.Id
		},
		computed: {

		},
		watch: {

		},
		methods: {
			submit() {
				this.show = true
			},
			confirm() {}
		}
	}
</script>

<style scoped lang="scss">
	.info {
		margin-top: 24rpx;
		height: 1056rpx;
		background: #FFFFFF;
	}
	.section {
		width: 100%;
		padding: 30rpx 0;
		margin-top: 30rpx;
		background: #FFFFFF;
	
		._title {
			margin-left: 20rpx;
			font-size: 32rpx;
			font-weight: 600;
		}
	
		.line {
			height: 30rpx;
			border-radius: 30%;
			border: 5rpx solid #f37b1d;
			margin-left: 23rpx;
		}
	}

	.submit_vw {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 0;
		width: 750rpx;
		height: 98rpx;
		background: #FFFFFF;

		.submit_ck {
			width: 702rpx;
			height: 68rpx;
			line-height: 68rpx;
			color: #FFFFFF;
			background: #FC7930;
			border-radius: 10rpx;
		}
	}
</style>
