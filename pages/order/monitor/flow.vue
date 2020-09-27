<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="工单监控"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="_body-item u-flex u-col-between">
			<image src="/static/devices/1.png" mode="aspectFill" shape="circle"></image>
			<view class="info">
				<view><span>工单环节：</span><span>{{dveices.name}}</span></view>
				<view><span>派单时间：</span><span>{{dveices.model}}</span></view>
				<view><span>工单环节：</span><span>{{dveices.name}}</span></view>
				<view><span>派单时间：</span><span>{{dveices.model}}</span></view>
				<view><span>工单环节：</span><span>{{dveices.name}}</span></view>
				<view><span>派单时间：</span><span>{{dveices.model}}</span></view>
				<view><span>工单环节：</span><span>{{dveices.name}}</span></view>
				<view><span>派单时间：</span><span>{{dveices.model}}</span></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				dveices: {
					name: 'test',
					model: '九江市大好时机科技有限公司',
					time: new Date().getTime(),
					status: 1
				}
			}
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	._body-item {
		// height: 200rpx;
		background: #FFFFFF;
		align-items: flex-start;

		image {
			margin-top: 20rpx;
			width: 120rpx;
			height: 120rpx;
		}

		.info {
			display: flex;
			flex-direction: column;
			margin:20rpx 0 0 10rpx;
			font-size: 24rpx;
			color: $u-content-color;

			view {
				margin-bottom: 10rpx;

				span:nth-child(1) {
					font-size: 14px;
					font-weight: 600;
				}
			}
		}
	}
</style>
