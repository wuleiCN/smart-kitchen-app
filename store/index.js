import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const token = uni.getStorageSync('token')
const user =  uni.getStorageSync('userInfo')
const store = new Vuex.Store({
	state: {
		vuex_user: user || {},
		vuex_token: token || '',
		vuex_customer: {},
		// 购物车商品
		vuex_saleCar: [],
		// 自定义tabbar数据
		vuex_tabbar: [{
				pagePath: "/pages/index/index",
				iconPath: "/static/tabbar/home.png",
				selectedIconPath: "/static/tabbar/homeSelected.png",
				text: "首页"
			},
			{
				pagePath: "/pages/scan/index",
				iconPath: "/static/tabbar/ScanCode.png",
				selectedIconPath: "/static/tabbar/ScanCode.png",
				midButton: true,
				text: "扫码"
			},
			{
				pagePath: "/pages/my/index",
				iconPath: "/static/tabbar/user.png",
				selectedIconPath: "/static/tabbar/userSelected.png",
				text: "我的"
			},
		]
	},
	mutations: {
		setCustomer(state,data) {
			state.vuex_customer = data
		},
		setSaleCar(state,data) {
			state.vuex_saleCar
		}
	},
	actions: {}
})

export default store
