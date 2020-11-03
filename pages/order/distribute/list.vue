<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="出货工单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="order" v-for="(item,index) in order" :key="index">
			<view class="_info">
				<u-image src="/static/devices/device.png" width="120rpx" height="120rpx" shape="circle" />
				<view class="customer">
					<span>联系人：{{item.Contact}}</span>
					<span>销售时间：{{item.OrderOn}}</span>
					<span v-if="item.Status === 10">接单时间：{{item.SendOn}}</span>
					<span v-if="item.Status === 12">派单时间：{{item.ArrivedOn}}</span>
				</view>
			</view>
			<view class="operation">
				<span>
					<u-button v-if="item.Status === 10" type="success" plain ripple @click="accept(index)">接单</u-button>
					<u-button v-if="item.Status === 12" type="success" plain ripple @click="toProduct(item)">出库</u-button>
				</span>
				<span>
					<u-button type="warning" plain ripple>退单</u-button>
				</span>
				<span>
					<u-button plain ripple>查看</u-button>
				</span>
			</view>
		</view>
		<u-modal v-model="shipmentShow" :content="shipmentContent" show-cancel-button @confirm="shipment"></u-modal>
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
				shipmentShow: false,
				shipmentContent: '确定要接单吗？',
				_index: ''
			}
		},
		onShow() {
			this.getOrderInfo()
		},
		methods: {
			getOrderInfo() {
				// 获取订单信息
				this.$u.api.getDistributeOrders().then(res => {
					this.order = res
					console.log(res)
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '获取数据失败！'
					})
				})
			},
			accept(index) {
				this._index = index
				this.shipmentShow = true
			},
			// 接单
			shipment() {
				this.$u.api.distributeAccept({
					id: this.order[this._index].Id
				}).then(res => {
					if(res.success) {
						uni.showToast({
							title: '接单成功！'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '接单失败！'
						})
						return false
					}
					this.getOrderInfo()
					console.log(res)
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '接单失败！'
					})
				})
			},
			// 出库
			toProduct(item) {
				this.$u.route('pages/order/distribute/distribute', {
					id: item.Id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.order {
		height: 270rpx;
		background: #FFFFFF;
		border-bottom: 1px solid #f5f5f5;

		._info {
			display: flex;
			padding: 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

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
