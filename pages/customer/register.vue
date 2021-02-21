<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="员工注册"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<u-form :model="model" :rules="rules" ref="uForm">
			<u-form-item label-position="left" :border-bottom="false" label="姓名:" label-align="center" label-width="135" prop="Name">
				<u-input :trim="true" :border="true" v-model="model.Name " placeholder="请输入名字" />
			</u-form-item>
			<u-form-item label-position="left" :border-bottom="false" label-align="center" label-width="135" label="联系电话:" prop="Phone">
				<u-input :trim="true" :border="true" v-model="model.Phone" placeholder="请输入手机号" />
			</u-form-item>
			<u-form-item label-position="left" :border-bottom="false" label-align="center" label-width="135" label="性别:" prop="Gender">
				<u-input type="select" :border="true" :select-open="genderShow" v-model="Gender" placeholder="请输入性别" @click="genderShow = true" />
			</u-form-item>
			<u-form-item label-position="left" :border-bottom="false" label-align="center" label-width="135" label="出生日期:" prop="Gender">
				<u-input type="select" :border="true" v-model="model.Birthday" placeholder="请输入出生日期" @click="birthShow = true" />
			</u-form-item>
			<u-form-item label-position="left" :border-bottom="false" label-align="center" label-width="135" label="员工类别:">
				<u-input type="select" :border="true" :select-open="typeShow" v-model="Type" placeholder="请输入员工类别" @click="typeShow = true" />
			</u-form-item>
			<u-form-item label-position="left" :border-bottom="false" label-align="center" label-width="135" label="员工类别:">
				<u-upload :action="action" :file-list="fileList" max-count="1" />
			</u-form-item>
		</u-form>
		<u-button class="add" type="primary" @click="register">注册</u-button>
		<u-select mode="single-column" :list="genderList" v-model="genderShow" value-name="Type" label-name="Name" @confirm="genderConfirm" />
		<u-select mode="single-column" :list="typeList" v-model="typeShow" value-name="value" label-name="name" @confirm="typeConfirm" />
		<u-picker v-model="birthShow" mode="time" :params="params" @confirm="BirthFn" @on-change="update" />
		<Modal />
	</view>
</template>

<script>
	import Modal from "@/pages/components/modal.vue"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				model: {
					Name: '',
					Gender: '',
					Birthday: '',
					Phone: '',
					Photo: '',
					Type: ''
				},
				Gender: '',
				Type: '',
				genderShow: false,
				typeShow: false,
				birthShow: false,
				params: {
					year: true,
					month: true,
					day: true
				},
				genderList: [{
						Type: 1,
						Name: '男'
					},
					{
						Type: 2,
						Name: '女'
					}
				],
				action: 'http://www.example.com/upload',
				fileList: [],
				typeList: uni.getStorageSync('EmployeeType'),
				rules: {
					Name: [{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}],
					Gender: [{
						required: true,
						message: '请输入性别',
						trigger: ['blur', 'change']
					}],
					Phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur', 'change']
						},
						{
							min: 6,
							max: 12,
							message: '长度在6-12之间',
							trigger: ['change', 'blur']
						}
					],
				}
			}
		},
		onShow() {

		},
		methods: {
			register() {
				this.$u.api.employeesRegister(this.model).then(res => {
					uni.showToast({
						title: '注册成功！'
					})
					Object.assign(this.$data.model, this.$options.data().model)
					this.Gender = '',
						this.Type = ''
				}).catch(err => {
					console.log(err)
				})
			},
			genderConfirm(e) {
				this.Gender = ''
				this.model.Gender = e[0].value;
				console.log(e)
				e.map((val, index) => {
					this.Gender += this.Gender == '' ? val.label : '-' + val.label;
				})
			},
			typeConfirm(e) {
				this.Type = ''
				this.model.Type = e[0].value;
				console.log(e)
				e.map((val, index) => {
					this.Type += this.Type == '' ? val.label : '-' + val.label;
				})
			},
			BirthFn(e) {
				this.model.Birthday= e.year + '-' + e.month + '-' + e.day
				console.log(e)
			},
			update(res, index, lists, name) {
				console.log(res, index, lists, name)
			}
		}
	}
</script>

<style scoped lang="scss">
	.add {
		margin: 0 10%;
	}
</style>
