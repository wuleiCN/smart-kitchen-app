<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="产品销售"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="product" v-for="(item,index) in list" :key="index">
			<view class="u-flex">
				<u-image src="/static/devices/device.png" width="200rpx" height="200rpx"></u-image>
				<view class="_info u-flex-col u-col-line">
					<span><strong>设备型号：</strong>{{item.modelName}}</span>
					<span><strong>设备类别：</strong>{{item.Name}}</span>
					<span><strong>设备描述：</strong>...</span>
					<span>已售：{{item.Count}}</span>
				</view>
			</view>
			<view class="sale">
				<u-button type="error" ripple @click="sale(index)">+加入购物车</u-button>
			</view>
		</view>
		<u-loadmore :status="status" />
		<view class="_blank" />
		<view class="customer">
			<view class="navigation">
				<view class="left">
					<view class="item car" @click="toCart">
						<u-badge v-if="deviceCount" class="car-num" :count="deviceCount" type="error" :offset="[-8, -8]"></u-badge>
						<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">购物车</view>
					</view>
				</view>
				<view class="right">
					<view class="cart btn u-line-1" @click="editOrder">修改订单</view>
					<view class="buy btn u-line-1" @click="dispatchOrder">派单出库</view>
				</view>
			</view>
			<view class="customer_info">
				<view class="_info u-flex-col">
					<span><strong>客户单位：</strong>{{Customer.CompanyId}}</span>
					<span><strong>联系人：</strong>{{Customer.Contact}}</span>
					<span><strong>联系电话：</strong>{{Customer.Phone}}</span>
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
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				status: 'loadmore',
				editShow: false,
				content: '功能未完善！',
				dispatchShow: false,
				dispatch_content: '确定立刻派单出库吗？',
				optionId: '',
				deviceCount: 2,
				Customer: {},
				list: [],
				DeviceType: uni.getStorageSync('DeviceType'),
				modelList: uni.getStorageSync('GetAllModle')
			}
		},
		onLoad(option) {
			this.optionId = option.Id
			console.log(option)
			this.$u.api.getOrderInfo({
				id: option.Id
			}).then(res => {
				this.Customer = res
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
			this.$u.api.getSalingDevices({
				order: option.Id
			}).then(res => {
				res.map(v => {
					this.DeviceType.forEach(i => {
						if(v.Type === i.value) v.Name = i.name
					})
					this.modelList.forEach(i => {
						if (v.ModelId === i.Id) v.modelName = i.Name
					})
				})
				this.list = res
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
			this.getDeviceCount()
		},
		methods: {
			// 加入购物车
			sale(index) {
				this.$u.api.OrderSaleDevice({
					order: this.optionId,
					model: this.list[index].ModelId
				}).then(res => {
					console.log(res)
					if (res.success === false) return
					this.deviceCount = res.total
					this.list[index].Count = res.count
					uni.showToast({
						icon: 'none',
						title: '加入购物车成功！'
					})
					this.getDeviceCount()
					console.log(res)
				}).catch(err => {
					uni.showToast({
						title: '添加商品失败！',
						icon: 'none'
					})
					console.log(err)
				})
			},
			editOrder() {
				this.editShow = true
			},
			dispatchOrder() {
				this.dispatchShow = true
			},
			// 派单出库
			dispatch() {
				if (this.deviceCount === 0) {
					uni.showToast({
						icon: 'none',
						title: '没有选择任何商品！'
					});
					return
				}
				this.$u.api.OrderSaled({
					order: this.optionId
				}).then(res => {
					uni.showToast({
						title: '派单出库成功！'
					})
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '派单出库失败！'
					})
				})
				console.log(this.deviceCount)
			},
			// 获取出库数量
			getDeviceCount() {
				this.$u.api.getOrderSaleDeviceCounts({
					order: this.optionId
				}).then(res => {
					this.deviceCount = res
					console.log(res)
				}).catch(err => {})
			},
			toCart() {
				setTimeout(() => {
					this.$u.route('pages/order/sale/saledevices', {
						Id: this.optionId
					})
				},300)
			},
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
		height: 304rpx;

		&:last-child {
			margin: 0 !important;
		}

		.u-image {
			margin: 20rpx 0 0 20rpx;
		}

		._info {
			span {
				margin: 10rpx 0 0 10rpx;
			}
		}

		.sale {
			padding-bottom: 20rpx::v-deep .u-btn {
				width: 200rpx;
				height: 64rpx;
				margin-left: 65%;
			}
		}
	}

	._blank {
		background: #FFFFFF;
		height: 278rpx;
	}

	.customer {
		position: fixed;
		width: 100%;
		height: 280rpx;
		background: #FFFFFF;
		bottom: 0;
		z-index: 999;

		.navigation {
			display: flex;
			border: solid 2rpx #f2f2f2;
			background-color: #ffffff;
			padding: 16rpx 0;

			.left {
				display: flex;
				font-size: 20rpx;
				margin-left: 30%;

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

				.btn {
					line-height: 66rpx;
					padding: 0 30rpx;
					border-radius: 36rpx;
					color: #ffffff;
				}

				.cart {
					background-color: $u-type-error;
					margin-right: 30rpx;
				}

				.buy {
					background-color: #ff7900;
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
