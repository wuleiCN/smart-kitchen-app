const install = (Vue, vm) => {
	// 登录
	let Login = (params = {}) => vm.$u.get('api/Account/Login', params);
	// 当前用户信息
	let getInfo = (params = {}) => vm.$u.get('api/Users/GetLoginUserInfo');
	// 报警信息
	let getMessageList = (params = {}) => vm.$u.get('api/Messages/List', params)
	// 获取所有设备信息
	let getDevicesInfoAll = (params = {}) => vm.$u.get('api/Devices/CustomerDevices')
	// 获取指定设备信息
	let getDevicesInfoById = (params = {}) => vm.$u.get('api/Devices/GetById',params)
	// 获取工单监控列表
	let getMonitorList = (params = {}) => vm.$u.get('api/Order/GetMonitorList')
	// 获取指定工单信息
	let getMonitorById = (params = {}) => vm.$u.get('api/Orders/GetMonitorFlow',params)
	// 获取销售工单列表（未派出)
	let getOrderSaleList = (params = {}) => vm.$u.get('api/OrderSale/GetOrderSaleList',params)
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
	// 获得指定客户信息
	let getCustomer = (params = {}) => vm.$u.get('api/Customers/GetCustomer',params)
	// 获取销售信息
	let getOrderInfo = (params = {}) => vm.$u.get('api/OrderSale/GetOrderInfo',params)
	// 获得指定销售工单销售产品清单
	let getOrderSaleDevices = (params = {}) => vm.$u.get('api/OrderSale/GetOrderSaleDevices',params)
	// 更新销售工单产品信息
	let updateOrderSaleDevices = (params = {}) => vm.$u.post('api/OrderSale/UpdateOrderSaleDevices',params)
	// 获取客户单位列表
	let getCustomersList = (params = {}) => vm.$u.get('api/Customers/List',params)
	// 新增销售工单
	let createOrderSale = (params = {}) => vm.$u.post('api/OrderSale/Create',params)
	// 销售出库回单
	let distributeFinish = (params = {}) => vm.$u.post('api/OrderSale/DistributeFinish',params)
	// 获得销售出库工单列表
	let getDistributeOrders = (params = {}) => vm.$u.get('api/Sales/GetSaleOrders',params)
	// 销售出库接单
	let distributeAccept = (params = {}) => vm.$u.post('api/Sales/SaleOrderDistributeAccept',params)
	// 销售设备出库
	let orderSaleDeviceDistribute = (params = {}) => vm.$u.post('api/Sales/SaleOrderDistribute',params)
	// 按设备编码出库设备
	let orderSaleDeviceDistributeByCode = (params = {}) => vm.$u.post('api/OrderSale/OrderSaleDeviceDistributeByCode',params)
	// 获得销售安装工单列表
	let getInstallOrders = (params = {}) => vm.$u.get('api/OrderSale/GetInstallOrders',params)
	// 施工接单
	let installAccept = (params = {}) => vm.$u.post('api/OrderSale/InstallAccept',params)
	// 工单是否可以施工回单
	let canInstallFinish = (params = {}) => vm.$u.get('api/Orders/CanInstallFinish',params)
	// 获得指定客户区域信息
	let getAreasByCustomer = (params = {}) => vm.$u.get('api/Customers/GetAreas',params)
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
		getMessageList,
		getDevicesInfoAll,
		getDevicesInfoById,
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
		getCustomer,
		createOrderSale,
		distributeFinish,
		getDistributeOrders,
		distributeAccept,
		orderSaleDeviceDistribute,
		orderSaleDeviceDistributeByCode,
		getInstallOrders,
		installAccept,
		canInstallFinish,
		getAreasByCustomer,
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
