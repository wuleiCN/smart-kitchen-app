<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="警告信息"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<u-form :model="form" ref="uForm" :border-bottom="false" :label-style="{color: '#303133',fontWeight: '600'}">
			<u-form-item label="设备名称 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="客户单位 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="设备类别 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="设备型号 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="安装地点 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="报警信息 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="报警时间 :" label-width="150"label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="状态 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="消警时间 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
			<u-form-item label="消警人 :" label-width="150" label-align="center">
				<view>{{form.name}}</view>
			</u-form-item>
		</u-form>
		<u-button type="primary" style="margin: 0 20rpx;">消警</u-button>
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
				form: {
					name: 'test'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-form-item {
		padding: 0;
	}
</style>
