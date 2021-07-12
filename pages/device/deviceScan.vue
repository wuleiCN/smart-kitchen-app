<template>
	<view class="content">
		<u-navbar :is-back="true" title="设备出库" :title-width="300" />
		<view class="type">
			<u-input v-model="deviceType" :select-open="typeShow" border type="select" placeholder="请选择设备类别"
				@click="typeShow = true" />
		</view>
		<view class="type" v-show="model">
			<u-input v-model="deviceModel" :select-open="modelShow" border type="select" placeholder="请选择设备型号"
				@click="modelShow = true" />
		</view>
		<view class="card">
			<view class="circle" @click="scan">
				<u-image src="@/static/order/scan_B.png" width="78" height="78" />
			</view>
			<view class="text">
				扫码设备条码/二维码
			</view>
		</view>
		<u-select mode="single-column" v-model="typeShow" :list="typeList" value-name="value" label-name="name"
			@confirm="confirmSelected" />
		<u-select mode="single-column" v-model="modelShow" :list="slectModel" value-name="Id" label-name="Name"
			@confirm="modelSelected" />
		<u-modal v-model="show" :content="content" :show-cancel-button="true" @confirm="confirm" />
		<Modal />
	</view>
</template>

<script>
	import Modal from "@/pages/components/modal.vue"
	import {
		scaned
	} from "@/common/scan.js"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				device: {
					SerialNo: '',
					Type: '',
					Model: ''
				},
				deviceType: '',
				deviceModel: '',
				typeValue: '',
				optionId: '',
				typeList: [],
				modelList: [],
				slectModel: [],
				typeShow: false,
				modelShow: false,
				model: false,
				show: false,
				content: ''
			}
		},
		onLoad(option) {
			this.optionId = option.order
			this.modelId = option.model
			this.$u.dictionary.getDeviceTypeFc().then(res => this.typeList = res)
			this.$u.api.modelGetall().then(res => {
				if (res.success) this.modelList = res.data
			})
			console.log(option.model);
		},
		methods: {
			// 扫码入库
			confirm() {
				this.$u.api.stockin(this.device).then(res => {
					if (res.success) {
						this.deviceType = ''
						this.deviceModel = ''
						this.$u.toast('入库成功！')
					} else {
						this.deviceType = ''
						this.deviceModel = ''
						this.$u.toast('入库失败')
					}
					console.log(res,this.device);
				})
			},
			confirmSelected(e) {
				this.deviceType = '';
				this.deviceModel = '';
				this.slectModel = []
				e.map((val, index) => {
					this.deviceType = val.label;
					this.device.Type = val.value;
				})
				console.log('==>',this.device);
				if (this.device.Type !== '') this.slectModel = this.modelList.filter(e => e.Type == this.device.Type)
				this.model = true
				console.log(e,this.modelList);
			},
			modelSelected(e) {
				this.deviceModel = '';
				e.map((val, index) => {
					this.deviceModel = val.label;
					this.device.Model = val.value;
				})
				console.log(e,this.device);
			},
			scanPut(e) {
				this.show = true
				this.device.SerialNo = e.result
				this.content = '扫码成功！确定要入库吗？'
				console.log(e);
			},
			// 扫码入库
			scan() {
				if (this.deviceType === '') {
					this.$u.toast('请选择设备类别！')
					return false
				} else if (this.deviceModel === '') {
					this.$u.toast('请选设备型号！')
					return false
				}
				scaned(this.scanPut)
			},
		}
	}
</script>

<style scoped lang="scss">
	.type {
		width: 702rpx;
		// height: 120rpx;
		background: #FFFFFF;
		margin-top: 40rpx;
		transform: translateX(-50%);
		margin-left: 50%;
	}

	.card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 5%;
		width: 702rpx;
		height: 395rpx;
		margin-left: 50%;
		transform: translateX(-50%);
		background: #FFFFFF;
		border-radius: 20rpx;

		.circle {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 204rpx;
			height: 204rpx;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 35rpx 0rpx rgba(252, 121, 48, 0.23);
			border-radius: 50%;
		}

		.text {
			width: 313rpx;
			height: 66rpx;
			line-height: 66rpx;
			margin-top: 43rpx;
			text-align: center;
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 600;
			color: #000000;
		}
	}
</style>
