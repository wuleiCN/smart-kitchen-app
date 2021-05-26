<template>
	<view class="content">
		<u-navbar :is-back="true" title="修改信息" :title-width="300" title-color="#000000" :title-size="36" />
		<u-form :model="form" ref="uForm">
			<view class="info">
				<u-form-item label="原始密码" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="OldPassword">
					<u-input v-model="form.OldPassword" input-align="right" placeholder="请输入用户名" />
				</u-form-item>
				<u-form-item label="新密码" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="NewPassword">
					<u-input v-model="form.NewPassword" input-align="right" placeholder="请输入账号" />
				</u-form-item>
				<u-form-item label="确认新密码" label-width="242" :label-style="{paddingLeft: '24rpx'}"
					prop="ConfirmPassword">
					<u-input v-model="form.ConfirmPassword" input-align="right" placeholder="请输入手机号" />
				</u-form-item>
			</view>
		</u-form>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit">提交</button>
		</view>
		<u-modal v-model="show" :content="content" title="提示" @confirm="back()" />
	</view>
</template>

<script>
	// import { mapState } from "vuex";
	export default {
		data() {
			return {
				form: {
					Id: uni.getStorageSync('userInfo').Id,
					OldPassword: '',
					NewPassword: '',
					ConfirmPassword: '',
				},
				show: false,
				content: '',
				pickerShow: false,
				rules: {
					OldPassword: [{
						required: true,
						message: '请输入原始密码',
						trigger: ['change', 'blur'],
					}],
					NewPassword: [{
							required: true,
							message: '请输入新密码',
							trigger: ['change', 'blur']
						},
						{
							min: 6,
							max: 12,
							message: '长度在6-12之间',
							trigger: ['change', 'blur']
						}
					],
					ConfirmPassword: [{
							required: true,
							message: '请输入正确的密码',
							trigger: ['change', 'blur']
						},
						{
							min: 6,
							max: 12,
							message: '长度在6-12之间',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								return (this.form.NewPassword === value);
							},
							message: '两次密码不一致',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					]
				}
			}
		},
		onLoad() {

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
				console.log('submit');
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$u.api.userChangepassword(this.form).then(res => {
							this.show = true
							this.content = '修改成功'
						}).catch(err => {
							this.show = true
							this.content = '修改失败'
						})
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			back() {
				this.$u.route({
					url: 'pages/my/index',
					type: 'switchTab'
				})
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
