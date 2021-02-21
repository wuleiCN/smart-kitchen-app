<template>
	<view class="content">
		<u-navbar :is-back="false" title="香道云厨智慧厨房" :title-width="300" title-color="#ffffff" :background="background" />
		<view class="text-area">
			<u-swiper :list="list"></u-swiper>
			<u-grid :col="4" :border="false">
				<u-grid-item v-for="(value,index) in gridList" :key="index" :index="index" style="padding: 20px 0 0;" @click="$u.route(value.url)">
					<u-icon :name="value.icon" :size="56" :color="value.color"></u-icon>
					<view class="grid-text" style="margin-top: 10px">{{value.text}}</view>
				</u-grid-item>
			</u-grid>
			<scroll-view show-scrollbar :scroll-y="true" :lower-threshold="5" :style="{height: screenHeight}">
				<u-alert-tips type="warning" :title="title" show-icon></u-alert-tips>
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap" v-for="(item, index) in warning" :key="index">
					<image mode="aspectFill" src="@/static/devices/fire.png" />
					<text class="name">{{ item.Type }}</text>
					<text class="title u-line-2">{{ item.Content }}</text>
					<text class="time">{{ $date.dateFormat('YY-mm-dd HH:MM', item.DisposedOn) }}</text>
					<span>详情>></span>
				</view>
				<u-empty v-if="warning.length === 0" text="暂无报警记录" mode="list"></u-empty>
			</scroll-view>
		</view>
		<u-tabbar :list="vuex_tabbar" bg-color="#303133" active-color="#0081ff" inactive-color="#aaaaaa" :mid-button="true" />
		<Modal />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	import Modal from "../components/modal.vue"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				title: '通知公告',
				warning: [],
				screenHeight: null,
				list: [
					'/static/banners/banner1.jpg',
					'/static/banners/banner2.jpg',
					'/static/banners/banner3.jpg'
				],
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				gridList: [{
						icon: 'bell',
						text: '报警信息',
						color: '#fa3534',
						url: '/pages/message/New'
					},
					{
						icon: 'grid',
						text: '设备信息',
						color: '#9932CC',
						url: '/pages/device/Device'
					},
					{
						icon: 'eye',
						text: '工单监控',
						color: '#ff9900',
						url: '/pages/order/monitor/list'
					},
					{
						icon: 'shopping-cart',
						text: '产品销售',
						color: '#32CD32',
						url: '/pages/order/sale/list'
					},
					{
						icon: 'car',
						text: '销售出库',
						color: '#48D1CC',
						url: 'pages/order/distribute/list'
					},
					{
						icon: 'file-text',
						text: '施工工单',
						color: '2F4F4F',
						url: 'pages/order/install/list'
					},
					{
						icon: 'calendar',
						text: '维修工单',
						color: '#9932CC'
					},
					{
						icon: 'phone',
						text: '维保工单',
						color: '#9400D3'
					}
				]
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight = res.windowHeight + 'rpx'
					console.log(res)
				}
			})
			console.log(this.warning, uni.getStorageSync('warnInfo'))
		},
		watch: {
			'$store.state.vuex_popupShow': {
				handler() {
					this.warning = uni.getStorageSync('warnInfo')
				},
				immediate: true
			}
		},
		computed: {
			...mapState(["vuex_tabbar"])
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.text-area {

			::v-deep .u-grid {
				background-color: #FFFFFF !important;
			}

			.grid-text {
				font-size: 28rpx;
				margin-top: 20rpx;
				color: $u-type-info;
			}

			::v-deep .u-card {
				margin: 10rpx 0 !important;

				.u-card__head {
					padding: 5rpx !important;
				}

				.u-card-wrap {
					background-color: $u-bg-color;
					// padding: 1rpx;
				}

				.u-body-item {
					font-size: 32rpx;
					color: #333;
					padding: 20rpx 10rpx;
					background: #FFFFFF;

					.title-wrap {
						width: 100%;

						image {
							width: 100rpx;
							flex: 0 0 100rpx;
							height: 100rpx;
							margin-right: 20rpx;
							border-radius: 12rpx;
						}

						.name {
							font-size: 28rpx;
							color: $u-type-info;
						}

						.title {
							text-align: left;
							font-size: 24rpx;
							color: $u-type-info-dark;
							margin-top: 10rpx;
						}

						.time {
							font-size: 24rpx;
							color: $u-tips-color;
						}

						span {
							font-size: 24rpx;
							color: $u-type-info-dark;
							margin-left: 49%;
						}
					}
				}

				.u-body-item image {
					width: 96rpx;
					flex: 0 0 96rpx;
					height: 96rpx;
					border-radius: 8rpx;
					margin-left: 12rpx;
				}
			}

			.news-wraning {
				color: $u-type-warning !important;
			}

			.news-success {
				color: $u-type-success !important;
			}
		}

		::v-deep .u-fixed-placeholder {
			height: calc(74rpx) !important;
		}
		::v-deep .u-empty {
			height: 300rpx !important;
		}
	}
</style>
