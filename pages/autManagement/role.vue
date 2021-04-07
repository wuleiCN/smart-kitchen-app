<template>
	<view class="content">
		<u-navbar :is-back="true" title="客户注册" :title-width="300" title-color="#000000" :title-size="36" />
		<u-form :model="form" ref="uForm">
			<view class="info">
				<u-form-item label="角色信息" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="goodsType">
					<u-input type="select" input-align="right" :select-open="selectShow" v-model="form.goodsType"
						placeholder="请选择所属组织/公司" @click="selectShow = true" />
				</u-form-item>
				<u-form-item label="所属组织ID" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="ID">
					<u-input v-model="form.ID" input-align="right" placeholder="请输入组织ID" />
				</u-form-item>
				<u-form-item label="角色代码" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="roleCode">
					<u-input v-model="form.roleCode" input-align="right" placeholder="请输入角色代码" />
				</u-form-item>
				<u-form-item label="角色名称" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="roleName">
					<u-input v-model="form.roleName" input-align="right" placeholder="请输入角色名称" />
				</u-form-item>
			</view>
		</u-form>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit">提交</button>
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
					ID: '',
					roleCode: '',
					roleName: '',
					goodsType: ''
				},
				selectList: [
					{
						value: '电子产品',
						label: '电子产品'
					},
					{
						value: '服装',
						label: '服装'
					},
					{
						value: '工艺品',
						label: '工艺品'
					}
				],
				rules: {
					goodsType:[{
						required: true,
						message: '请输入角色信息',
						trigger: ['change', 'blur']
					}],
					ID:[{
						required: true,
						message: '请输入组织ID',
						trigger: ['change', 'blur']
					}],
					roleCode:[{
						required: true,
						message: '请输入角色代码',
						trigger: ['change', 'blur']
					}],
					roleName:[{
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

		},
		computed: {

		},
		watch: {

		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			// 选择公司回调
			selectConfirm(e) {
				this.form.goodsType = '';
				e.map((val, index) => {
					this.form.goodsType += this.form.goodsType == '' ? val.label : '-' + val.label;
				})
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			console.log(this.$refs.uForm);
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
