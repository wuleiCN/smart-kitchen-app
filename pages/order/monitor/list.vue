<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="工单监控"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<u-card v-for="(item,index) in order" :key="index" padding="0" @click="toFlow(item.Id)">
			<view class="u-card-wrap" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between">
					<image src="/static/devices/1.png" mode="aspectFill" shape="circle"></image>
					<view class="u-body-item-title u-col-line info _info"><span>工单类别：{{item.Name}}</span>
						<span>客户单位：{{item.CustomerId}}</span></view>
					<view class="u-body-item-title info">
						<span>状态：{{item.EmployeeName}}</span>
						<span class="_date">{{item.CreatedOn}}</span>
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
				order: [],
				OrderType: uni.getStorageSync('OrderType'),
				EmployeeStatus: uni.getStorageSync('EmployeeStatus')
			}
		},
		onLoad() {
			this.$u.api.getMonitorList().then(res => {
				res.map(v => {
					this.OrderType.forEach(i => {
						if (v.Type === i.value) v.Name = i.name
					})
					this.EmployeeStatus.forEach(i => {
						if (v.Type === i.value) v.EmployeeName = i.name
					})
				})
				this.order = res
				console.log(res)
			}).catch(err => {
				uni.showToast({
					icon: 'none',
					title: '获取数据失败！'
				})
			})
		},
		methods: {
			toFlow(Id) {
				this.$u.route('/pages/order/monitor/flow', {
					Id
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
		}

		.info {
			display: flex;
			flex-direction: column;
			margin-left: 10rpx;
			margin-right: 40rpx;
			font-size: 24rpx;
			color: $u-content-color;

			span {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				&:nth-child(1) {
					margin-bottom: 10rpx;
				}
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
