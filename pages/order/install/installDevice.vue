<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="施工安装"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">销售信息</span>
		</view>
		<view class="info u-flex-col">
			<span><strong>客户单位：</strong></span>
			<span><strong>销售时间：</strong>{{order.OrderOn}}</span>
			<span><strong>联系人：</strong>{{order.Contact}}</span>
			<span><strong>联系电话：</strong>{{order.Phone}}</span>
			<span><strong>销售说明：</strong>{{order.Comment || '无'}}</span>
		</view>
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">出库设备</span>
		</view>
		<scroll-view class="product" show-scrollbar :scroll-y="true" :lower-threshold="5" @scrolltolower="toLowFun">
			<view class="device u-flex-col" v-for="(item,index) in devices" :key="index" @click="toDeviceDisribute(item.Id,item.InstalledCount,item.DistributedCount,item.Type,index)">
				<span><strong>设备型号：</strong>{{item.modelName}}</span>
				<span><strong>设备类别：</strong>{{item.Name}}</span>
				<span><strong>出库数量：</strong>{{item.InstalledCount}} / {{item.DistributedCount}}</span>
			</view>
			<u-loadmore :status="status" />
		</scroll-view>
		<view class="operation">
			<u-button type="success" @click="distributeShow = true">出库回单</u-button>
		</view>
		<u-modal v-model="distributeShow" :content="content" show-cancel-button @confirm="distributed" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				order: {},
				status: 'nomore',
				optionId: '',
				devices: [],
				devicesDetails: [],
				content: '确定要回单吗？',
				distributeShow: false,
				DeviceType: uni.getStorageSync('DeviceType'),
				modelList: uni.getStorageSync('GetAllModle')
			}
		},
		onLoad(option) {
			this.optionId = option.id
		},
		onShow() {
			this.$u.api.getOrderInfo({
				id: this.optionId
			}).then(res => {
				this.order = res
				console.log(res)
			}).catch(err => {})
			// 获取出货设备列表
			this.$u.api.getSaleOrderDevices({
				id: this.optionId
			}).then(res => {
				res.map(v => {
					this.DeviceType.forEach(i => {
						if (v.Type === i.value) v.Name = i.name
					})
					this.modelList.forEach(i => {
						if (v.ModelId === i.Id) v.modelName = i.Name
					})
				})
				this.devices = res
				console.log(res, this.modelList)
			}).catch(err => {})
			// 获取设备详情
			this.$u.api.getSaleOrderDeviceDetails({
				// id: '20B9C980-F9ED-4701-BD3E-170F0917A1D6'
				id: this.optionId
			}).then(res => {
				this.devicesDetails = res
				console.log(res)
			}).catch(err => {})
		},
		methods: {
			toLowFun() {
				this.$u.throttle(this.load, 2000)
			},
			load() {
				this.status = 'loading';
				setTimeout(() => {
					this.status = 'nomore';
				}, 2000)
				console.log("触底事件");
			},
			toDeviceDisribute(id, Count, distributeCount, type, index) {
				if (distributeCount != Count) {
					setTimeout(() => {
						this.$u.route('pages/order/install/install', {
							id,
							type,
							order: this.optionId,
							deviceId: this.devicesDetails[index].Id
						}, 200)
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '已出库,请选择未出库的设备！'
					})
				}
			},
			// 出库回单
			distributed() {
				const canFinish = this.devices.every(v => v.Count === v.DistributedCount)
				console.log(canFinish)
				if (canFinish === false) {
					uni.showToast({
						icon: 'none',
						title: '设备出库尚未完成！'
					});
					return false;
				}
				this.$u.api.distributeFinish({
					order: this.optionId
				}).then(res => {
					uni.showToast({
						icon: 'none',
						title: '回单成功！'
					})
					console.log(res)
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '回单失败！'
					})
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		.section {
			z-index: 9;
			position: sticky;
			width: 100%;
			height: 100rpx;
			background: #FFFFFF;
			border-bottom: 1px solid #f3f3f3;
			box-shadow: 6rpx 1rpx 6rpx rgba(0, 0, 0, 0.1);

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
			padding: 30rpx;

			span {
				padding-bottom: 10rpx;
			}
		}

		.product {
			height: 900rpx;

			.device {
				background: #FFFFFF;
				padding: 15px;
				border-bottom: 1rpx solid #f5f5f5;
			}
		}

		.operation {
			width: 100%;
			height: 80rpx;
			position: fixed;
			bottom: 0;
			background: #FFFFFF;
		}
	}
</style>
