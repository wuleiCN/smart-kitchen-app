const install = (Vue, vm) => {
	
	// ====新接口====
	
	// 登录
	let Login = (params = {}) => vm.$u.get('api/account/loginbyaccount', params);
	// 当前用户信息
	let getInfo = (params = {}) => vm.$u.get('api/users/current/getinfo');
	// 创建客户信息
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
	// ====数据字典====
	
	// 设备类别
	let getDeviceType = (params = {}) => vm.$u.get('api/dictionary/devicetype')
	// 设备状态
	let getDevicestatus = (params = {}) => vm.$u.get('api/dictionary/devicestatus')
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
	
	
	// ====弃用接口====
	
	
	// 报警信息
	let getMessageList = (params = {}) => vm.$u.get('api/Messages/List', params)
	// 获取所有设备信息
	let getDevicesInfoAll = (params = {}) => vm.$u.get('api/Devices/GetData',params)
	// 获取指定设备信息
	let getDevicesInfoById = (params = {}) => vm.$u.get('api/Devices/GetById',params)
	// 获得所有设备型号列表
	let DeviceModelsList = (params = {}) => vm.$u.get('api/DeviceModels/List',params)
	// 获取工单监控列表
	let getMonitorList = (params = {}) => vm.$u.get('api/Order/GetMonitorList')
	// 获取指定工单信息
	let getMonitorById = (params = {}) => vm.$u.get('api/Orders/GetMonitorFlow',params)
	// 获取销售工单列表（未派出)
	let getOrderSaleList = (params = {}) => vm.$u.get('api/order/sale/getsaling',params)
	// 销售派单
	let orderSale = (params = {}) => vm.$u.post('api/OrderSale/Saled',params)
	// 产品销售列表
	let getSalingDevices = (params = {}) => vm.$u.get('api/OrderSale/GetSalingDevices',params)
	// 获得销售定单设备数量 (整个销售工单设备数量汇总)
	let getOrderSaleDeviceCounts = (params = {}) => vm.$u.get('api/OrderSale/GetOrderSaleDeviceCounts',params)
	// 加入购物车
	let OrderSaleDevice = (params = {}) => vm.$u.post('api/OrderSale/SaleDevice',params)
	// 立刻派单
	let OrderSaled = (params = {}) => vm.$u.post('api/OrderSale/Saled',params)
	// 获取销售信息
	let getOrderInfo = (params = {}) => vm.$u.get('api/Sales/GetSaleOrderById',params)
	// 获得指定销售工单销售产品清单
	let getOrderSaleDevices = (params = {}) => vm.$u.get('api/OrderSale/GetOrderSaleDevices',params)
	// 更新销售工单产品信息
	let updateOrderSaleDevices = (params = {}) => vm.$u.post('api/OrderSale/UpdateOrderSaleDevices',params)
	// 新增销售工单
	let createOrderSale = (params = {}) => vm.$u.post('api/OrderSale/Create',params)
	// 销售出库回单
	let distributeFinish = (params = {}) => vm.$u.post('api/OrderSale/DistributeFinish',params)
	// 获得销售出库工单列表
	let getDistributeOrders = (params = {}) => vm.$u.get('api/Sales/GetSaleOrders',params)
	// 销售出库接单
	let distributeAccept = (params = {}) => vm.$u.post('api/Sales/SaleOrderDistributeAccept',params)
	// 销售设备出库
	let orderSaleDeviceDistribute = (params = {}) => vm.$u.post('api/OrderSale/OrderSaleDeviceDistribute',params)
	// 获得指定销售订单销售设备信息
	let getSaleOrderDevices = (params = {}) => vm.$u.get('api/Sales/GetSaleOrderDevices',params)
	// 按设备编码出库设备
	let orderSaleDeviceDistributeByCode = (params = {}) => vm.$u.post('api/Storages/StockOutDevice',params)
	// 获得销售安装工单列表
	let getInstallOrders = (params = {}) => vm.$u.get('api/OrderSale/GetInstallOrders',params)
	// 施工接单
	let installAccept = (params = {}) => vm.$u.post('api/OrderSale/InstallAccept',params)
	// 工单是否可以施工回单
	let canInstallFinish = (params = {}) => vm.$u.get('api/Orders/CanInstallFinish',params)
	// 获得指定客户区域信息
	let getAreasByCustomer = (params = {}) => vm.$u.get('api/Customers/GetAreas',params)
	// 获得指定客户所有设备信息
	let getCustomerDevices = (params = {}) => vm.$u.get('api/Devices/GetCustomerDevices',params)
	// 报警设备入库
	let StockInAlertDevice = (params = {}) => vm.$u.post('api/Storages/StockInAlertDevice',params)
	// 灭火设备入库（未集成报警设备）
	let StockInFireDevice = (params = {}) => vm.$u.post('api/Storage/StockInFireDevice',params)
	// 灭火设备入库（集成报警设备）
	let StockInFireDeviceWithAlert = (params = {}) => vm.$u.post('api/Storages/StockInFireDeviceWithAlert',params)
	// 智能网关设备入库
	let StockInGateway = (params = {}) => vm.$u.post('api/Storages/StockInGateway',params)
	// NVR设备入库
	let StockInNvr = (params = {}) => vm.$u.post('api/Storages/StockInNvr',params)
	// 摄像机设备入库
	let StockInCamera = (params = {}) => vm.$u.post('api/Storages/StockInCamera',params)
	// 设备出库
	let StockOutDevice = (params = {}) => vm.$u.post('api/Storages/StockOutDevice',params)
	
	vm.$u.api = {
		Login,
		getInfo,
		customerRegister,
		getMessageList,
		getDevicesInfoAll,
		getDevicesInfoById,
		DeviceModelsList,
		getMonitorList,
		getMonitorById,
		getOrderSaleList,
		orderSale,
		getSalingDevices,
		getOrderSaleDeviceCounts,
		OrderSaleDevice,
		OrderSaled,
		getOrderInfo,
		getOrderSaleDevices,
		updateOrderSaleDevices,
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
		getDeviceType,
		getDevicestatus,
		getIpcsdk,
		getRoletype,
		getRolestatus,
		getUsertype,
		getUserstatus,
		getOrderstatus,
		getOrderopertype,
		createOrderSale,
		distributeFinish,
		getDistributeOrders,
		distributeAccept,
		orderSaleDeviceDistribute,
		getSaleOrderDevices,
		orderSaleDeviceDistributeByCode,
		getInstallOrders,
		installAccept,
		canInstallFinish,
		getAreasByCustomer,
		getCustomerDevices,
		StockInAlertDevice,
		StockInFireDevice,
		StockInFireDeviceWithAlert,
		StockInGateway,
		StockInNvr,
		StockInCamera,
		StockOutDevice
	};
}

export default {
	install
}
