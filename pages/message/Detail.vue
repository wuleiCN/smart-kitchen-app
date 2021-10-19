<template>
	<view class="content">
		<u-navbar :is-back="true" title="消息详情" :title-width="400" title-color="#000000" :title-size="36" />
		<u-form v-if="Object.keys(form).length" :model="form" ref="uForm">
			<view class="info">
				<u-form-item label="公司" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<view>
						{{customer}}
					</view>
				</u-form-item>
				<u-form-item label="客户" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<view>
						{{company}}
					</view>
				</u-form-item>
				<u-form-item label="设备" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<view>
						{{device}}
					</view>
				</u-form-item>
				<u-form-item label="处置信息" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<view>
						{{form.Content}}
					</view>
				</u-form-item>
			</view>
			<view class="info">
				<u-form-item label="发送时间" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<view>
						{{form.HappendOn}}
					</view>
				</u-form-item>
				<u-form-item label="处置时间" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<view>
						{{form.ProcessedOn}}
					</view>
				</u-form-item>
			</view>
		</u-form>
		<!-- <view class="submit_vw">
			<button class="submit_ck" @click="submit">提交</button>
		</view> -->
	</view>
</template>

<script>
	// import { mapState } from "vuex";
	export default {
		data() {
			return {
				form: {},
				optionId: null,
				customer: '',
				company: '',
				device: '',
				src1: 'http://175.6.77.126:9001/api/file/getimage?filename=FaceEvents/1e78af5a-d08f-4b85-b598-0fd1501873d3/face_0.jpg'
			}
		},
		onLoad(e) {
			uni.showLoading()
			this.optionId = e.id
			console.log(e.status);
			this.$u.debounce(() => {
				this.$u.api.alarmUnreadById({
					id: e.id
				}).then(res => {
					if (res.success) {
						this.form = res.data
						this.form.HappendOn = this.form.HappendOn.slice(0, 10)
						this.form.ProcessedOn = this.form.ProcessedOn.slice(0, 10)
						this.getMessageForm(res.data.Customer, res.data.Company, res.data.Device)
					}
					uni.hideLoading()
					console.log(this.form);
				}).catch(err => {
					console.log(err);
				})
			}, 300)
		},
		onShow() {

		},
		computed: {

		},
		watch: {

		},
		methods: {
			getMessageForm(c, e, f) {
				this.$u.api.getCustomerById({
					id: c
				}).then(res => {
					if (res.success) this.customer = res.data.Name
				}).catch(() => {
					this.customer = '无'
				})
				this.$u.dictionary.getCompanyListFc({
					id: e
				}).then(res => {
					this.company = res.find(v => v.Id === e).Name
				})
				this.$u.api.deviceComplexfind({
					device: f
				}).then(res => {
					if (res.success) this.device = res.data.Name
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .u-form {
		.info {
			margin-top: 24rpx;
		}

		.u-form-item,
		.u-form-item__body {
			background: #FFFFFF;
			padding: 0;
			// height: 76rpx;

			.u-input {
				padding-right: 24rpx !important;

				.input-placeholder {
					text-align: right;
				}
			}

			.u-form-item__message {
				text-align: end;
				margin: 0 24rpx 12rpx 0;
			}
			.u-form-item--right__content__slot {
				justify-content: flex-end;
			}
			.u-form-item--right {
				padding-right: 24rpx;
			}
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
