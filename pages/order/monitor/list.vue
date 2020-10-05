<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="工单监控"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<u-card padding="0" @click="toFlow">
			<view class="u-card-wrap" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between">
					<image src="/static/devices/1.png" mode="aspectFill" shape="circle"></image>
					<view class="u-body-item-title info _info"><span>工单类别：{{dveices.name}}</span>
						<span>客户单位：{{dveices.model}}</span></view>
					<view class="u-body-item-title info">
						<span>状态：
							<u-icon name="bell-fill" color="#fa3534" /></span>
						<span class="_date">{{dveices.time | date}}</span>
					</view>
					<view class="u-body-item-title _icon">
						<u-icon name="arrow-right" color="#c8c9cc"></u-icon>
					</view>
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
				dveices: {
					name: 'test',
					model: '九江市大好时机科技有限公司',
					time: new Date().getTime(),
					status: 1
				}
			}
		},
		onLoad() {
			this.$u.api.getMonitorList().then(res => {
				console.log(res)
			}).catch(err => {
				uni.showToast({
					icon: 'none',
					title: '获取数据失败！'
				})
			})
		},
		methods: {
			toFlow() {
				this.$u.route('/pages/order/monitor/flow', {
					id: 123
				})
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

		._info {
			width: 400rpx;
			margin-right: 30rpx;

			span {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
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

			._date {
				color: $u-tips-color;
			}
		}

		._icon {
			position: absolute;
			right: 10rpx;
		}
	}
</style>
