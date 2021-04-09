<template>
	<view class="content">
		<u-navbar :is-back="false" title="首页" :title-width="300" title-color="#000000" :title-size="36" />
		<view class="text-area">
			<u-swiper :list="list" :height="351"></u-swiper>
			<view class="menu">
				<view v-for="(v, i) in gridList" :key="i" @click="$u.route(v.url)">
					<u-image width="102rpx" height="102rpx" :src="v.src" shape="circle" />
					<span>{{v.text}}</span>
				</view>
			</view>
			<view class="info_card">
				<view class="info">信息展板</view>
				<scroll-view class="scroll-view" :scroll-x="true">
					<view class="scroll-view-item" v-for="(v, i) in 5" :key="i">
						<view class="info_block">
							<u-image src="/static/icon/Text01.png" />
							<view class="info_box">
								<view class="info_header">
									我是信息标题{{v}}
								</view>
								<view class="info_center">
									{{i}}我是内容我是内容我是内容我是内容我是内容我是内容
								</view>
							</view>
						</view>
						<view class="info_ck">
							<button class="see_btn">查看</button>
							<span>发布时间：2021-03-22</span>
						</view>
					</view>
				</scroll-view>
				<view class="info_block_b">
					<view style="background-image: url(../../static/background/WaringInfo.png);"
						class="info_block_b_box" />
					<view style="background-image: url(../../static/background/Notice.png);"
						class="info_block_b_box" />
					<view style="background-image: url(../../static/background/MainInfo.png);"
						class="info_block_b_box" />
				</view>
				<view class="info">报表统计</view>
				<view class="info_block_c">
					<!-- #ifdef APP-PLUS || H5 -->
					<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts"
						class="echarts" />
					<!-- #endif -->
				</view>
			</view>
	</view>
	<u-tabbar :list="vuex_tabbar" bg-color="#ffffff" active-color="#FC7930" inactive-color="#aaaaaa" :mid-button="true"
		:border-top="false" />
	<Modal />
	</view>
</template>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>

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
				list: [
					'/static/banners/banner1.jpg',
					'/static/banners/banner2.jpg',
					'/static/banners/banner3.jpg'
				],
				option: {
					color: '#409EFF',
					legend: {
						data: ['报警统计']
					},
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						name: '报警统计',
						type: 'bar',
						data: [120, 200, 150, 80, 70, 110, 130],
						showBackground: true,
						backgroundStyle: {
							color: 'rgba(180, 180, 180, 0.2)'
						}
					}]
				},
				gridList: [{
						text: '客户管理',
						src: '../../static/icon/Customer.png',
						url: 'pages/customer/index'
					},
					{
						text: '权限管理',
						src: '../../static/icon/Authority.png',
						url: 'pages/autManagement/index'
					},
					{
						text: '设备管理',
						src: '../../static/icon/Device.png',
						url: 'pages/order/index'
					},
					{
						text: '日志管理',
						src: '../../static/icon/Log.png'
					},
					{
						text: '订单管理',
						src: '../../static/icon/Order.png'
					}
				]
			}
		},
		mounted() {
			// console.log(this.warning, this.vuex_tabbar)
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
		},
		methods: {
			onViewClick(options) {
				console.log(options)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		::v-deep .text-area {
			.u-swiper-wrap {
				border-radius: 20rpx !important;
				margin: 24rpx 20rpx;

				.uni-swiper {
					height: 351rpx;
				}
			}

			.menu {
				width: 702rpx;
				height: 180rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				margin: 0 24rpx;
				padding: 0 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.u-image {
					margin-left: 50%;
					transform: translateX(-50%);
				}
			}

			.info_card {
				width: 100%;
				height: 100%;

				.info {
					margin: 25rpx 0 12rpx 24rpx;
					height: 31rpx;
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: 600;
					color: #333333;
				}

				.scroll-view {
					width: 100%;
					height: 220rpx;
					white-space: nowrap;

					.scroll-view-item {
						display: inline-block;
						background: #FFFFFF;
						width: 530rpx;
						height: 200rpx;
						background: #fff;
						margin: 12rpx 0 0 24rpx;
						border-radius: 20rpx;

						.info_block {
							display: flex;
							justify-content: space-around;
							transform: translate(20rpx, 20rpx);

							.u-image {
								width: 120rpx !important;
								height: 120rpx !important;
							}

							.info_box {
								width: 358rpx;
								height: 120rpx;

								.info_header {
									font-size: 28rpx;
									font-weight: 600;
									color: #333333;
									line-height: 36rpx;
								}

								.info_center {
									height: 80rpx;
									font-size: 24rpx;
									line-height: 80rpx;
									width: 320rpx;
									color: #333333;
									overflow: hidden;
									text-overflow: ellipsis;
								}
							}
						}

						.info_ck {
							display: flex;
							justify-content: center;
							align-items: center;
							transform: translateY(50%);
							
							.see_btn {
								color: #FFFFFF;
								margin-right: 30rpx;
								font-size: 20rpx;
								line-height: 36rpx;
								width: 88rpx;
								height: 36rpx;
								background: #FC7930;
								border-radius: 18rpx;
							}
							span {
								font-size: 20rpx;
								color: #CCCCCC;
								margin-right: 20rpx;
							}
						}
					}
				}
			}

			.info_block_b {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 702rpx;
				height: 266rpx;
				background: #FFFFFF;
				border: 1rpx solid #FFFFFF;
				border-radius: 20rpx;
				transform: translateX(-50%);
				margin-left: 50%;
				margin-top: 20rpx;

				.info_block_b_box {
					width: 206rpx;
					height: 206rpx;
					background-size: 206rpx;
				}
			}

			.info_block_c {
				width: 702rpx;
				height: 447rpx;
				background: #FFFFFF;
				border: 1rpx solid #FFFFFF;
				border-radius: 20rpx;
				transform: translateX(-50%);
				margin-left: 50%;
				margin-top: 20rpx;
				margin-bottom: 40rpx;

				.echarts {
					height: 447rpx;
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
