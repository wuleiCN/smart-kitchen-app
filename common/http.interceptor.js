const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: '/api',
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		originalData: true,
		loadingText: '努力加载中~',
		loadingTime: 800,
		// 设置自定义头部content-type
		header: {
			'content-type': 'application/json;charset=UTF-8'
		}
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// config.header.Token = 'xxxxxx';
		config.header.Token = vm.$store.state.vuex_token;
		if(config.url == '/login') config.header.noToken = true;
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		if (res.statusCode == 200) {
			// 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
			return res.data;
		} else if (res.statusCode== 401) {
			vm.$u.toast('验证失败，请重新登录');
			setTimeout(() => {
				vm.$u.route({
					url: '/pages/login',
					type: 'redirectTo'
				})
			}, 1500)
			return false;
		} else return false;
	}
}

export default {
	install
}
