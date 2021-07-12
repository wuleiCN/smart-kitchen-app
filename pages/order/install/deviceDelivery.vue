<template>
	<view class="content">
		<u-navbar :is-back="true" title="设备施工" :title-width="300" title-color="#000000" :title-size="36" />
		<view class="info">
			<view class="section u-flex">
				<span class="line" />
				<span class="_title u-flex">设备信息</span>
			</view>
			<view class="centent">
				<view>设备型号：{{form.Name}}</view>
				<view>设备编码：{{form.SerialNo}}</view>
				<view v-if="form.PhoneNumber">数据卡通讯号码：{{form.PhoneNumber}}</view>
				<view v-if="form.Nvr">Nvr设备：{{form.Nvr}}</view>
				<view v-if="form.Gateway">智能网关：{{form.Gateway}}</view>
				<view v-if="form.Dtu">Dtu设备：{{form.Dtu}}</view>
				<view v-if="form.Alarm">报警主机设备：{{form.Alarm}}</view>
				<view v-if="form.AlarmPort">报警主机端口：{{form.AlarmPort}}</view>
				<view v-if="form.IP">IP地址：{{form.IP}}</view>
				<view v-if="form.Port">登录端口：{{form.Port}}</view>
				<view v-if="form.UserName">登录用户名：{{form.UserName}}</view>
				<view v-if="form.Password">登录密码：{{form.Password}}</view>
				<view>设备状态：{{statusName}}</view>
				<view>售出时间：{{form.RegistOn}}</view>
			</view>
		</view>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit">施工</button>
		</view>
		<u-modal v-model="show" title="请输入安装区域" show-cancel-button @confirm="confirm">
			<view class="slot-content">
				<u-input v-model="area" type="textarea" border />
			</view>
		</u-modal>
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
				area: '',
				type: '',
				status: []
			}
		},
		onLoad(e) {
			this.optionId = e.code
			this.orderId = e.order,
				this.type = e.type
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
				if (this.type) this.show = true
			},
			getComplexfind() {
				this.$u.api.complexfindById({
					device: this.optionId
				}).then(res => {
					if (res.success) {
						this.form = res.data
						this.form.RegistOn = res.data.RegistOn.slice(0, 10)
						this.statusName = this.status.find(v => v.value === res.data.Status).name
					} else this.$u.toast(res.message)
					console.log(this.form, res);
				}).catch(err => {
					this.$u.toast(err.data.Message)
				})
			},
			confirm() {
				switch (this.type) {
					case '1':
						this.$u.api.installSaleAlarm({
							Dtu: this.form.Dtu,
							device: this.optionId,
							area: this.area,
							order: this.orderId
						}).then(res => {
							if (res.success) this.$u.toast('设备施工成功！')
							else this.$u.toast('设备施工失败！')
							this.goBack()
						})
						break;
					case '2':
						this.$u.api.installSaleDtu({
							PhoneNumber: this.form.PhoneNumber,
							device: this.optionId,
							area: this.area,
							order: this.orderId
						}).then(res => {
							if (res.success) this.$u.toast('设备施工成功！')
							else this.$u.toast('设备施工失败！')
							this.goBack()
						})
						break;
					case '3':
						this.$u.api.installSaleFire({
							Dtu: this.form.Dtu,
							Alarm: this.form.Alarm,
							AlarmPort: this.form.AlarmPort,
							device: this.optionId,
							area: this.area,
							order: this.orderId
						}).then(res => {
							if (res.success) this.$u.toast('设备施工成功！')
							else this.$u.toast('设备施工失败！')
							this.goBack()
						})
						break;
					case '4':
						this.$u.api.installSaleGas({
							Dtu: this.form.Dtu,
							Alarm: this.form.Alarm,
							AlarmPort: this.form.AlarmPort,
							device: this.optionId,
							area: this.area,
							order: this.orderId
						}).then(res => {
							if (res.success) this.$u.toast('设备施工成功！')
							else this.$u.toast('设备施工失败！')
							this.goBack()
						})
						break;
					case '5':
						this.$u.api.installSaleGateway({
							IP: this.form.IP,
							PhoneNumber: this.form.PhoneNumber,
							device: this.optionId,
							area: this.area,
							order: this.orderId
						}).then(res => {
							if (res.success) this.$u.toast('设备施工成功！')
							else this.$u.toast('设备施工失败！')
							this.goBack()
						})
						break;
					case '7':
						this.$u.api.installSaleIPC({
							IP: this.form.IP,
							Port: this.form.Port,
							UserName: this.form.UserName,
							Password: this.form.Password,
							Nvr: this.form.Nvr,
							Gateway: this.form.Gateway,
							device: this.optionId,
							area: this.area,
							order: this.orderId
						}).then(res => {
							if (res.success) this.$u.toast('设备施工成功！')
							else this.$u.toast('设备施工失败！')
							this.goBack()
						})
						break;
					case '8':
						this.$u.api.installSaleGateway({
							IP: this.form.IP,
							Port: this.form.Port,
							UserName: this.form.UserName,
							Password: this.form.Password,
							Gateway: this.form.Gateway,
							device: this.optionId,
							area: this.area,
							order: this.orderId
						}).then(res => {
							if (res.success) this.$u.toast('设备施工成功！')
							else this.$u.toast('设备施工失败！')
							this.goBack()
						})
						break;
				}
			},
			goBack() {
				setTimeout(() => {
					this.$u.route({
						type: 'navigateBack',
						delta: 2
					})
				}, 300)
			}
		}
	}
</script>

<style scoped lang="scss">
	.info {
		margin-top: 24rpx;
		padding-bottom: 24rpx;
		// height: 340rpx;
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

	.slot-content {
		width: 100%;
		padding: 15px;
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
