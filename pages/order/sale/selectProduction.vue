<template>
	<view class="content">
		<u-navbar :is-back="true" title="产品销售" :title-width="300" />
		<view class="product" v-for="(item,index) in list" :key="index">
			<view class="u-flex">
				<u-image src="/static/devices/production.png" width="220rpx" height="165rpx" />
				<view class="_info u-flex-col u-col-line">
					<span><strong>设备型号：</strong>{{item.Name}}</span>
					<span><strong>设备类别：</strong>{{item.deviceName}}</span>
					<span><strong>设备描述：</strong>...</span>
				</view>
			</view>
			<view class="sale">
				<u-button v-if="!item.Count" ripple @click="sale(item.Id)">+加入购物车</u-button>
				<u-number-box v-else v-model="item.Count" @change="updataDeviceCount(item.Id,item.Count)" />
			</view>
		</view>
		<u-loadmore :status="status" />
		<view class="block" style="height: 98rpx;" />
		<view class="customer">
			<view class="navigation">
				<view class="left">
					<view class="item car" @click="toCart">
						<u-badge v-if="deviceCount" class="car-num" :count="deviceCount" type="error"
							:offset="[-8, -8]"></u-badge>
						<u-icon name="shopping-cart-fill" :size="64" color="#FC7930"></u-icon>
						<!-- <view class="text u-line-1">购物车</view> -->
					</view>
				</view>
				<view class="right">
					<view class="buy btn u-line-1" @click="dispatchOrder">派单出库</view>
					<view class="git btn u-line-1" @click="editOrder">提交</view>
				</view>
			</view>
		</view>
		<u-modal v-model="editShow" :content="content"></u-modal>
		<u-modal v-model="dispatchShow" :content="dispatch_content" show-cancel-button @confirm="dispatch"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				editShow: false,
				content: '功能未完善！',
				dispatchShow: false,
				dispatch_content: '确定立刻派单出库吗？',
				optionId: '',
				deviceCount: null,
				list: [],
				orderList: [],
				DeviceType: []
			}
		},
		onLoad(option) {
			this.optionId = option.Id
		},
		onShow() {
			// this.getDeviceCount()
			// this.getOrderList(this.optionId)
			this.getSalingDevicesList()
		},
		methods: {
			// 获取字典
			async getDeviceType() {
				const res = await this.$u.dictionary.getDeviceTypeFc()
				this.DeviceType = res
			},
			// 获取销售设备列表
			getSalingDevicesList() {
				this.$u.api.getModelSaleList({
					order: this.optionId
				}).then(res => {
					if (res.success) {
						res.data.map(v => {
							this.DeviceType.forEach(i => {
								if (v.Type === i.value) v.deviceName = i.name
							})
						})
						this.list = res.data
						this.deviceCount = this.list.reduce((t,v) => {
							return t + v.Count
						}, 0)
					}
					console.log(this.list)
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取已购设备清单
			// getOrderList(id) {
			// 	this.$u.api.getOrderSaleDevices({
			// 		order: id
			// 	}).then(res => {
			// 		if (res.success) this.orderList = res.data
			// 		console.log(res)
			// 	}).catch(err => {
			// 		console.log(err)
			// 	})
			// },
			// 加入购物车
			sale(id) {
				this.$u.api.addDeviceSale({
					Order: this.optionId,
					Model: id
				}).then(res => {
					if (res.success) {
						this.getSalingDevicesList()
						this.$u.toast('加入购物车成功!')
					}
					else this.$u.toast(res.message)
					console.log(res)
				}).catch(err => {
					this.$u.toast(err.message)
					console.log(err)
				})
			},
			editOrder() {
				this.editShow = true
			},
			dispatchOrder() {
				this.$u.api.getOrderSaleDevices({
					order: this.optionId
				}).then(res => {
					if (res.data.length) this.dispatchShow = true
					else this.$u.toast('请至少选择一个产品!')
				}).catch(err => {
					this.$u.toast('发生错误，派单失败!')
				})
			},
			// 派单出库
			dispatch() {
				this.$u.api.saleOrderFinish({
					id: this.optionId
				}).then(res => {
					if (res.success) {
						this.$u.toast('派单成功！')
						setTimeout(() => {
							this.$u.route({
								type: 'navigateBack'
							})
						}, 300)
					}
					else this.$u.toast(res.message)
					console.log(res)
				})
			},
			// 修改设备数量
			updataDeviceCount(id,count) {
				this.$u.api.updataDeviceSale({
					OrderId: this.optionId,
					ModelId: id,
					Count: count
				}).then(res => {
					if (res.success) this.getSalingDevicesList()
					console.log(res, count)
				})
			},
			// 跳转购物车清单
			toCart() {
				setTimeout(() => {
					this.$u.route('pages/order/sale/saledevices', {
						Id: this.optionId
					})
				}, 300)
			},
			// 上拉加载
			onReachBottom() {
				this.$u.throttle(this.load, 2000)
			},
			load() {
				this.status = 'loading';
				setTimeout(() => {
					this.status = 'nomore';
				}, 2000)
				console.log("触底事件");
			}
		}
	}
</script>

<style scoped lang="scss">
	.product {
		background: #FFFFFF;
		margin-bottom: 10rpx;
		height: 240rpx;

		&:last-child {
			margin: 0 !important;
		}

		.u-image {
			margin-left: 20rpx;
		}

		._info {
			span {
				width: 469rpx;
				margin: 10rpx 0 0 10rpx;
			}
		}

		.sale {
			padding-bottom: 20rpx;

			::v-deep .u-btn {
				width: 158rpx;
				height: 52rpx;
				background: #FC7930;
				margin-right: 20rpx;
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				color: #FFFFFF;
			}
			.u-numberbox {
				width: 158rpx;
				height: 52rpx;
				margin-left: 572rpx;
			}
		}
	}

	.customer {
		position: fixed;
		width: 100%;
		background: #FFFFFF;
		bottom: 0;
		z-index: 999;

		.navigation {
			display: flex;
			justify-content: space-between;
			border: solid 2rpx #f2f2f2;
			background-color: #ffffff;
			height: 98rpx;
			padding: 16rpx 0;

			.left {
				display: flex;
				font-size: 20rpx;
				margin-left: 20rpx;

				.item {
					margin: 0 30rpx;

					&.car {
						text-align: center;
						position: relative;

						.car-num {
							position: absolute;
							top: -10rpx;
							right: -10rpx;
						}
					}
				}
			}

			.right {
				display: flex;
				font-size: 28rpx;
				align-items: center;
				margin-right: 20rpx;

				.btn {
					width: 168rpx;
					height: 68rpx;
					font-size: 32rpx;
					text-align: center;
					line-height: 67rpx;
					padding: 0;
					border-radius: 10rpx;
				}

				.git {
					background: #ff7900;
					color: #FFFFFF;
				}

				.buy {
					background: rgba(252, 121, 48, .2);
					color: #ff7900;
					margin-right: 30rpx;
					border: 1rpx solid #ff7900;
				}
			}
		}

		.customer_info {
			background: #FFFFFF;

			._info {
				span {
					margin: 10rpx 0 0 30rpx;
				}
			}
		}
	}
</style>
