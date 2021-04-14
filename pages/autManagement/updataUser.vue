<template>
	<view class="content">
		<u-navbar :is-back="true" title="用户注册" :title-width="300" title-color="#000000" :title-size="36" />
		<u-form :model="form" ref="uForm">
			<view class="info_A">
				<u-form-item label="姓名" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Name">
					<u-input v-model="form.Name" input-align="right" placeholder="请输入姓名" />
				</u-form-item>
				<u-form-item label="登录账号" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="LogonName">
					<u-input v-model="form.LogonName" input-align="right" placeholder="请输入登录账号" />
				</u-form-item>
				<u-form-item label="手机号码" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Phone">
					<u-input v-model="form.Phone" input-align="right" placeholder="请输入手机号码" />
				</u-form-item>
				<u-form-item label="电子邮箱" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Email">
					<u-input v-model="form.Email" input-align="right" placeholder="请输入电子邮箱" />
				</u-form-item>
			</view>
		</u-form>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit()">提交</button>
		</view>
		<u-modal v-model="show" content="更新成功!" @confirm="confirm" />
	</view>
</template>

<script>
	// import { mapState } from "vuex";
	export default {
		data() {
			return {
				form: {
					Id: null,
					Name: '',
					LogonName: '',
					Phone: '',
					Email: ''
				},
				show: false,
				header: {
					Token: uni.getStorageSync('token')
				},
				action: 'http://175.6.77.126:9001/api/file/avatar',
				companyList: uni.getStorageSync('GetCompanyList'),
				rules: {
					Name: [{
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur']
					}],
					LogonName: [{
						required: true,
						message: '请输入登录账号',
						trigger: ['change', 'blur']
					}],
					Phone: [{
							required: true,
							message: '请输入手机号码',
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
					Email: [{
							required: true,
							message: '请输入电子邮箱',
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
					]
				}
			}
		},
		onLoad(e) {
			this.form.Id = e.id
			this.$u.api.getUserFindById({
				id: e.id
			}).then(res => {
				if (res.success) {
					this.form.Name = res.data.Name
					this.form.LogonName = res.data.LogonName
					this.form.Phone = res.data.Phone
					this.form.Email = res.data.Email
				} else this.$u.toast('获取用户信息失败！')
				console.log(res);
			})
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		computed: {

		},
		watch: {

		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$u.api.updataUser(this.form).then(res => {
							if (res.success) this.show = true
							else this.$u.toast('更新失败！')
						})
						console.log('验证通过', this.isLoad);
					} else {
						console.log('验证失败');
					}
				});
			},
			confirm() {
				this.$u.route({
					type: 'navigateBack'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .u-form {
		.info_A {
			margin-top: 24rpx;
			// height: 460rpx;
			background: #FFFFFF;
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
