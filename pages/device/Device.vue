<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="警告信息"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<u-card padding="0" @click="toDetail">
			<view class="u-card-wrap" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between">
					<image src="/static/devices/1.png" mode="aspectFill" shape="circle"></image>
					<view class="u-body-item-title info"><span>设备名称：{{dveices.name}}</span><span class="news-wraning">
							设备型号：{{dveices.model}}</span></view>
					<view class="u-body-item-title _icon"><u-icon name="arrow-right" color="#c8c9cc"></u-icon></view>
				</view>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				dveices:{name:'test',model:'001'}
			}
		},
		onLoad() {
			this.$u.api.getDevicesInfoAll().then(res => {
				console.log(res)
			}).catch(err => {
				uni.showToast({
					icon: 'none',
					title: '获取数据失败！'
				})
			})
		},
		methods: {
			toDetail() {
				this.$u.route('pages/device/Detail', {
					id: 123
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .u-card {
		margin: 0 !important;
		position: relative;

		image {
			width: 120rpx;
			height: 120rpx;
		}

		.info {
			display: flex;
			flex-direction: column;
			margin-left: 10rpx;
			font-size: 24rpx;
			color: $u-content-color;

			span:nth-child(1) {
				margin-bottom: 10rpx;
			}
		}
		._icon {
			position: absolute;
			right: 20rpx;
		}
	}
</style>
