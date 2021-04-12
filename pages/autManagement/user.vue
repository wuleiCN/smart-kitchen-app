<template>
	<view class="content">
		<u-navbar :is-back="true" title="客户注册" :title-width="300" title-color="#000000" :title-size="36" />
		<u-form :model="form" ref="uForm">
			<view class="info_A">
				<u-form-item label="角色信息" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="role">
					<u-input type="select" input-align="right" :select-open="selectShow" v-model="form.role"
						placeholder="请选择所属组织/公司" @click="companyListCK" />
				</u-form-item>
				<u-form-item label="姓名" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Name">
					<u-input v-model="form.Name" input-align="right" placeholder="请输入姓名" />
				</u-form-item>
				<u-form-item label="登录账号" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="LogonName">
					<u-input v-model="form.LogonName" input-align="right" placeholder="请输入登录账号" />
				</u-form-item>
				<u-form-item label="登录密码" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Password">
					<u-input v-model="form.Password" input-align="right" placeholder="请输入登录密码" />
				</u-form-item>
				<u-form-item label="确认密码" label-width="242" :label-style="{paddingLeft: '24rpx'}"
					prop="ConfirmPassword">
					<u-input v-model="form.ConfirmPassword" input-align="right" placeholder="请输入确认密码" />
				</u-form-item>
			</view>
			<view class="info_B">
				<u-form-item label="手机号码" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Phone">
					<u-input v-model="form.Phone" input-align="right" placeholder="请输入手机号码" />
				</u-form-item>
				<u-form-item label="电子邮箱" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Email">
					<u-input v-model="form.Email" input-align="right" placeholder="请输入电子邮箱" />
				</u-form-item>
				<u-form-item label="用户头像" label-width="242" :border-bottom="false"
					:label-style="{paddingLeft: '24rpx'}" />
				<u-upload ref="uUpload" :action="action" max-count="1" width="136" height="136" />
			</view>
		</u-form>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit()">提交</button>
		</view>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm" />
	</view>
</template>

<script>
	// import { mapState } from "vuex";
	export default {
		data() {
			return {
				form: {
					role: '',
					Name: '',
					OrgId: '',
					LogonName: '',
					Password: '',
					ConfirmPassword: '',
					Phone: '',
					Avatar: '',
					Email: ''
				},
				action: 'http://175.6.77.126:9001/api/file/avatar',
				companyList: uni.getStorageSync('GetCompanyList'),
				selectList: [],
				pickerShow: false,
				selectShow: false,
				rules: {
					role: [{
						required: true,
						message: '请输入角色信息',
						trigger: ['change', 'blur']
					}],
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
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur']
					}],
					ConfirmPassword: [{
						required: true,
						message: '请输入确认密码',
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

		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		computed: {

		},
		watch: {

		},
		methods: {
			// 选择地区回调
			regionConfirm(e) {
				this.form.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			// 选择公司回调
			companyListCK() {
				this.selectList = []
				this.companyList.map(v => {
					this.selectList.push({
						value: v.OrgId,
						label: v.Name
					})
				})
				this.selectShow = true
				console.log(this.selectList);
			},
			selectConfirm(e) {
				this.form.role = '';
				e.map((val, index) => {
					this.form.role += this.form.role == '' ? val.label : '-' + val.label;
				})
				console.log(e);
			},
			submit() {
				let files = [];
				// 通过filter，筛选出上传进度为100的文件
				files = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				// files = this.$refs.uUpload.lists;
				console.log(files)
				// this.$refs.uForm.validate(valid => {
				// 	if (valid) {
				// 		console.log('验证通过');
				// 	} else {
				// 		console.log('验证失败');
				// 	}
				// });
			}
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .u-form {
		.info_A {
			margin-top: 24rpx;
			height: 460rpx;
			background: #FFFFFF;
		}

		.info_B {
			margin-top: 24rpx;
			height: 571.8rpx;
			background: #FFFFFF;

			.u-upload {
				margin-left: 24rpx;

				.u-list-item {
					margin: 0;
				}
			}
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
