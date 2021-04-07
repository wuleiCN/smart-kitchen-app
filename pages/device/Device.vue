<template>
	<view class="content">
		<u-navbar :is-back="true" title="设备信息" :title-width="300" />
		<scroll-view class="product" show-scrollbar :scroll-y="true" :lower-threshold="5" @scrolltolower="toLowFun">
			<u-card padding="0" v-for="(item,index) in dveices" :key="index" @click="toDetail(item)">
				<view class="u-card-wrap" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between">
						<image src="/static/devices/1.png" mode="aspectFill" shape="circle"></image>
						<view class="u-body-item-title info"><span>设备名称：{{item.DeviceName}}</span><span
								class="news-wraning">
								设备型号：{{item.Name}}</span></view>
						<view class="u-body-item-title _icon">
							<u-icon name="arrow-right" color="#c8c9cc"></u-icon>
						</view>
					</view>
				</view>
			</u-card>
			<u-loadmore :status="status" />
		</scroll-view>
		<u-button class="add" type="primary" @click="$u.route('pages/device/Warehousing')">设备入库</u-button>
		<Modal />
	</view>
</template>

<script>
	import Modal from "@/pages/components/modal.vue"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				dveices: [],
				pages: {
					page: 1,
					size: 10,
					offset: 0
				},
				deviceType: uni.getStorageSync('DeviceType'),
				status: 'nomore'
			}
		},
		onLoad() {
			this.getDveices()
		},
		methods: {
			toDetail(item) {
				this.$u.route('pages/device/Detail', {
					params: JSON.stringify(item)
				});
			},
			getDveices() {
				this.$u.api.getDevicesInfoAll({
					CompanyId: '4DEE5709-6096-40C7-9D0C-793E391D57B9',
					...this.pages
				}).then(res => {
					this.dveices = res
					res.map(v => {
						this.deviceType.forEach(i => {
							if (v.Type === i.value) v.DeviceName = i.name
						})
					})
					this.status = 'nomore';
					console.log(res)
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '获取数据失败！'
					})
				})
			},
			toLowFun() {
				this.$u.throttle(this.load, 2000)
			},
			load() {
				this.status = 'loading';
				this.pages.page = this.pages.page++
				this.pages.offset = this.pages.page * this.pages.size
				this.getDveices()
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
