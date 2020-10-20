<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="设备信息"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<scroll-view class="product" show-scrollbar :scroll-y="true" :lower-threshold="5" @scrolltolower="toLowFun">
			<u-card padding="0" @click="toDetail" v-for="(item,index) in dveices" :key="index">
				<view class="u-card-wrap" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between">
						<image src="/static/devices/1.png" mode="aspectFill" shape="circle"></image>
						<view class="u-body-item-title info"><span>设备名称：{{dveices.name}}</span><span class="news-wraning">
								设备型号：{{dveices.model}}</span></view>
						<view class="u-body-item-title _icon">
							<u-icon name="arrow-right" color="#c8c9cc"></u-icon>
						</view>
					</view>
				</view>
			</u-card>
			<u-loadmore :status="status" />
		</scroll-view>
		<u-button class="add" type="primary" @click="$u.route('pages/device/Warehousing')">设备入库</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				dveices: [{
						name: 'test',
						model: '001'
					},
					{
						name: 'test',
						model: '001'
					},
					{
						name: 'test',
						model: '001'
					},
					{
						name: 'test',
						model: '001'
					}
				],
				status: 'nomore'
			}
		},
		onShow() {
			this.$u.api.getDevicesInfoAll().then(res => {
				console.log(res)
			}).catch(err => {
				uni.showToast({
					icon: 'none',
					title: '获取数据失败！'
				})
			})
		},
		methods: {
			toDetail() {
				this.$u.route('pages/device/Detail', {
					id: 123
				});
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
	::v-deep .u-card {
		margin: 0 !important;
		position: relative;

		image {
			width: 120rpx;
			height: 120rpx;
		}

		.info {
			display: flex;
			flex-direction: column;
			margin-left: 10rpx;
			font-size: 24rpx;
			color: $u-content-color;

			span:nth-child(1) {
				margin-bottom: 10rpx;
			}
		}

		._icon {
			position: absolute;
			right: 20rpx;
		}
	}
	.add {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
