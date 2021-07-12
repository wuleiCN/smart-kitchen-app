<template>
	<view class="content">
		<u-navbar :is-back="true" title="更新灭火器" :title-width="300" title-color="#000000" :title-size="36" />
		<u-form :model="form" ref="uForm">
			<view class="info">
				<u-form-item label="设备名称" label-width="355" :label-style="{paddingLeft: '24rpx'}" prop="Name">
					<u-input v-model="form.Name" input-align="right" placeholder="请输入设备名字" />
				</u-form-item>
				<u-form-item label="客户安装区域" label-width="310" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-if="form.CustomerAreaId" v-model="form.CustomerAreaId" input-align="right"
						placeholder="请输入内容" type="select" :select-open="areaShow" @click="areaShow = true" />
				</u-form-item>
				<u-form-item label="设备维修周期(月)" label-width="350" :label-style="{paddingLeft: '24rpx'}"
					prop="MasterEmail">
					<u-input v-model="form.MaintPeriod" type="number" input-align="right" placeholder="请输入内容" />
				</u-form-item>
			</view>
			<view class="info">
				<u-form-item label="接入Dtu" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="DtuName" input-align="right" placeholder="请输入内容" type="select"
						:select-open="DtuShow" @click="DtuShow = true" />
				</u-form-item>
				<u-form-item label="接入端" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="input.Input1" input-align="right" placeholder="请输入接入端" type="select"
						:select-open="input1Show" @click="input1Show = true;count = 1" />
				</u-form-item>
				<u-form-item label="接入端" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="input.Input2" input-align="right" placeholder="请输入接入端" type="select"
						:select-open="input2Show" @click="input2Show = true;count = 2" />
				</u-form-item>
				<u-form-item label="接入端" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="input.Input3" input-align="right" placeholder="请输入接入端" type="select"
						:select-open="input3Show" @click="input3Show = true;count = 3" />
				</u-form-item>
				<u-form-item label="接入端" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="input.Input4" input-align="right" placeholder="请输入接入端" type="select"
						:select-open="input4Show" @click="input4Show = true;count = 4" />
				</u-form-item>
				<u-form-item label="接入端" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="input.Input5" input-align="right" placeholder="请输入接入端" type="select"
						:select-open="input5Show" @click="input5Show = true;count = 5" />
				</u-form-item>
				<u-form-item label="接入端" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="input.Input6" input-align="right" placeholder="请输入接入端" type="select"
						:select-open="input6Show" @click="input6Show = true;count = 6" />
				</u-form-item>
				<u-form-item label="接入端" label-width="242" :label-style="{paddingLeft: '24rpx'}">
					<u-input v-model="input.Input7" input-align="right" placeholder="请输入接入端" type="select"
						:select-open="input7Show" @click="input7Show = true;count = 7" />
				</u-form-item>
			</view>
		</u-form>
		<view class="submit_vw">
			<button class="submit_ck" @click="submit">提交</button>
		</view>
		<u-select v-model="areaShow" :list="areaList" @confirm="areaConfirm" />
		<u-select v-model="DtuShow" :list="DtuList" value-name="Id" label-name="Name" @confirm="DtuConfirm" />
		<u-select v-model="input1Show" :list="inputList" mode="mutil-column-auto" value-name="Id" label-name="Name"
			@confirm="inputConfirm" />
		<u-select v-model="input2Show" :list="inputList" mode="mutil-column-auto" value-name="Id" label-name="Name"
			@confirm="inputConfirm" />
		<u-select v-model="input3Show" :list="inputList" mode="mutil-column-auto" value-name="Id" label-name="Name"
			@confirm="inputConfirm" />
		<u-select v-model="input4Show" :list="inputList" mode="mutil-column-auto" value-name="Id" label-name="Name"
			@confirm="inputConfirm" />
		<u-select v-model="input5Show" :list="inputList" mode="mutil-column-auto" value-name="Id" label-name="Name"
			@confirm="inputConfirm" />
		<u-select v-model="input6Show" :list="inputList" mode="mutil-column-auto" value-name="Id" label-name="Name"
			@confirm="inputConfirm" />
		<u-select v-model="input7Show" :list="inputList" mode="mutil-column-auto" value-name="Id" label-name="Name"
			@confirm="inputConfirm" />
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
				areaShow: false,
				count: null,
				input1Show: false,
				input2Show: false,
				input3Show: false,
				input4Show: false,
				input5Show: false,
				input6Show: false,
				input7Show: false,
				DtuShow: false,
				DtuName: '无',
				input: {
					Input1: '无',
					Input2: '无',
					Input3: '无',
					Input4: '无',
					Input5: '无',
					Input6: '无',
					Input7: '无'
				},
				DtuList: [],
				inputList: [{
					Id: 1,
					Name: '灭火器设备',
					children: [{
						Id: 1,
						Name: '无'
					}]
				}, {
					Id: 2,
					Name: '燃气泄漏报警设备',
					children: [{
						Id: 2,
						Name: '无'
					}]
				}],
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
				this.getDtuAll()
				this.getInputAll()
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
			// 获取Dtu列表
			getDtuAll() {
				this.$u.api.getDtu().then(res => {
					if (res.success) this.DtuList = res.data
					if (this.form.Dtu) this.DtuName = this.DtuList.find(i => i.Id === this.form.Dtu).Name
					console.log(res);
				})
			},
			// 获取input列表
			async getInputAll() {
				let {
					data: fire
				} = await this.$u.api.getFire()
				let {
					data: gas
				} = await this.$u.api.getGas()
				this.inputList[0].children = fire
				this.inputList[1].children = gas
				console.log('f==>', fire, 'g==>', gas, this.inputList);
				for (let k in this.input) {
					this.inputList.forEach(e => {
						e.children.forEach((v, i) => {
							if (this.form[k] === e.children[i].Id) {
								this.input[k] = v.Name;
							}
						})
					})
				}
			},
			// 判断input是否为空
			isInput() {},
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
						this.$u.api.updatedDviceAlarm(this.form).then(res => {
							this.$u.toast('更新成功！')
							setTimeout(() => {
								this.$u.route({
									url: 'pages/device/Detail',
									type: 'navigateBack'
								})
							}, 1000)
							console.log(res);
						}).catch(err => {
							this.$u.toast('更新失败！')
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			inputConfirm(e) {
				this.form['Input' + this.count] = e[1].value
				this.input['Input' + this.count] = e[1].label
				console.log(e, this.form, this.count);
			},
			DtuConfirm(e) {
				this.form.Dtu = e[0].value
				this.DtuName = e[0].label
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
