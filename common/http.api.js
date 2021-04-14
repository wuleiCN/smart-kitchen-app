const install = (Vue, vm) => {
	
	// ====新接口====
	
	// 登录
	let Login = (params = {}) => vm.$u.get('api/account/loginbyaccount', params);
	// 当前用户信息
	let getInfo = (params = {}) => vm.$u.get('api/users/current/getinfo');
	// 获得所有公司信息
	let getcompanyAll = (params = {}) => vm.$u.get('api/company/getall');
	// 创建客户信息
	
	// ====客户管理====
	let customerRegister = (params = {}) => vm.$u.post('api/customer/create', params);
	// 获得当前登录用户所属公司下所有客户单位信息
	let getCustomersList = (params = {}) => vm.$u.get('api/customer/getall');
	// 获得指定客户信息
	let getCustomerById = (params = {}) => vm.$u.get('api/customer/find',params)
	// 根据客户单位名称查找 (当前登录用户所属单位)
	let getCustomerByName = (params = {}) => vm.$u.get('api/customer/searchbyname',params)
	// 更新客户单位信息
	let updataCustomer = (params = {}) => vm.$u.post('api/customer/update',params)
	// 获得所有公司信息
	let getCompanyList = (params = {}) => vm.$u.get('api/company/getall')
	// 创建客户单位角色
	
	// ====权限管理====
	let createCustomerRole = (params = {}) => vm.$u.post('api/role/current/create',params)
	// 获得当前登录用户所属组织下所有角色信息
	let getCurrentRoleList = (params = {}) => vm.$u.get('api/role/current/getall')
	// 获得当前登录用户所属组织下所有用户信息
	let getCurrentUserList = (params = {}) => vm.$u.get('api/users/current/getall')
	// 获得指定单位信息
	let getCompanyFind = (params = {}) => vm.$u.get('api/company/find',params)
	// 获得指定ID的角色信息
	let getRoleFind = (params = {}) => vm.$u.get('api/role/find',params)
	// 更新角色信息
	let updataRole = (params = {}) => vm.$u.post('api/role/update',params)
	// 公司用户注册
	let createcCompany = (params = {}) => vm.$u.post('api/users/company/create',params)
	// 客户单位用户注册
	let createcCustomer = (params = {}) => vm.$u.post('api/users/customer/create',params)
	// 删除用户
	let destroyCustomer = (params = {}) => vm.$u.post('api/users/destroy',params)
	// 获取指定ID的用户信息
	let getUserFindById = (params = {}) => vm.$u.get('api/users/find',params)
	// 更新用户信息
	let updataUser = (params = {}) => vm.$u.post('api/users/update',params)
	
	// ====订单管理====
	// 获得所在未销售提交的销售定单（含出库退单）
	let getOrderSaleList = (params = {}) => vm.$u.get('api/order/sale/getsaling')
	// 创建销售订单
	let createOrderSale = (params = {}) => vm.$u.post('api/order/sale/create',params)
	// 获得所有设备型号信息
	let getModelSaleList = (params = {}) => vm.$u.get('api/model/getall')
	// 增加销售设备
	let addDeviceSale = (params = {}) => vm.$u.post('api/order/sale/device/add',params)
	// 获得获得指定销售订单
	let getOrderInfo = (params = {}) => vm.$u.get('api/order/sale/find', params)
	// 获得销售订单设备清单
	let getOrderSaleDevices = (params = {}) => vm.$u.get('api/order/sale/device/getall', params)
	// 获得指定设备型号
	let getModelFindById = (params = {}) => vm.$u.get('api/model/find', params)
	// 更新销售设备信息数量
	let updataDeviceSale = (params = {}) => vm.$u.post('api/order/sale/device/update',params)
	// 删除销售设备信息
	let deleteDeviceSale = (params = {}) => vm.$u.post('api/order/sale/device/delete',params)
	// 销售订单出库接单
	let acceptSaleOrder = (params = {}) => vm.$u.post('api/order/sale/delivery/accept',params)
	// 注销销售订单
	let destroySaleOrder = (params = {}) => vm.$u.post('api/order/sale/destroy',params)
	
	// ====数据字典====
	
	// 设备类别
	let getDeviceType = (params = {}) => vm.$u.get('api/dictionary/devicetype')
	// 设备状态
	let getDevicestatus = (params = {}) => vm.$u.get('api/dictionary/devicestatus')
	// 设备型号
	let getDevicesMdole = (params = {}) => vm.$u.get('api/model/getall')
	// 摄像机/NVR品牌
	let getIpcsdk = (params = {}) => vm.$u.get('api/dictionary/ipcsdk')
	// 角色类别
	let getRoletype = (params = {}) => vm.$u.get('api/dictionary/roletype')
	// 角色状态
	let getRolestatus = (params = {}) => vm.$u.get('api/dictionary/rolestatus')
	// 用户类别
	let getUsertype = (params = {}) => vm.$u.get('api/dictionary/usertype')
	// 用户状态
	let getUserstatus = (params = {}) => vm.$u.get('api/dictionary/userstatus')
	// 工单状态
	let getOrderstatus = (params = {}) => vm.$u.get('api/dictionary/orderstatus')
	// 工单类别
	let getOrderopertype = (params = {}) => vm.$u.get('api/dictionary/orderopertype')
	
	vm.$u.api = {
		Login,
		getInfo,
		getcompanyAll,
		customerRegister,
		getCustomersList,
		getCustomerById,
		getCustomerByName,
		updataCustomer,
		getCompanyList,
		createCustomerRole,
		getCurrentRoleList,
		getCurrentUserList,
		getCompanyFind,
		getRoleFind,
		updataRole,
		createcCompany,
		createcCustomer,
		destroyCustomer,
		getUserFindById,
		updataUser,
		getOrderSaleList,
		createOrderSale,
		getModelSaleList,
		addDeviceSale,
		getOrderInfo,
		getOrderSaleDevices,
		getModelFindById,
		updataDeviceSale,
		deleteDeviceSale,
		acceptSaleOrder,
		destroySaleOrder,
		getDeviceType,
		getDevicestatus,
		getDevicesMdole,
		getIpcsdk,
		getRoletype,
		getRolestatus,
		getUsertype,
		getUserstatus,
		getOrderstatus,
		getOrderopertype
	};
}

export default {
	install
}
