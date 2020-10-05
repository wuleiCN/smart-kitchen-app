<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="销售工单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="order">
			<view class="_info">
				<u-image src="/static/devices/1.png" width="120rpx" height="120rpx" shape="circle" />
				<view class="customer">
					<span>test</span>
					<span>订购时间：{{new Date().getTime() | date}}</span>
				</view>
			</view>
			<view class="operation">
				<span>
					<u-button type="success" plain ripple @click="toProduct">产品订购</u-button>
				</span>
				<span>
					<u-button type="primary" plain ripple @click="toSaledevices">销售清单</u-button>
				</span>
				<span>
					<u-button plain ripple @click="sendToDistribute">派单出库</u-button>
				</span>
			</view>
		</view>
		<u-button class="add" type="primary" @click="$u.route('pages/order/sale/create')">+新增订单</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				}
			}
		},
		onLoad() {
			this.$u.api.getOrderSaleList().then(res => {
				console.log(res)
			}).catch(err => {
				uni.showToast({
					icon: 'none',
					title: '获取数据失败！'
				})
			})
		},
		methods: {
			toProduct() {
				this.$u.route('pages/order/sale/selectproduct',{
					id: 123
				})
			},
			toSaledevices() {
				this.$u.route('pages/order/sale/saledevices',{
					id: 123
				})
			},
			sendToDistribute() {
				uni.showModal({
					title: '提示',
					content: '确定要派单出库吗',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.$u.api.orderSale({id: 123}).then(res => {
								console.log(res)
							}).catch(err => {})
						}
					},
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.order {
		height: 250rpx;
		background: #FFFFFF;

		._info {
			display: flex;
			padding: 20rpx;

			.customer {
				display: flex;
				flex-direction: column;
				margin-left: 10px;
				justify-content: center;

				span:nth-child(1) {
					margin-bottom: 5px;
					font-weight: 600;
				}

				span:nth-child(2) {
					color: $u-tips-color;
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
