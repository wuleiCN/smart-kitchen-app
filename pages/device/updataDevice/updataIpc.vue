<template>
	<view class="content">
		<u-navbar :is-back="true" title="更新IPC网络摄像机" :title-width="400" title-color="#000000" :title-size="36" />
		<u-form :model="form" ref="uForm">
			<view class="info">
				<u-form-item label="SDK" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="SDK">
					<u-input v-model="form.SDK" input-align="right" placeholder="请输入内容" />
				</u-form-item>
				<u-form-item label="IP地址" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="IP">
					<u-input v-model="form.IP" input-align="right" placeholder="格式: 192.168.1.111" />
				</u-form-item>
				<u-form-item label="端口号" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Port">
					<u-input v-model="form.Port" input-align="right" placeholder="请输入端口号" />
				</u-form-item>
				<u-form-item label="接入智能网关" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="form.GatewayName" input-align="right" placeholder="请输入内容" type="select"
						:select-open="pickerShow" @click="pickerShow = true" />
				</u-form-item>
				<u-form-item label="接入NVR" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="form.NvrName" input-align="right" placeholder="请输入内容" type="select"
						:select-open="NvrShow" @click="NvrShow = true" />
				</u-form-item>
			</view>
			<view class="info">
				<u-form-item label="用户名" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="UserName">
					<u-input v-model="form.UserName" input-align="right" placeholder="请输入用户名" />
				</u-form-item>
				<u-form-item label="密码" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Password">
					<u-input v-model="form.Password" input-align="right" placeholder="请输入密码" type="password" />
				</u-form-item>
			</view>
			<view class="info">
				<u-form-item label="设备名称" label-width="355" :label-style="{paddingLeft: '24rpx'}" prop="Name">
					<u-input v-model="form.Name" input-align="right" placeholder="请输入设备名字" />
				</u-form-item>
				<u-form-item label="客户安装区域" label-width="310" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-if="form.CustomerAreaId" v-model="form.CustomerAreaId" input-align="right" placeholder="请输入内容" type="select"
						:select-open="areaShow" @click="areaShow = true" />
				</u-form-item>
				<u-form-item label="设备维修周期(月)" label-width="350" :label-style="{paddingLeft: '24rpx'}"
					prop="MasterEmail">
					<u-input v-model="form.MaintPeriod" type="number" input-align="right" placeholder="请输入内容" />
				</u-form-item>
			</view>
		</u-form>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit">提交</button>
		</view>
		<u-select v-model="pickerShow" :list="gatewayList" value-name="Id" label-name="Name" @confirm="selectConfirm" />
		<u-select v-model="NvrShow" :list="nvrList" value-name="Id" label-name="Name" @confirm="selectNvrConfirm" />
		<u-select v-model="areaShow" :list="areaList" @confirm="areaConfirm" />
	</view>
</template>

<script>
	// import { mapState } from "vuex";
	export default {
		data() {
			return {
				form: {},
				optionId: null,
				custId: null,
				NvrShow: false,
				pickerShow: false,
				areaShow: false,
				gatewayList: [],
				nvrList: [],
				areaList: [],
				rules: {
					// SDK: [{
					// 	required: true,
					// 	message: '请输入内容',
					// 	trigger: ['change','blur'],
					// }],
					IP: [{
						required: true,
						message: '请输入统一社会信用码',
						trigger: ['change', 'blur']
					}],
					// Port: [{
					// 	required: true,
					// 	message: '请输入端口号',
					// 	trigger: ['change','blur']
					// }],
					UserName: [{
						required: true,
						message: '请输入用户名',
						trigger: ['change', 'blur']
					}],
					Password: [{
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur']
					}],
					Gateway: [{
						required: true,
						message: '请输入内容',
						trigger: ['change', 'blur']
					}],
					CustomerAreaId: [{
						required: true,
						message: '请输入客户安装区域',
						trigger: ['change', 'blur']
					}],
					Name: [{
						required: true,
						message: '请输入设备姓名',
						trigger: ['change', 'blur']
					}],
					MaintPeriod: [{
						required: true,
						message: '请输入维修周期',
						trigger: ['change', 'blur']
					}]
				}
			}
		},
		onLoad(e) {
			this.optionId = e.id
			e.cId && this.getArea(e.cId)
			this.$u.api.complexfindById({
				device: e.id
			}).then(res => {
				if (res.success) this.form = res.data
				this.getGatewayAll()
				this.getNvrAll()
				console.log(res);
			}).catch(err => {
				console.log(err);
			})
			console.log(e);
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShow() {

		},
		computed: {

		},
		watch: {

		},
		methods: {
			// 获取智能网关
			getGatewayAll() {
				this.$u.api.getGateway().then(res => {
					if (res.success) this.gatewayList = res.data
					this.form.Gateway ? (this.form.GatewayName = this.gatewayList.find(i => i.Id === this.form
						.Gateway).Name) : this.form.GatewayName = '无'
					console.log(res);
				})
			},
			// 获取智能网关
			getNvrAll() {
				this.$u.api.getNvr().then(res => {
					if (res.success) this.nvrList = res.data
					this.form.Nvr ? (this.form.NvrName = this.nvrList.find(i => i.Id === this.form
						.Nvr).Name) : this.form.NvrName = '无'
					console.log(res);
				})
			},
			// 获取客户安装区域
			getArea(id) {
				this.$u.api.getCustomrArea({
					customer: id
				}).then(res => {
					if (res.success) this.areaList = res.data
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			},
			submit() {
				this.form.CustomerId = "eebe43f1-6709-4d16-b7f2-ead1e1188e8a"
				this.form.CustomerAreaId = "dd9789ec-3e7e-41d7-8d35-5caf106c0bf3"
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$u.api.updatedDviceIpc(this.form).then(res => {
							this.$u.toast('更新成功！')
							setTimeout(() => {
								this.$u.route({
									url: 'pages/device/Detail',
									type: 'navigateBack'
								})
							},1000)
							console.log(res);
						}).catch(err => {
							this.$u.toast('更新失败！')
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			selectConfirm(e) {
				this.form.Gateway = e[0].value
				this.form.GatewayName = e[0].label
				console.log(e);
			},
			selectNvrConfirm(e) {
				this.form.Nvr = e[0].value
				this.form.NvrName = e[0].label
			},
			areaConfirm(e) {
				console.log(e);
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
				margin: 0 12px 6px 0;
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
