<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="销售工单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="order u-border-bottom" v-for="(item,index) in orderList" :key="index">
			<view class="_info">
				<u-image src="/static/devices/1.png" width="120rpx" height="120rpx" shape="circle" />
				<view class="customer">
					<span>{{item.Contact}}</span>
					<span>订购时间：{{item.OrderOn}}</span>
				</view>
			</view>
			<view class="operation">
				<span>
					<u-button type="success" plain ripple @click="toProduct(item.Id)">产品订购</u-button>
				</span>
				<span>
					<u-button type="primary" plain ripple @click="toSaledevices(item.Id)">销售清单</u-button>
				</span>
				<span>
					<u-button plain ripple @click="sendToDistribute(item.Id)">派单出库</u-button>
				</span>
			</view>
		</view>
		<u-button class="add" type="primary" @click="$u.route('pages/order/sale/create')">+新增订单</u-button>
		<u-modal v-model="distributeShow" :content="distributeContent" show-cancel-button @confirm="distribute"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				distributeContent: '确定要派单出库吗?',
				distributeShow: false,
				orderList: [],
				distributeId: ''
			}
		},
		onLoad() {},
		onShow() {
			this.getOrderSaleList()
		},
		methods: {
			toProduct(Id) { 
				setTimeout(() => {
					this.$u.route('pages/order/sale/selectproduct',{
						Id
					})
				},200)
			},
			toSaledevices(Id) {
				setTimeout(() => {
					this.$u.route('pages/order/sale/saledevices',{
						Id
					})
				},200)
			},
			getOrderSaleList() {
				this.$u.api.getOrderSaleList().then(res => {
					this.orderList = res
					console.log(res,this.orderList)
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '获取数据失败！'
					})
				})
			},
			sendToDistribute(id) {
				this.distributeId = id
				this.$u.api.getOrderSaleDevices({id}).then(res => {
					if(res.length) {
						this.distributeShow = true
					} else {
						uni.showToast({
							icon: 'none',
							title: '请至少选择一个产品!'
						})
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '发生错误，派单失败!'
					})
				})
			},
			distribute() {
				this.$u.api.orderSale({order: this.distributeId}).then(res => {
					uni.showToast({
						title: '派单出库成功！'
					})
					console.log(res)
					this.getOrderSaleList()
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '派单出库失败！'
					})
					console.log(err)
				})
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
