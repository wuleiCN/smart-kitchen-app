<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="设备详情"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="head">
			<u-image width="120rpx" height="120rpx" src="/static/devices/1.png"></u-image>
		</view>
		<u-swiper :list="list" :autoplay="false"></u-swiper>
		<u-form :model="form" ref="uForm" :border-bottom="false" :label-style="{color: '#303133',fontWeight: '600'}">
			<u-form-item label="设备名称 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="设备编码 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="设备类别 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="设备型号 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="设备状态 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="安装地点 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="安装时间 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="下次维保时间 :" label-width="200">
				<view>{{form.name}}</view>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				list: [
					'/static/banners/banner1.jpg',
					'/static/banners/banner2.jpg',
					'/static/banners/banner3.jpg'
				],
				form: {
					name: 'test'
				}
			}
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.head {
		display: flex;
		align-items: center;
		height: 150rpx;
		background: #FFFFFF;
	}

	::v-deep .u-swiper-wrap {
		border-left: 20rpx solid #ffffff;
		border-right: 20rpx solid #ffffff;
		border-bottom: 2rpx solid #FFFFFF;

		uni-swiper {
			height: 440rpx !important;
			background: #ffffff !important;

			.uni-swiper-wrapper {
				border-radius: 20rpx;
			}
		}
	}

	.u-form-item {
		padding: 0;
	}
</style>
