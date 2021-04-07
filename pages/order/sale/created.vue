<template>
	<view class="content">
		<u-navbar :is-back="true" title="客户注册" :title-width="300" title-color="#000000" :title-size="36" />
		<u-form :model="form" ref="uForm">
			<view class="info">
				<u-form-item label="客户单位" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Customer">
					<u-input v-model="form.Customer" input-align="right" type="select" :select-open="pickerShow"
						placeholder="请选择客户单位" @click="pickerShow = true" />
				</u-form-item>
				<u-form-item label="联系人" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Contact">
					<u-input v-model="form.Contact" input-align="right" placeholder="请输入联系人" />
				</u-form-item>
				<u-form-item label="联系电话" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Phone">
					<u-input v-model="form.Phone" input-align="right" placeholder="请输入联系电话" />
				</u-form-item>
				<u-form-item label="联系地址" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Address">
					<u-input v-model="form.Address" input-align="right" placeholder="请输入联系地址" />
				</u-form-item>
			</view>
			<view class="info area">
				<view class="desc">
					项目描述
				</view>
				<u-form-item label-width="0" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="form.Description" type="textarea" height="232" input-align="left"
						:auto-height="true" placeholder="请输入描述内容" />
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
					Contact: '',
					Customer: '',
					Phone: '',
					Address: '',
					Description: ''
				},
				pickerShow: false,
				rules: {
					Contact: [{
						required: true,
						len: 18,
						message: '请输入联系人',
						trigger: ['change', 'blur']
					}],
					Address: [{
						required: true,
						message: '请输入联系地址',
						trigger: ['change', 'blur']
					}],
					Phone: [{
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
					Customer: [{
						required: true,
						message: '请选择客户单位',
						trigger: ['change', 'blur']
					}]
				}
			}
		},
		onLoad(e) {

		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			console.log(this.$refs.uForm.rules);
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
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			// 选择地区回调
			regionConfirm(e) {
				this.form.Customer = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .u-form {
		.info {
			margin-top: 24rpx;
		}
		.area {
			width: 750rpx;
			height: 232rpx;
			background: #FFFFFF;
			.desc {
				padding: 30rpx 0 0 24rpx;
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
			.textarea-placeholder, .uni-textarea-textarea {
				padding-left: 24rpx !important;
			}

			.u-form-item__message {
				text-align: end;
				margin: 0 24rpx 12rpx 0;
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
