<template>
	<view>
		<company v-if="type === 1"></company>
		<company v-if="type === 2"></company>
		<customer v-if="type === 3"></customer>
	</view>
</template>

<script>
	// import mqtt from 'mqtt'
	import company from "@/pages/company/index.vue"
	import customer from "@/pages/customer/index.vue"
	// require('fast-text-encoding')
	var mqtt = require('mqtt/dist/mqtt.js')
	var client	
	// const options = {
	// 	connectTimeout: 40000,
	// 	clientId: '',
	// 	// username: '',
	// 	// password: '',
	// 	clean: true
	// }
	// #ifdef H5
	client = mqtt.connect('tcp://118.190.153.247:61614')
	// #endif
	// #ifdef MP-WEIXIN||APP-PLUS
	client = mqtt.connect('wx://118.190.153.247:61614')
	// #endif
	// client = mqtt.connect('wx://118.190.153.247:61614')
	export default {
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				type: null,
				logs: []
			}
		},
		components: {
			company,
			customer
		},
		created() {
			this.mqqtMsg()
			this.type = uni.getStorageSync('userInfo').Type
		},
		onLoad() {},
		methods: {
			mqqtMsg() {
				var self = this	
				client.on('connect', () => {
					console.log('====>  成功连接服务器!')
					client.subscribe('jingan/alarm', (err) => {
						if (!err) {
							// client.publish(_id, 'Hello mqtt')
							console.log('订阅成功')
						} else {
							console.log('订阅失败')
						}
					})
				}).on('message', (topic, message) => {
					// uni.setStorageSync('warningInfo', self.warningArr)
					// let utf8decoder = new TextDecoder()
					// const msg = JSON.parse(utf8decoder.decode(message))
					// // client.end()
					// console.log(self.$store.state.vuex_popupShow, msg)
					console.log('收到来自', topic, '的消息 ===>', typeof(message))
					self.$store.commit('setWarning', {v:message,t:true})
					console.log('未处理===>', message);
					// console.log('处理===>', msg);
				}).on('reconnect', (err) => {
					client.end()
					console.log('重新连接', err)
				}).on('err', () => {
					console.log('连接失败', err)
				})
			},
			// push() {
			// 	const _id = uni.getStorageSync('userInfo').CompOrCustId
			// 	client.publish(_id, 'pull')
			// }
		}
	}
</script>

<style>
</style>
