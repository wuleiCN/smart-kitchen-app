import {generateReqKey,addPendingRequest,removePendingRequest} from "@/common/cancelToken.js"
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://175.6.77.126:9001',
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		originalData: true,
		loadingText: '努力加载中~',
		loadingTime: 800,
		loadingMask: true,
		// 设置自定义头部content-type
		header: {
			'content-type': 'application/json;charset=UTF-8'
		}
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// config.header.Token = 'xxxxxx';
		config.header.Token = uni.getStorageSync('token');
		config.header['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8080';
		if (config.url == '/login') config.header.noToken = true;
		 removePendingRequest(config);
		 addPendingRequest(config);
		 // console.log(config);
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// console.log('==>res',res);
		// removePendingRequest(res.config)
		if (res.statusCode == 200) {
			return res.data;
		} else if (res.statusCode == 401) {
			vm.$u.toast(res.data.Message)
			vm.$u.debounce(() => {
				vm.$u.route({
					url: 'pages/Login',
					type: 'redirectTo'
				})
			},500)
			return false;
		} else if (res.statusCode == 500) {
			vm.$u.toast(res.data.Message);
			return false;
		} else return false;
	}
}

export default {
	install
}
