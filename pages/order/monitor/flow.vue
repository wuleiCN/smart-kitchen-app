<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="工单监控"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="_body-item u-flex u-col-between">
			<image src="/static/devices/1.png" mode="aspectFill" shape="circle"></image>
			<view class="info">
				<view><span>工单序号：</span><span>{{dveices.No}}</span></view>
				<view><span>客户单位：</span><span>{{dveices.CustomerName}}</span></view>
				<view><span>工单类别：</span><span>{{dveices.Name}}</span></view>
  				<view><span>工单状态：</span><span>{{dveices.OrderStatus}}</span></view>
				<view><span>创建日期：</span><span>{{dveices.CreatedOn}}</span></view>
				<view v-if="dveices.ModiById"><span>修改日期：</span><span>{{dveices.ModiOn}}</span></view>
				<view v-if="dveices.Type === 95"><span>退单原因：</span><span>{{dveices.model}}</span></view>
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
				dveices: {}
			}
		},
		onLoad(e) {
			this.dveices = JSON.parse(e.params)
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
			margin: 20rpx 0 0 10rpx;
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
