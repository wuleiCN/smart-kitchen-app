<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="施工工单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<scroll-view class="product" show-scrollbar :scroll-y="true" :lower-threshold="5" @scrolltolower="toLowFun">
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
				list: []
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
				uni.showModal({
					title: '提示',
					content: '确定要接单吗？',
					success: () => {
						this.$u.api.installAccept({
							order: this.list[index].Id
						}).then(res => {
							console.log(res)
							this.list[index].Status = 20
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
					}
				})
			},
			finish(index) {
				const id = this.list[index].Id
				this.$u.api.canInstallFinish({
					order: id
				}).then(res => {
					console.log(res)
					if (res.data.flag === true) {
						uni.showModal({
							content: '确定要回单吗？',
							success: (res) => {
								if (res.confirm) {
									this.$u.api.distributeFinish({
										order: id
									}).then(res => {
										if (res.data.success) {
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
							}
						})
					}
				}).catch(err => {})
			},
			toProduct(id) {
				this.$u.route('pages/order/install/install', {
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
