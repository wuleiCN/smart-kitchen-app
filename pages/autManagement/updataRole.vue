<template>
	<view class="content">
		<u-navbar :is-back="true" title="客户注册" :title-width="300" title-color="#000000" :title-size="36" />
		<u-form :model="form" ref="uForm">
			<view class="info">
				<u-form-item label="角色信息" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="goodsType">
					<u-input type="select" input-align="right" :select-open="selectShow" v-model="form.goodsType"
						placeholder="请选择所属组织/公司" @click="companyListCK" />
				</u-form-item>
				<u-form-item label="角色代码" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Code">
					<u-input v-model="form.Code" input-align="right" placeholder="请输入角色代码" />
				</u-form-item>
				<u-form-item label="角色名称" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Name">
					<u-input v-model="form.Name" input-align="right" placeholder="请输入角色名称" />
				</u-form-item>
			</view>
		</u-form>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit">更新</button>
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
					goodsType: '',
					Id: '',
					Code: '',
					Name: '',
				},
				optionId: null,
				companyList: uni.getStorageSync('GetCompanyList'),
				selectList: [],
				rules: {
					goodsType:[{
						required: true,
						message: '请输入角色信息',
						trigger: ['change', 'blur']
					}],
					Code:[{
						required: true,
						message: '请输入角色代码',
						trigger: ['change', 'blur']
					}],
					Name:[{
						required: true,
						message: '请输入角色名字',
						trigger: ['change', 'blur']
					}]
				},
				pickerShow: false,
				selectShow: false,
			}
		},
		onLoad(e) {
			this.optionId = e.Id
			this.$u.api.getRoleFind({Id: e.id}).then(res => {
				if (res.success) {
					this.form.Code = res.data.Code
					this.form.Name = res.data.Name
					this.form.Id = res.data.Id
					this.form.goodsType = this.companyList.find(v => v.CompanyId == res.data.OrgId).Name
				}
				console.log(res, this.form);
			}).catch(err => {
				console.log(err);
			})
			console.log(this.companyList);
		},
		computed: {

		},
		watch: {

		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						delete this.form.goodsType
						this.$u.api.updataRole(this.form).then(res => {
							if (res.success) this.$u.toast('更新成功！')
							else this.$u.toast(res.message)
							Object.assign(this.$data.form, this.$options.data().form)
							console.log(res);
						}).catch(err => {
							Object.assign(this.$data.form, this.$options.data().form)
							this.$u.toast('创建失败！')
							console.log(err);
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			// 选择公司回调
			companyListCK() {
				this.selectList = []
				this.companyList.map(v => {
					this.selectList.push({value:v.Id, label:v.Name})
				})
				this.selectShow = true
				console.log(this.selectList);
			},
			selectConfirm(e) {
				this.form.goodsType = '';
				e.map((val, index) => {
					this.form.goodsType += this.form.goodsType == '' ? val.label : '-' + val.label;
				})
				console.log(e);
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			// console.log(this.$refs.uForm);
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .u-form {
		.info {
			margin-top: 24rpx;
			height: 1056rpx;
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
