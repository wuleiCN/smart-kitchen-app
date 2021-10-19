import Vue from 'vue'
import Vuex from 'vuex'
require('fast-text-encoding')
Vue.use(Vuex)

const token = uni.getStorageSync('token')
const user =  uni.getStorageSync('userInfo')
// uni.setStorageSync('warnInfo',[])
const store = new Vuex.Store({
	state: {
		vuex_user: user || {},
		vuex_token: token || '',
		vuex_customer: {},
		// 购物车商品
		// vuex_saleCar: [],
		// 警报弹出框
		vuex_popupShow: false,
		vuex_popupData: '',
		// 自定义tabbar数据
		vuex_tabbar: [{
				pagePath: "/pages/index/index",
				iconPath: "/static/tabbar/home.png",
				selectedIconPath: "/static/tabbar/home_S.png",
				text: "首页"
			},
			{
				pagePath: "/pages/scan/index",
				iconPath: "/static/tabbar/scan.png",
				selectedIconPath: "/static/tabbar/scan.png",
				midButton: true,
				text: "扫码"
			},
			{
				pagePath: "/pages/my/index",
				iconPath: "/static/tabbar/my.png",
				selectedIconPath: "/static/tabbar/my_S.png",
				text: "我的"
			},
		]
	},
	mutations: {
		setCustomer(state,data) {
			state.vuex_customer = data
		},
		setWarning(state,data) {
			// const arr = uni.getStorageSync('warnInfo')
			console.log('vuex===>', data.v);
			// if(data.v !== null) uni.setStorageSync('warnInfo', data.v)
			state.vuex_popupData = data.v
			state.vuex_popupShow = data.t
		}
	},
	actions: {}
})

export default store
