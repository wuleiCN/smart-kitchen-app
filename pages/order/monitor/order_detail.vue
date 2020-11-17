<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="设备出库"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">工单基本信息</span>
		</view>
		<view class="info u-flex-col u-row-around">
			<span>客户单位：{{order.CustomerId}}</span>
			<span>创建时间：{{order.CreatedOn}}</span>
			<span>工单类别：{{order.TypeName}}</span>
			<span>工单状态：{{order.StatusName}}</span>
		</view>
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">设备基本信息</span>
		</view>
		<view class="device_info u-flex u-col-top">
			<u-image width="100rpx" height="100rpx" src="/static/devices/1.png" shape="circle" />
			<view class="info u-flex-col u-row-around">
				<span>设备型号：</span>
				<span>设备类别：</span>
				<span>销售数量：</span>
				<span>出库数量：</span>
				<span>安装数量：</span>
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
				orderId: '',
				order: {},
				devices: []
			}
		},
		onLoad(option) {
			this.order = JSON.parse(option.item)
		}
	}
</script>

<style lang="scss" scoped>
	.section {
		z-index: 9;
		position: sticky;
		width: 100%;
		height: 80rpx;
		background: #FFFFFF;
		border-bottom: 1px solid #f3f3f3;
		box-shadow: 6rpx 1rpx rgba(0, 0, 0, 0.1);

		._title {
			height: 80rpx;
			margin-left: 20rpx;
		}

		.line {
			height: 30rpx;
			border-radius: 30%;
			border: 5rpx solid #0081ff;
			margin-left: 5%;
		}
	}

	.info {
		height: 260rpx;
		background: #FFFFFF;
		padding: 30rpx;
		color: #666666;
		// border-bottom: 1px solid #f5f5f5;

		span {
			padding-bottom: 10rpx;
		}
	}
	.device_info {
		padding: 20rpx;
		background: #FFFFFF;
		border-bottom: 1rpx solid #f5f5f5;
	}
</style>
