<template>
	<view class="content">
		<u-navbar :is-back="true" title="设备出库" :title-width="300" title-color="#000000" :title-size="36" />
			<view class="info">
				<view class="section u-flex">
					<span class="line" />
					<span class="_title u-flex">设备信息</span>
				</view>
				<view class="centent">
					<view>设备型号：{{form.Name}}</view>
					<view>设备编码：{{form.SerialNo}}</view>
					<view v-if="form.Nvr">Nvr：{{form.Nvr}}</view>
					<view v-if="form.Gateway">智能网关：{{form.Gateway}}</view>
					<view>设备状态：{{statusName}}</view>
					<view>售出时间：{{form.RegistOn}}</view>
				</view>
			</view>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit">出库</button>
		</view>
		<u-modal v-model="show" :content="content" @confirm="confirm" />
	</view>
</template>

<script>
	// import { mapState } from "vuex";
	export default {
		data() {
			return {
				form: {},
				optionId: null,
				show: false,
				statusName: '',
				content: '',
				status: []
			}
		},
		onLoad(e) {
			this.optionId = e.code
			this.deviceId = e.order
			console.log(this.status);
		},
		mounted() {
			this.getDeviceStatus()
			this.getComplexfind()
		},
		computed: {

		},
		watch: {

		},
		methods: {
			// 获取字典
			async getDeviceStatus() {
				const res = await this.$u.dictionary.getDeviceStatusFc()
				this.status = res
			},
			submit() {
				this.$u.api.deviceSaleDelivery({
					order: this.deviceId,
					device: this.optionId
				}).then(res => {
					if (res.success) {
						this.content = "出库成功！"
						this.show = true
					} else {
						this.content = res.message
						this.show = true
					}
				})
			},
			getComplexfind() {
				this.$u.api.complexfindById({
					device: this.optionId
				}).then(res => {
					if (res.success) {
						this.form = res.data
						this.form.RegistOn = this.$u.timeFormat(res.data.RegistOn, 'yyyy-mm-dd')
						this.statusName = this.status.find(v => v.value === res.data.Status).name
					}
					else this.$u.toast(res.message)
					console.log(this.form, this.statusName);
				}).catch(err => {
					this.$u.toast(err.data.Message)
				})
			},
			confirm() {
				this.$u.route({
					type: 'navigateBack',
					delta: 2
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.info {
		margin-top: 24rpx;
		height: 340rpx;
		background: #FFFFFF;
	}
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

	.submit_vw {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 0;
		width: 750rpx;
		height: 98rpx;
		background: #FFFFFF;

		.submit_ck {
			width: 702rpx;
			height: 68rpx;
			line-height: 68rpx;
			color: #FFFFFF;
			background: #FC7930;
			border-radius: 10rpx;
		}
	}
</style>
