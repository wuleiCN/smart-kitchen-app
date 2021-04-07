<template>
	<view class="content">
		<u-navbar :is-back="true" title="员工详情"
		 :title-width="300"/>
		<u-form :model="list" :rules="rules" ref="uForm">
			<u-form-item label-position="left" :border-bottom="false" label="姓名:" label-align="center" label-width="135" prop="Name">
				<u-input :trim="true" :border="true" v-model="list.Name " placeholder="请输入名字" />
			</u-form-item>
			<u-form-item label-position="left" :border-bottom="false" label-align="center" label-width="135" label="联系电话:" prop="Phone">
				<u-input :trim="true" :border="true" v-model="list.Phone" placeholder="请输入手机号" />
			</u-form-item>
			<u-form-item label-position="left" :border-bottom="false" label-align="center" label-width="135" label="性别:" prop="Gender">
				<u-input type="select" :border="true" :select-open="genderShow" v-model="Gender" placeholder="请输入性别" @click="genderShow = true" />
			</u-form-item>
			<u-form-item label-position="left" :border-bottom="false" label-align="center" label-width="135" label="员工类别:">
				<u-input type="select" :border="true" :select-open="typeShow" v-model="Type" placeholder="请输入员工类别" @click="typeShow = true" />
			</u-form-item>
		</u-form>
		<u-button type="success" shape="circle" size="default" style="margin: 10px;" @click="updata">修 改</u-button>
		<u-tabbar :list="vuex_tabbar" bg-color="#303133" active-color="#0081ff" inactive-color="#aaaaaa" :mid-button="true" />
		<u-select mode="single-column" :list="genderList" v-model="genderShow" value-name="Type" label-name="Name" @confirm="genderConfirm" />
		<u-select mode="single-column" :list="typeList" v-model="typeShow" value-name="value" label-name="name" @confirm="typeConfirm" />
		<u-modal v-model="sign" content="确定要修改吗？" title="提示" show-cancel-button @confirm="handle" />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				list: {},
				Gender: '',
				Type: '',
				genderShow: false,
				typeShow: false,
				genderList: [{
						Type: 1,
						Name: '男'
					},
					{
						Type: 2,
						Name: '女'
					}
				],
				typeList: uni.getStorageSync('EmployeeType'),
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				pic: 'https://uviewui.com/common/logo.png',
				sign: false,
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
		onLoad(params) {
			this.list = JSON.parse(params.list)
			this.Gender = this.list.Gender === 1 ? '男' : '女'
			this.Type = this.typeList.find(v => v.value === this.list.Type).name
			console.log(JSON.parse(params.list),this.Type)
		},
		onShow() {},
		computed: {
			...mapState(["vuex_tabbar"])
		},
		methods: {
			updata() {
				this.sign = true
			},
			handle() {},
			genderConfirm(e) {
				this.Gender = ''
				this.list.Gender = e[0].value;
				console.log(e)
				e.map((val, index) => {
					this.Gender += this.Gender == '' ? val.label : '-' + val.label;
				})
			},
			typeConfirm(e) {
				this.Type = ''
				this.list.Type = e[0].value;
				console.log(e)
				e.map((val, index) => {
					this.Type += this.Type == '' ? val.label : '-' + val.label;
				})
			}
		}
	}
</script>

<style>
</style>
