<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="销售清单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">销售信息</span>
		</view>
		<view class="info u-flex-col" v-if="order != null">
			<span><strong>客户单位：</strong>{{order.CustomerId}}</span>
			<span><strong>联系人：</strong>{{order.Contact}}</span>
			<span><strong>联系电话：</strong>{{order.Phone}}</span>
			<span><strong>收货地址：</strong>{{order.Address}}</span>
			<span><strong>销售说明：</strong>{{order.Comment}}</span>
		</view>
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">销售清单</span>
		</view>
		<scroll-view class="product" show-scrollbar :scroll-y="true" :lower-threshold="5" @scrolltolower="toLowFun">
			<u-swipe-action v-for="(item, index) in list" :key="index" :show="item.show" :index="index" :options="options" @open="open"
			 @click="alarm">
				<view class="item u-border-bottom">
					<image mode="aspectFill" src="" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<text>设备型号：{{ item.modelName }}</text>
						<text class="u-line-2">设备类别：{{ item.Name }}</text>
						<text>设备描述：...</text>
						<u-number-box v-model="item.Count" disabled-input :long-press='false' />
					</view>
				</view>
			</u-swipe-action>
			<u-loadmore :status="status" />
		</scroll-view>
		<view class="dispatch">
			<u-button type="success" @click="dispatchOrder">确定派单</u-button>
		</view>
		<u-modal v-model="dispatchShow" :content="content" show-cancel-button @confirm="dispatch" />
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
				dispatchShow: false,
				optionId: '',
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				order: {},
				content: '确定立刻派单出库吗？',
				list: [],
				DeviceType: uni.getStorageSync('DeviceType'),
				modelList: uni.getStorageSync('GetAllModle')
			}
		},
		onLoad(option) {
			this.optionId = option.Id
			uni.showLoading({
				title: '加载中...'
			})
			this.$u.api.getOrderInfo({
				id: this.optionId
			}).then(res => {
				uni.hideLoading()
				this.order = res
			}).catch(err => {
				uni.showToast({
					icon: 'none',
					title: '数据加载失败！'
				})
				console.log(err)
			})
			this.getOrderList()
			console.log(option)
		},
		watch: {
			list: {
				handler(val,old) {
					if(old.length !== 0) {
						this.updataOrder()
						console.log(val,old)
					}
				},
				deep: true
			}
		},
		methods: {
			open(index) {
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			// 更新设备
			updataOrder() {
				this.$u.api.updateOrderSaleDevices({
					devices: this.list
				}).then(res => {
					// this.getOrderList()
					console.log(res)
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '更新失败！，' + err
					})
					console.log(err)
				})
			},
			// 获取设备清单
			getOrderList() {
				this.$u.api.getOrderSaleDevices({
					id: this.optionId
				}).then(res => {
					res.map(v => {
						v.show = false
					})
					res.map(v => {
						this.DeviceType.forEach(i => {
							if(v.Type === i.value) v.Name = i.name
						})
						
					})
					res.map(v => {
						this.modelList.forEach(i => {
							if(v.ModelId === i.Id) v.modelName = i.Name
						})
					})
					this.list = res
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 删除设备
			alarm(index) {
				this.list.splice(index, 1);
				// this.list[index].show = false
				console.log(this.list)
			},
			dispatchOrder() {
				this.dispatchShow = true
			},
			// 派单
			dispatch() {
				this.$u.api.orderSale({
					order: this.optionId
				}).then(res => {
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
			height: 100rpx;
			background: #FFFFFF;
			border-bottom: 1px solid #f3f3f3;

			._title {
				height: 80rpx;
				margin-left: 20rpx;
			}

			.line {
				height: 30rpx;
				border-radius: 30%;
				border: 5rpx solid #f37b1d;
				margin-left: 5%;
			}
		}

		.info {
			height: 300rpx;
			background: #FFFFFF;
			padding: 15px;

			span {
				padding-bottom: 10rpx;
			}
		}

		.product {
			height: 900rpx;

			.item {
				display: flex;
				padding: 20rpx;

				::v-deep .u-numberbox {
					touch-action: none;
				}
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
					margin-left: 160rpx;
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

		._blank {
			width: 100%;
			height: 80rpx;
		}

		.dispatch {
			z-index: 999;
			position: fixed;
			width: 100%;
			height: 80rpx;
			bottom: 0;
			background: #FFFFFF;
		}
	}
</style>
