<template>
	<view class="content">
		<u-navbar :is-back="true" title="设备出库" :title-width="300" />
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">销售信息</span>
		</view>
		<view class="info u-flex-col" v-if="order != null">
			<span>客户单位：{{customerName}}</span>
			<span>联系人：{{order.Contact}}</span>
			<span>联系电话：{{order.Phone}}</span>
			<span>收货地址：{{order.Address}}</span>
			<span>销售说明：{{order.Comment}}</span>
		</view>
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">销售清单</span>
		</view>
		<scroll-view class="product" show-scrollbar scroll-top="0" :scroll-y="true" :lower-threshold="5"
			@scrolltolower="toLowFun">
			<view class="item u-border-bottom" v-for="(item, index) in list" @click="toDevicedistribute(item.Id)">
				<image mode="aspectFill" src="../../../static/devices/production.png" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text>设备型号：{{ item.modelName }}</text>
					<text class="u-line-2">设备类别：{{ item.DeviceType }}</text>
					<text>设备数量：{{item.Delivered}}/{{item.Count}}</text>
				</view>
			</view>
			<u-loadmore :status="status" />
			<view class="block" />
		</scroll-view>
		<view class="dispatch">
			<u-button hover-class="none" @click="dispatchOrder">出库回单</u-button>
			<u-button hover-class="none">提交</u-button>
		</view>
		<u-modal v-model="dispatchShow" :content="content" show-cancel-button @confirm="dispatch" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'nomore',
				dispatchShow: false,
				optionId: '',
				order: {},
				customerName: '',
				content: '确定立刻派单出库吗？',
				list: [],
				deviceTypeList: uni.getStorageSync('DeviceType'),
				modelList: uni.getStorageSync('DevicesMdole')
			}
		},
		onLoad(option) {
			this.optionId = option.Id
			console.log(option)
		},
		mounted() {
			this.getOrderInfo()
			this.getOrderList()
		},
		watch: {},
		methods: {
			// 获取订单信息
			getOrderInfo() {
				this.$u.api.getOrderInfo({
					order: this.optionId
				}).then(res => {
					if (res.success) {
						this.order = res.data
						this.$u.api.getCustomerById({
							id: res.data.Customer
						}).then(v => {
							this.customerName = v.data.Name
						})
					}
					else this.$u.toast('数据加载失败!')
					console.log(res);
				})
			},
			// 获取设备清单
			getOrderList() {
				this.$u.api.getOrderSaleDevices({
					order: this.optionId
				}).then(res => {
					if (!res.success) this.$u.toast('获取清单列表失败！')
					else {
						res.data.map(v => {
							this.modelList.forEach(i => {
								if (v.Model === i.Id) {
									v.modelName = i.Name
									v.type = i.Type
								}
							})
						})
						this.list = res.data
						this.list.map(v => {
							v.DeviceType = this.deviceTypeList.find(i => v.type === i.value).name
						})
					}
					console.log(this.list, this.deviceTypeList)
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取指定客户信息
			dispatchOrder() {
				this.dispatchShow = true
			},
			// 派单
			dispatch() {
				this.$u.api.acceptSaleOrder({
					id: this.optionId
				}).then(res => {
					if (res.success) {
						this.$u.toast('派单成功！')
						this.$u.route({
							type: 'navigateBack'
						})
					} else this.$u.toast(res.message)
					console.log(res)
				})
			},
			// 设备出库
			toDevicedistribute(id) {
				this.$u.route('pages/order/distribute/devicedistribute', {
					order: this.optionId,
					device: id
				})
			},
			// 上拉加载
			toLowFun() {
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
	.content {
		.section {
			width: 100%;
			padding: 30rpx 0;
			margin-top: 30rpx;
			background: #FFFFFF;

			._title {
				margin-left: 20rpx;
				font-size: 32rpx;
				font-weight: 600;
			}

			.line {
				height: 30rpx;
				border-radius: 30%;
				border: 5rpx solid #f37b1d;
				margin-left: 23rpx;
			}
		}

		.info {
			// height: 420rpx;
			background: #FFFFFF;
			padding: 0 0 20rpx 23rpx;

			span {
				font-size: 28rpx;
				color: #666666;
				padding-bottom: 10rpx;
			}
		}

		.product {
			height: 720rpx;

			.item {
				display: flex;
				padding: 20rpx;

			}

			image {
				width: 100rpx;
				flex: 0 0 100rpx;
				height: 100rpx;
				margin-right: 20rpx;
				border-radius: 12rpx;
			}

			.title-wrap {
				text {
					text-align: left;
					font-size: 24rpx;
					color: $u-type-info-dark;
					// margin-top: 10rpx;
				}

				::v-deep .u-numberbox {
					margin-left: 280rpx;
					width: 147rpx;
					touch-action: none;
				}
			}

			._none {
				height: 200rpx;
				background: #ffffff;
				text-align: center;

				p {
					transform: translateY(90rpx);
				}
			}
		}

		.block {
			width: 100%;
			height: 98rpx;
		}

		.dispatch {
			z-index: 999;
			position: fixed;
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			height: 98rpx;
			bottom: 0;
			background: #FFFFFF;

			.u-btn {
				width: 300rpx;
				height: 68rpx;
				color: #FFFFFF;
				background: #FC7930;
				border-radius: 10rpx;
			}
		}
	}
</style>
