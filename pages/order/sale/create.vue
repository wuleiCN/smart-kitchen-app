<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="销售工单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<u-form :model="form" ref="uForm">
			<u-form-item label="客户信息:" label-width="150" label-align="center">
				<u-input v-model="form.Name" />
				<u-button type="success" @click="$u.route('pages/customer/selector')">选择</u-button>
			</u-form-item>
			<u-form-item label="联系人:" label-width="150" label-align="center" prop="Contact">
				<u-input v-model="form.Contact" />
			</u-form-item>
			<u-form-item label="联系电话:" label-width="150" label-align="center" prop="ContactPhone">
				<u-input v-model="form.ContactPhone" />
			</u-form-item>
			<u-form-item label="收货地址:" label-width="150" label-align="center" prop="Address">
				<u-input v-model="form.Address" />
			</u-form-item>
			<u-form-item label="销售说明:" label-width="150" label-align="center">
				<u-input v-if="form.Comment" v-model="form.Comment" />
			</u-form-item>
		</u-form>
		<view class="_btn">
			<u-button type="primary" shape="circle" plain @click="reset">重置</u-button>
			<u-button type="success" shape="circle" @click="addSale">确定</u-button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				form: {},
				rules: {
					Contact: [{
						required: true,
						message: '请输入联系人',
						trigger: 'blur',
					}],
					ContactPhone: [{
						required: true,
						message: '请输入联系电话',
						trigger: 'blur',
					}],
					Address: [{
						required: true,
						message: '请输入联系地址',
						trigger: 'blur',
					}]
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShow() {
			this.form = this.vuex_customer
			console.log(this.vuex_customer)
		},
		onBackPress() {
			this.$store.commit('setCustomer', {})
		},
		computed: {
			...mapState(['vuex_customer'])
		},
		methods: {
			reset() {
				this.$refs.uForm.resetFields()
			},
			addSale() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.form.Phone = this.form.ContactPhone
						delete this.form.ContactPhone
						this.$u.api.createOrderSale({order: this.form}).then(res => {
							uni.showToast({
								title: '新增工单成功！'
							})
							uni.navigateTo({
								url: 'list'
							})
						}).catch(err => {
							uni.showToast({
								icon: 'none',
								title: '新增工单失败！'
							})
						})
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .u-form {
		background: #FFFFFF;

		.u-form-item {
			padding: 0;

			.u-btn {
				height: 28px;
				margin-right: 15px;
			}
		}
	}

	._btn {
		margin-top: 20px;

		::v-deep .u-btn {
			margin: 5px 15px;
		}
	}
</style>
