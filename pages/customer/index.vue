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
				<u-card padding="0" :title="title" thumb="/static/comment/spot.png">
					<view class="u-card-wrap" slot="body" v-for="(v, i) in warning" :key="i">
						<view class="u-body-item u-flex u-border-bottom u-col-between">
							<image src="/static/tabbar/user2.png" mode="aspectFill" shape="circle"></image>
							<view class="u-body-item-title info"><span>{{v.Content}}</span><span class="news-wraning">
									消息未送达</span></view>
							<view class="u-body-item-title time"><span>{{$date.dateFormat('HH:MM', v.DisposedOn)}}</span><span>
									<p>5</p>
								</span></view>
						</view>
					</view>
				</u-card>
			</scroll-view>
		</view>
		<u-tabbar :list="vuex_tabbar" bg-color="#303133" active-color="#0081ff" inactive-color="#aaaaaa" :mid-button="true" />
		<!-- <u-modal v-model="$store.state.vuex_popupShow" :content="!warning.length ? '' : warning[0].Content" title="警告"
		 show-cancel-button @confirm="handle" /> -->
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
						icon: 'account-fill',
						text: '员工信息',
						color: '#2979ff',
						url: '/pages/customer/employees'
					},
					{
						icon: 'plus-people-fill',
						text: '员工注册',
						color: '#19be6b',
						url: '/pages/customer/register'
					}
				]
			}
		},
		mounted() {
			uni.getSystemInfo({
				success:(res) => {
					this.screenHeight = res.windowHeight  + 'rpx'
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
				padding: 10rpx 0 0;
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
						margin-left: 5%;

						span:nth-child(1) {
							color: $u-tips-color;
							font-size: 14px;
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
	}
</style>
