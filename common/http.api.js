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
	// 获得所有设备型号列表
	let DeviceModelsList = (params = {}) => vm.$u.get('api/DeviceModels/List',params)
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
	let getOrderInfo = (params = {}) => vm.$u.get('api/Sales/GetSaleOrderById',params)
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
	// 数据字典
	// 设备类别
	let getDeviceType = (params = {}) => vm.$u.get('api/Dictionary/DeviceType',params)
	// 设备状态
	let getDeviceStatus = (params = {}) => vm.$u.get('api/Dictionary/DeviceStatus',params)
	// 摄像机/NVR品牌
	let getCameraBrand= (params = {}) => vm.$u.get('api/Dictionary/CameraBrand',params)
	// 公司类别
	let getCompanyType = (params = {}) => vm.$u.get('api/Dictionary/CompanyType',params)
	// 公司状态
	let getCompanyStatus = (params = {}) => vm.$u.get('api/Dictionary/CompanyStatus',params)
	// 客户状态
	let getCustomerStatus = (params = {}) => vm.$u.get('api/Dictionary/CustomerStatus',params)
	// 员工类别
	let getEmployeeType = (params = {}) => vm.$u.get('api/Dictionary/EmployeeType',params)
	// 员工状态
	let getEmployeeStatus = (params = {}) => vm.$u.get('api/Dictionary/EmployeeStatus',params)
	// 工单类别
	let getOrderType = (params = {}) => vm.$u.get('api/Dictionary/OrderType',params)
	// 工单状态
	let getOrderStatus = (params = {}) => vm.$u.get('api/Dictionary/OrderStatus',params)
	// 获得所有设备型号信息
	let GetAllModle = (params = {}) => vm.$u.get('api/Models/GetAll',params)
	// 查询销售订单设备详情
	let getSaleOrderDeviceDetails = (params = {}) => vm.$u.get('api/Sales/GetSaleOrderDeviceDetails',params)
	// 查询安装区域
	let getSaleOrderDevicesByType = (params = {}) => vm.$u.get('api/Sales/GetSaleOrderDevicesByType',params)
	// 获得指定设备信息
	let getById = (params = {}) => vm.$u.get('api/Devices/GetById',params)
	// 获得指定灭火设备信息
	let getFireDeviceById = (params = {}) => vm.$u.get('api/Devices/GetFireDeviceById',params)
	// 获得指定报警设备信息
	let getAlertDeviceById = (params = {}) => vm.$u.get('api/Devices/GetAlertDeviceById',params)
	// 获得指定摄像机设备信息
	let getAlarms = (params = {}) => vm.$u.get('api/Alarms/GetAlarms',params)
	// 获得当前登录用户所属公司/客户单位所有报警设备信息
	let getCamerasById = (params = {}) => vm.$u.get('api/Devices/GetCameraByCustomerArea',params)
	// 获得当前登录用户所属单位NVR信息
	let getByNvrsCompany = (params = {}) => vm.$u.get('api/Nvrs/GetByCurrentCompany',params)
	// 获得当前登录用户所属单位智能网关信息
	let getByGatewaysCompany = (params = {}) => vm.$u.get('api/Gateways/GetByCurrentCompany',params)
	// 安装灭火设备（集成报警设备）
	let InstallFireDeviceCombineAlert = (params = {}) => vm.$u.post('api/Installs/InstallFireDeviceCombineAlert',params)
	// 安装灭火设备（未集成）
	let InstallFireDevice = (params = {}) => vm.$u.post('api/Installs/InstallFireDevice',params)
	// 安装智能网关设备
	let InstallGateway = (params = {}) => vm.$u.post('api/Installs/InstallGateway',params)
	// 安装NVR
	let InstallNvr = (params = {}) => vm.$u.post('api/Installs/InstallNvr',params)
	// 安装摄像机
	let InstallCamera = (params = {}) => vm.$u.post('api/Installs/InstallCamera',params)
	// 安装报警设备
	let InstallAlertDevice = (params = {}) => vm.$u.post('api/Installs/InstallAlertDevice',params)
	vm.$u.api = {
		Login,
		getInfo,
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
		getCustomer,
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
		StockOutDevice,
		getDeviceType,
		getDeviceStatus,
		getCameraBrand,
		getCompanyType,
		getCompanyStatus,
		getCustomerStatus,
		getEmployeeType,
		getEmployeeStatus,
		getOrderType,
		getOrderStatus,
		GetAllModle,
		getSaleOrderDeviceDetails,
		getSaleOrderDevicesByType,
		getFireDeviceById,
		getAlertDeviceById,
		getAlarms,
		getByNvrsCompany,
		getByGatewaysCompany,
		getCamerasById,
		getById,
		InstallFireDeviceCombineAlert,
		InstallFireDevice,
		InstallGateway,
		InstallNvr,
		InstallCamera,
		InstallAlertDevice
	};
}

export default {
	install
}
