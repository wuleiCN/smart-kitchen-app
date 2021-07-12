<template>
	<view class="content">
		<u-navbar :is-back="true" title="更新DTU设备" :title-width="300" title-color="#000000" :title-size="36" />
		<u-form :model="form" ref="uForm">
			<view class="info">
				<u-form-item label="联系方式" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="PhoneNumber">
					<u-input v-model="form.PhoneNumber" input-align="right" placeholder="请输入手机号" />
				</u-form-item>
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
				pickerShow: false,
				areaShow: false,
				areaList: [{
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}
				],
				rules: {
					PhoneNumber: [{
						required: true,
						message: '请输入手机号',
						trigger: ['change','blur']
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
			// 获取客户安装区域
			getArea(id) {
				this.$u.api.getCustomrArea({
					customer: id
				}).then(res => {
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
						this.$u.api.updatedDviceDtu(this.form).then(res => {
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
				console.log(e);
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
