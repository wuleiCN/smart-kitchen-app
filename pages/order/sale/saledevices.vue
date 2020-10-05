<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="销售清单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">销售信息</span>
		</view>
		<view class="info u-flex-col" v-if="order != null">
			<span><strong>客户单位：</strong>test</span>
			<span><strong>联系人：</strong>ww</span>
			<span><strong>联系电话：</strong>1234</span>
			<span><strong>收货地址：</strong>ww</span>
			<span><strong>销售说明：</strong>1234</span>
		</view>
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">销售清单</span>
		</view>
		<scroll-view class="product" show-scrollbar :scroll-y="true" :lower-threshold="5" @scrolltolower="toLowFun">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id" :options="options"
			 @open="open" @click="alarm">
				<view class="item u-border-bottom">
					<image mode="aspectFill" :src="item.images" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<text>设备型号：{{ item.name }}</text>
						<text class="u-line-2">设备类别：{{ item.model }}</text>
						<text>设备描述：{{ item.remark}}</text>
						<u-number-box v-model="item.count" disabled-input :long-press='false' />
					</view>
				</view>
			</u-swipe-action>
			<u-loadmore :status="status" />
		</scroll-view>
		<!-- <view class="_blank" /> -->
		<view class="dispatch">
			<u-button type="success" @click="dispatchOrder">确定派单</u-button>
		</view>
		<u-modal v-model="dispatchShow" :content="content" show-cancel-button @confirm="dispatch" @cancel="dispatchNo" />
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
				dispatchShow: false,
				optionId: '',
				order: {},
				content: '确定立刻派单出库吗？',
				list: [{
						id: 1,
						count: 0,
						name: 'test01',
						remark: 'remark',
						model: '长安回望绣成堆',
						images: '/static/devices/device.png',
						show: false
					},
					{
						id: 2,
						count: 0,
						name: 'test02',
						remark: 'remark',
						model: '新丰绿树起黄埃',
						images: '/static/devices/device.png',
						show: false
					},
					{
						id: 3,
						count: 0,
						name: 'test03',
						remark: 'remark',
						model: '登临送目',
						images: '/static/devices/warning.png',
						show: false,
					},
					{
						id: 4,
						count: 0,
						name: 'test03',
						remark: 'remark',
						model: '登临送目',
						images: '/static/devices/warning.png',
						show: false,
					},
					{
						id: 5,
						count: 0,
						name: 'test03',
						remark: 'remark',
						model: '登临送目',
						images: '/static/devices/warning.png',
						show: false,
					},
					{
						id: 6,
						count: 0,
						name: 'test03',
						remark: 'remark',
						model: '登临送目',
						images: '/static/devices/warning.png',
						show: false,
					},
					{
						id: 7,
						count: 0,
						name: 'test03',
						remark: 'remark',
						model: '登临送目',
						images: '/static/devices/warning.png',
						show: false,
					},
					{
						id: 8,
						count: 0,
						name: 'test03',
						remark: 'remark',
						model: '登临送目',
						images: '/static/devices/warning.png',
						show: false,
					}
				],
				show: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		onLoad(option) {
			this.optionId = option.id
			this.$u.api.getOrderInfo({id: option.id}).then(res => {
				console.log(res)
			}).catch(err => {})
			this.$u.api.getOrderSaleDevices({id: option.id}).then(res => {
				console.log(res)
			}).catch(err => {})
		},
		methods: {
			open(index) {
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			alarm(index) {
				this.list.splice(index, 1);
				console.log(index)
			},
			dispatchOrder() {
				this.dispatchShow = true
			},
			dispatch() {
				this.$u.api.updateOrderSaleDevices({devices: this.list}).then(res => {
					console.log(res)
				}).catch(err => {})
				console.log(1)
			},
			dispatchNo() {
				console.log(0)
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
