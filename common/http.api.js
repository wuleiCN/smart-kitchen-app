const install = (Vue, vm) => {
	let Login = (params = {}) => vm.$u.get('api/Account/Login', params);
	let getInfo = (params = {}) => vm.$u.post(indexUrl, params);
	vm.$u.api = {Login, getInfo};
}

export default {
	install
}