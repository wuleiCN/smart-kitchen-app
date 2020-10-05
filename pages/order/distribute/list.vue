<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="出货工单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="order" v-for="(item,index) in order" :key="index">
			<view class="_info">
				<u-image src="/static/devices/device.png" width="120rpx" height="120rpx" shape="circle" />
				<view class="customer">
					<span>{{item.Customer.Name}}</span>
					<span>销售时间：{{item.CreatedOn | date}}</span>
					<span v-if="item.Status === 10">接单时间：{{item.ModiOn | date}}</span>
					<span v-if="item.Status === 12">派单时间：{{item.ModiOn | date}}</span>
				</view>
			</view>
			<view class="operation">
				<span>
					<u-button v-if="item.Status === 10" type="success" plain ripple @click="accept(index)">接单</u-button>
					<u-button v-if="item.Status === 12" type="success" plain ripple @click="toProduct">出库</u-button>
				</span>
				<span>
					<u-button type="warning" plain ripple>退单</u-button>
				</span>
				<span>
					<u-button plain ripple>查看</u-button>
				</span>
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
				order: [{
					Customer: {
						Name: 'n'
					},
					CreatedOn: new Date().getTime(),
					ModiOn: new Date().getTime(),
					Status: 12
				}]
			}
		},
		onShow() {
			this.$u.api.getDistributeOrders().then(res => {
				console.log(res)
			}).catch(err => {
				uni.showToast({
					icon: 'none',
					title: '获取数据失败！'
				})
			})
		},
		methods: {
			accept(index) {
				uni.showModal({
					title: '提示',
					content: '确定要接单吗？',
					success: e => {
						if(e.confirm) {
							this.$u.api.distributeAccept({
								id: index
							}).then(res => {
								console.log(res)
							}).catch(err => {})
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '接单失败！'
						})
					}
				})
			},
			toProduct() {
				this.$u.route('pages/order/distribute/distribute', {
					id: 123
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.order {
		height: 270rpx;
		background: #FFFFFF;

		._info {
			display: flex;
			padding: 20rpx;

			.customer {
				display: flex;
				flex-direction: column;
				margin-left: 10px;
				justify-content: center;

				span {
					margin-bottom: 5px;

					&:nth-child(1) {
						font-weight: 600;
						color: #000000 !important;
					}

					&:nth-child(n-1) {
						color: $u-tips-color;
					}
				}
			}
		}

		.operation {
			display: flex;
			justify-content: flex-end;

			::v-deep .u-btn {
				width: 160rpx;
				height: 64rpx;
				margin-right: 30rpx;
			}
		}
	}

	.add {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
