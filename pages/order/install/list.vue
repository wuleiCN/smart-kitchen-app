<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="施工工单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<scroll-view class="product u-col-line" show-scrollbar :scroll-y="true" :lower-threshold="5" @scrolltolower="toLowFun">
			<view class="order" v-for="(item,index) in list" :key="index">
				<view class="customer">
					<span><strong>客户名称：</strong>{{item.CustomerId}}</span>
					<span><strong>销售时间：</strong>{{item.CreatedOn}}</span>
					<span><strong>派单人：</strong>{{item.ModiById}}</span>
				</view>
				<view class="operation">
					<span>
						<u-button v-if="item.Status === 14" type="success" plain @click="accept(index)">接单</u-button>
					</span>
					<span>
						<u-button v-if="item.Status === 20" type="success" plain @click="toProduct(item.Id)">施工</u-button>
					</span>
					<span>
						<u-button v-if="item.Status === 20" type="warning" plain ripple @click="finish(index)">回单</u-button>
					</span>
					<span>
						<u-button v-if="item.Status === 20" type="error" plain ripple>退单</u-button>
					</span>
					<span>
						<u-button plain @click="toOrderDetail(item)">详情</u-button>
					</span>
				</view>
			</view>
			<u-loadmore :status="status" />
		</scroll-view>
		<u-modal v-model="acceptShow" :content="acceptContent" title="提示" show-cancel-button @confirm="accepted"></u-modal>
		<u-modal v-model="finishShow" :content="finishIdContent" title="提示" show-cancel-button @confirm="finished"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				status: 'nomore',
				acceptShow: false,
				finishShow: false,
				acceptContent: '确定要接单吗？',
				finishIdContent: '确定要回单吗？',
				list: [],
				orderId: '',
				_status: '',
				finishId: '',
				OrderType: uni.getStorageSync('OrderType'),
				OrderStatus: uni.getStorageSync('OrderStatus')
			}
		},
		onShow() {
			this.getInstallOrderList()
		},
		methods: {
			// 获得施工工单列表
			getInstallOrderList() {
				uni.showLoading({
					title: '正在加载数据',
					mask: false
				});
				this.$u.api.getInstallOrders().then(res => {
					uni.hideLoading()
					res.map(v => {
						this.OrderType.forEach(i => {
							if(v.Type === i.value) v.TypeName = i.name
						})
						this.OrderStatus.forEach(i => {
							if(v.Status === i.value) v.StatusName = i.name
						})
					})
					this.list = res
					console.log(res)
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '获取数据失败！'
					})
				})
			},
			accept(index) {
				this.orderId = this.list[index].Id
				this._status = this.list[index].Status
				this.acceptShow = true
			},
			accepted() {
				this.$u.api.installAccept({
					order: this.orderId
				}).then(res => {
					console.log(res)
					this.Status = 20
					uni.showToast({
						title: '接单成功！'
					})
					this.getInstallOrderList()
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '接单失败！'
					})
				})
			},
			finish(index) {
				this.finishId = this.list[index].Id
				this.finishShow = true
			},
			finished() {
				this.$u.api.canInstallFinish({
					order: this.finishId
				}).then(res => {
					console.log(res)
					if (res.flag === true) {
						this.$u.api.distributeFinish({
							order: this.finishId
						}).then(res => {
							if (res.success) {
								uni.showToast({
									title: '回单成功！'
								})
								this.getInstallOrderList()
							} else {
								uni.showToast({
									icon: 'none',
									title: '回单失败！'
								})
							}
						}).catch(err => {})
					}
				}).catch(err => {})
			},
			toProduct(id) {
				this.$u.route('pages/order/install/installDevice', {
					id
				})
			},
			toOrderDetail(item) {
				this.$u.route('pages/order/monitor/order_detail', {
					item: JSON.stringify(item)
				})
			},
			toLowFun() {
				this.$u.throttle(this.load, 2000)
			},
			load() {
				this.status = 'loading';
				setTimeout(() => {
					this.status = 'nomore';
				}, 2000)
				console.log("触底事件");
			},
		}
	}
</script>

<style scoped lang="scss">
	.product {
		.order {
			height: 270rpx;
			background: #FFFFFF;

			.customer {
				display: flex;
				flex-direction: column;
				padding: 15px 0 0 15px;
				justify-content: center;

				span {
					margin-bottom: 5px;
					color: #666666;
				}
			}

			.operation {
				display: flex;
				justify-content: flex-end;

				::v-deep .u-btn {
					width: 116rpx;
					height: 64rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
