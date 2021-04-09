<template>
	<view class="content">
		<u-navbar :is-back="true" title="客户详情" :title-width="300" title-color="#000000" :title-size="36" />
		<u-form :model="form" ref="uForm">
			<view class="info">
				<u-form-item label="姓名" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Name">
					<u-input v-model="form.Name" input-align="right" placeholder="请输入名称" />
				</u-form-item>
				<u-form-item label="统一社会信用码" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="CreditNo">
					<u-input v-model="form.CreditNo" input-align="right" placeholder="请输入统一社会信用码" />
				</u-form-item>
				<u-form-item label="开户银行" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Bank">
					<u-input v-model="form.Bank" input-align="right" placeholder="请输入开户银行" />
				</u-form-item>
				<u-form-item label="银行账号" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Account">
					<u-input v-model="form.Account" input-align="right" placeholder="请输入银行账号" />
				</u-form-item>
			</view>
			<view class="info">
				<u-form-item label="地区" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="region">
					<u-input v-model="form.region" input-align="right" type="select" :select-open="pickerShow"
						placeholder="所在地区" @click="pickerShow = true" />
				</u-form-item>
				<u-form-item label="详细住址" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Address">
					<u-input v-model="form.Address" input-align="right" placeholder="如道路、门牌号、小区等" />
				</u-form-item>
			</view>
			<view class="info">
				<u-form-item label="公司法人/负责人" label-width="310" :label-style="{paddingLeft: '24rpx'}" prop="Master">
					<u-input v-model="form.Master" input-align="right" placeholder="请输入姓名" />
				</u-form-item>
				<u-form-item label="公司法人/负责人联系电话" label-width="355" :label-style="{paddingLeft: '24rpx'}"
					prop="MasterPhone">
					<u-input v-model="form.MasterPhone" input-align="right" placeholder="请输入联系电话" />
				</u-form-item>
				<u-form-item label="公司法人/负责人Email" label-width="350" :label-style="{paddingLeft: '24rpx'}"
					prop="MasterEmail">
					<u-input v-model="form.MasterEmail" input-align="right" placeholder="请输入Email" />
				</u-form-item>
			</view>
			<view class="info">
				<u-form-item label="公司系统管理员姓名" label-width="310" :label-style="{paddingLeft: '24rpx'}" prop="Admin">
					<u-input v-model="form.Admin" input-align="right" placeholder="请输入姓名" />
				</u-form-item>
				<u-form-item label="公司系统管理员联系电话" label-width="350" :label-style="{paddingLeft: '24rpx'}"
					prop="AdminPhone">
					<u-input v-model="form.AdminPhone" input-align="right" placeholder="请输入联系电话" />
				</u-form-item>
				<u-form-item label="公司系统管理员Email" label-width="310" :label-style="{paddingLeft: '24rpx'}"
					prop="AdminEmail">
					<u-input v-model="form.AdminEmail" input-align="right" placeholder="请输入Email" />
				</u-form-item>
			</view>
		</u-form>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit">提交</button>
		</view>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm" />
	</view>
</template>

<script>
	// import { mapState } from "vuex";
	export default {
		data() {
			return {
				form: {
					Name: '',
					CreditNo: '',
					Bank: '',
					Account: '',
					region: '',
					Province: '',
					City: '',
					Country: '',
					Address: '',
					Master: '',
					MasterPhone: '',
					MasterEmail: '',
					Admin: '',
					AdminPhone: '',
					AdminEmail: '',
					optionId: null
				},
				pickerShow: false,
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur'],
					}],
					credit: [{
						required: true,
						len: 18,
						message: '请输入统一社会信用码',
						trigger: ['change', 'blur']
					}],
					bank: [{
						required: true,
						message: '请输入开户银行',
						trigger: ['change', 'blur']
					}],
					account: [{
						min: 16,
						max: 19,
						required: true,
						message: '请输入银行账号',
						trigger: ['change', 'blur']
					}],
					region: [{
						required: true,
						message: '请输入所在地区',
						trigger: ['change', 'blur']
					}],
					address: [{
						required: true,
						message: '请输入详细住址',
						trigger: ['change', 'blur']
					}],
					directorName: [{
						required: true,
						message: '请输入公司法人/负责人',
						trigger: ['change', 'blur']
					}],
					directorPhone: [{
							required: true,
							message: '请输入公司法人/负责人电话',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
					directorEmail: [{
							required: true,
							message: '请输入公司法人/负责人Email',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								return this.$u.test.email(value);
							},
							message: '电子邮箱不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
					adminName: [{
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur']
					}],
					adminPhone: [{
							required: true,
							message: '请输入联系电话',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
					adminEmail: [{
							required: true,
							message: '请输入Email',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								return this.$u.test.email(value);
							},
							message: '电子邮箱不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
				}
			}
		},
		onLoad(e) {
			this.optionId = e.id
			this.$u.api.getCustomerById({id: e.id}).then(res => {
				this.form = res.data
				this.form.region = res.data.Province + '-' + res.data.City + '-' + res.data.Country
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
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$u.api.updataCustomer(this.form).then(res => {
							this.$u.toast('更新成功！')
						}).catch(err => {
							this.$u.toast('更新失败！')
						})
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			// 选择地区回调
			regionConfirm(e) {
				this.form.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
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
