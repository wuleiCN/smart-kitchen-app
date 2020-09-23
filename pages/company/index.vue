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
			<u-card padding="0" :title="title" thumb="/static/comment/spot.png">
				<view class="u-card-wrap" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between">
						<image src="/static/tabbar/user.png" mode="aspectFill" shape="circle"></image>
						<view class="u-body-item-title info"><span>文晓港</span><span class="news-wraning">
								消息未送达</span></view>
						<view class="u-body-item-title time"><span>22:00</span><span>
								<p>5</p>
							</span></view>
					</view>
				</view>
				<view class="u-card-wrap" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between">
						<image src="/static/tabbar/user.png" mode="aspectFill" shape="circle"></image>
						<view class="u-body-item-title info"><span>文晓港</span><span class="news-wraning">
								消息未送达</span></view>
						<view class="u-body-item-title time"><span>22:00</span><span>
								<p>5</p>
							</span></view>
					</view>
				</view>
				<view class="u-card-wrap" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between">
						<image src="/static/tabbar/user.png" mode="aspectFill" shape="circle"></image>
						<view class="u-body-item-title info"><span>文晓港</span><span class="news-wraning">
								消息未送达</span></view>
						<view class="u-body-item-title time"><span>22:00</span><span>
								<p>5</p>
							</span></view>
					</view>
				</view>
				<view class="u-card-wrap" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between">
						<image src="/static/tabbar/user.png" mode="aspectFill" shape="circle"></image>
						<view class="u-body-item-title info"><span>文晓港</span><span class="news-success">
								消息已送达</span></view>
						<view class="u-body-item-title time"><span>22:00</span><span>
								<p>5</p>
							</span></view>
					</view>
				</view>
			</u-card>
		</view>
		<u-tabbar :list="vuex_tabbar" bg-color="#303133" active-color="#0081ff" inactive-color="#aaaaaa" :mid-button="true" />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				title: '通知公告',
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
						url: '/pages/device/device'
					},
					{
						icon: 'eye',
						text: '工单监控',
						color: '#ff9900'
					},
					{
						icon: 'shopping-cart',
						text: '产品销售',
						color: '#32CD32'
					},
					{
						icon: 'car',
						text: '销售出库',
						color: '#48D1CC'
					},
					{
						icon: 'file-text',
						text: '施工工单',
						color: '2F4F4F'
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
		onLoad() {

		},
		computed: {
			...mapState(["vuex_tabbar"])
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.text-area {

			// .grid {
			// 	background-color: #FFFFFF;
			// 	width: 370px;
			// }
			.grid-text {
				font-size: 28rpx;
				margin-top: 4rpx;
				color: $u-type-info;
			}

			::v-deep .u-card {
				margin: 10rpx 0 !important;

				.u-card__head {
					padding: 5rpx !important;
				}

				.u-card-wrap {
					background-color: $u-bg-color;
					padding: 1rpx;
				}

				.u-body-item {
					font-size: 32rpx;
					color: #333;
					padding: 20rpx 10rpx;
					background: #FFFFFF;

					.info {
						display: flex;
						flex-direction: column;
						margin-left: 10rpx;

						span:nth-child(1) {
							color: $u-content-color;
							font-size: 32rpx;
						}

						span:nth-child(2) {
							font-size: 24rpx;
							color: $u-tips-color;
							margin-top: 10rpx;
						}
					}

					.time {
						flex-direction: column;
						display: flex;
						text-align: center;
						margin-left: 50%;

						span:nth-child(1) {
							color: $u-tips-color;
						}

						span:nth-child(2) {
							margin-top: 10rpx;

							p {
								display: block;
								width: 32rpx;
								height: 32rpx;
								color: #FFFFFF;
								font-size: 24rpx;
								border-radius: 50%;
								background: $u-type-info;
								transform: translateX(50%);
							}
						}
					}
				}

				.u-body-item image {
					width: 120rpx;
					flex: 0 0 120rpx;
					height: 120rpx;
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
	}
</style>
