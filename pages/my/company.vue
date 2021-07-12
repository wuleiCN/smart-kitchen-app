<template>
	<view class="content">
		<u-navbar :is-back="true" title="公司信息" :title-width="300" title-color="#000000" :title-size="36" />
		<u-form :model="form" ref="uForm">
			<view class="info">
				<u-form-item label="公司名称" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Name">
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
				<u-form-item label="地区" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="region" input-align="right" type="select" :select-open="pickerShow"
						placeholder="所在地区" @click="pickerShow = true" />
				</u-form-item>
				<u-form-item label="详细住址" label-width="242" :label-style="{paddingLeft: '24rpx'}" prop="Address">
					<u-input v-model="form.Address" input-align="right" placeholder="如道路、门牌号、小区等" />
				</u-form-item>
			</view>
		</u-form>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit">提交</button>
		</view>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm" />
		<u-modal v-model="show" :content="content" title="提示" @confirm="back()" />
	</view>
</template>

<script>
	// import {
	// 	mapState
	// } from "vuex"
	import Modal from "../components/modal.vue"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				title: '公司信息',
				userId: uni.getStorageSync('userInfo').OrgId,
				form: {
					Id: null,
					Name: '',
					CreditNo: '',
					Bank: '',
					Account: '',
					Province: '',
					City: '',
					Country: '',
					Address: ''
				},
				region: '',
				content: '',
				pickerShow: false,
				show: false,
				rules: {
					Name: [{
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur'],
					}],
					CreditNo: [{
						required: true,
						len: 18,
						message: '请输入统一社会信用码',
						trigger: ['change', 'blur']
					}],
					Bank: [{
						required: true,
						message: '请输入开户银行',
						trigger: ['change', 'blur']
					}],
					Account: [{
						min: 16,
						max: 19,
						required: true,
						message: '请输入银行账号',
						trigger: ['change', 'blur']
					}],
					Address: [{
						required: true,
						message: '请输入详细住址',
						trigger: ['change', 'blur']
					}]
				}
			}
		},
		onLoad() {
			this.form.Id = this.userId
			this.$u.api.getCompanyFind({
				id: this.userId
			}).then(res => {
				for (let k in this.form) {
					for (let e in res.data) {
						if (k === e) this.form[k] = res.data[e]
					}
				}
				this.region = res.data.Province + '-' + res.data.City + '-' + res.data.Country
				console.log(res, this.form);
			})
			console.log(this.user);
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		watch: {
			'$store.state.vuex_popupShow': {
				handler() {
					this.warning = uni.getStorageSync('warnInfo')
				},
				immediate: true
			}
		},
		computed: {

		},
		methods: {
			submit() {
				this.$u.api.updataCompany(this.form).then(res => {
					if (res.success) {
						this.show = true
						this.content = '更新成功!'
					} else {
						this.show = true
						this.content = '更新失败'
					}
					console.log(res);
				})
			},
			back() {
				this.$u.route({
					url: 'pages/my/index',
					type: 'switchTab'
				})
			},
			// 选择地区回调
			regionConfirm(e) {
				this.form.Province = e.province.label
				this.form.City = e.city.label
				this.form.Country = e.area.label
				this.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
		}
	}
</script>

<style lang="scss" scoped>
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
