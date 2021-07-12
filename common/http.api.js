const install = (Vue, vm) => {

	// ====新接口====

	// 登录
	let Login = (params = {}) => vm.$u.get('api/account/loginbyaccount', params);
	// 当前用户信息
	let getInfo = (params = {}) => vm.$u.get('api/users/current/getinfo');
	// 获得所有公司信息
	let getcompanyAll = (params = {}) => vm.$u.get('api/company/getall');
	
	// ====更新组织信息====
	
	// 更新公司信息
	let updataCompany= (params = {}) => vm.$u.post('api/company/update', params);
	// 修改公司名称
	let updataName= (params = {}) => vm.$u.post('api/company/updatename', params);
	
	// ====用户管理====
	
	//更新当前用户信息
	let updataCurrUser= (params = {}) => vm.$u.post('api/users/current/update', params);
	//修改用户密码
	let userChangepassword= (params = {}) => vm.$u.post('api/users/changepassword', params);
	// 更换当前用户头像
	let changeAvatar= (params = {}) => vm.$u.post('api/users/current/changeavatar', params);
	
	// ====客户管理====
	
	// 创建客户信息
	let customerRegister = (params = {}) => vm.$u.post('api/customer/create', params);
	// 获得当前登录用户所属公司下所有客户单位信息
	let getCustomersList = (params = {}) => vm.$u.get('api/customer/getall');
	// 获得指定客户信息
	let getCustomerById = (params = {}) => vm.$u.get('api/customer/find', params)
	// 根据客户单位名称查找 (当前登录用户所属单位)
	let getCustomerByName = (params = {}) => vm.$u.get('api/customer/searchbyname', params)
	// 更新客户单位信息
	let updataCustomer = (params = {}) => vm.$u.post('api/customer/update', params)
	// 获得所有公司信息
	let getCompanyList = (params = {}) => vm.$u.get('api/company/getall')
	// 创建客户单位角色

	// ====权限管理====

	let createCustomerRole = (params = {}) => vm.$u.post('api/role/current/create', params)
	// 获得当前登录用户所属组织下所有角色信息
	let getCurrentRoleList = (params = {}) => vm.$u.get('api/role/current/getall')
	// 获得当前登录用户所属组织下所有用户信息
	let getCurrentUserList = (params = {}) => vm.$u.get('api/users/current/getall')
	// 获得指定单位信息
	let getCompanyFind = (params = {}) => vm.$u.get('api/company/find', params)
	// 获得指定ID的角色信息
	let getRoleFind = (params = {}) => vm.$u.get('api/role/find', params)
	// 更新角色信息
	let updataRole = (params = {}) => vm.$u.post('api/role/update', params)
	// 公司用户注册
	let createcCompany = (params = {}) => vm.$u.post('api/users/company/create', params)
	// 客户单位用户注册
	let createcCustomer = (params = {}) => vm.$u.post('api/users/customer/create', params)
	// 删除用户
	let destroyCustomer = (params = {}) => vm.$u.post('api/users/destroy', params)
	// 获取指定ID的用户信息
	let getUserFindById = (params = {}) => vm.$u.get('api/users/find', params)
	// 更新用户信息
	let updataUser = (params = {}) => vm.$u.post('api/users/update', params)

	// ====订单管理====

	// 获得所在未销售提交的销售定单（含出库退单）
	let getOrderSaleList = (params = {}) => vm.$u.get('api/order/sale/getsaling')
	// 创建销售订单
	let createOrderSale = (params = {}) => vm.$u.post('api/order/sale/create', params)
	// 获得所有设备型号信息
	let getModelSaleList = (params = {}) => vm.$u.get('api/order/sale/device/getmodels', params)
	// 增加销售设备
	let addDeviceSale = (params = {}) => vm.$u.post('api/order/sale/device/add', params)
	// 获得获得指定销售订单
	let getOrderInfo = (params = {}) => vm.$u.get('api/order/sale/find', params)
	// 获得销售订单设备清单
	let getOrderSaleDevices = (params = {}) => vm.$u.get('api/order/sale/device/getall', params)
	// 获得指定设备型号
	let getModelFindById = (params = {}) => vm.$u.get('api/model/find', params)
	// 更新销售设备信息数量
	let updataDeviceSale = (params = {}) => vm.$u.post('/api/order/sale/device/updatebymodel', params)
	// 删除销售设备信息
	let deleteDeviceSale = (params = {}) => vm.$u.post('api/order/sale/device/delete', params)
	// 提交销售订单
	let saleOrderFinish = (params = {}) => vm.$u.post('api/order/sale/finish', params)
	// 销售订单出库接单
	let acceptSaleOrder = (params = {}) => vm.$u.post('api/order/sale/delivery/accept', params)
	// 销售订单出库退单
	let refuseSaleOrder = (params = {}) => vm.$u.post('api/order/sale/delivery/refuse', params)
	// 注销销售订单
	let destroySaleOrder = (params = {}) => vm.$u.post('api/order/sale/destroy', params)
	// 获得所在已销售提交的销售定单
	let getOrderSaled = (params = {}) => vm.$u.get('api/order/sale/getsaled')
	// 获得所在未出库提交的销售定单
	let getOrderDelivering = (params = {}) => vm.$u.get('api/order/sale/getdelivering')
	// 根据设备ID或出厂序列号查找设备信息
	let complexfindById = (params = {}) => vm.$u.get('api/device/complexfind', params)
	//销售订单能否出库
	let canSaleDelivery = (params = {}) => vm.$u.get('api/order/sale/delivery/can', params)
	// 销售订单设备出库
	let deviceSaleDelivery = (params = {}) => vm.$u.post('api/order/sale/delivery/device', params)
	// 销售订单出库提交
	let acceptSaleDelivery = (params = {}) => vm.$u.post('api/order/sale/delivery/finish', params)
	// 获得所在已出库提交的销售定单
	let getorderDeliveried = (params = {}) => vm.$u.get('api/order/sale/getdeliveried')
	// 获得所在未施工提交的销售定单
	let getorderInstalling = (params = {}) => vm.$u.get('api/order/sale/getinstalling')
	// 销售订单安装接单
	let acceptSaleInstall = (params = {}) => vm.$u.post('api/order/sale/install/accept', params)
	// 销售订单安装退单
	let refuseSaleInstall = (params = {}) => vm.$u.post('api/order/sale/install/refuse', params)
	// 获得施工订单设备详情列表
	let deviceGetdetails = (params = {}) => vm.$u.get('api/order/sale/device/getall', params)
	// 销售订单安装竣工
	let finishSaleInstall = (params = {}) => vm.$u.post('api/order/sale/install/finish', params)
	// 销售订单是否可以安装施工
	let canSaleInstall = (params = {}) => vm.$u.get('api/order/sale/install/can', params)
	// 安装报警主机
	let installSaleAlarm = (params = {}) => vm.$u.post('api/order/sale/install/alarm', params)
	// 安装DTU网络传输设备
	let installSaleDtu = (params = {}) => vm.$u.post('api/order/sale/install/dtu', params)
	// 安装灭火器
	let installSaleFire = (params = {}) => vm.$u.post('api/order/sale/install/fire', params)
	// 安装燃气泄漏报警设备
	let installSaleGas = (params = {}) => vm.$u.post('api/order/sale/install/gas', params)
	// 安装智能网关
	let installSaleGateway = (params = {}) => vm.$u.post('api/order/sale/install/gateway', params)
	// 安装IPC网络摄像机
	let installSaleIPC = (params = {}) => vm.$u.post('api/order/sale/install/ipc', params)
	// 安装NVR网络硬盘录像机
	let installSaleNVR = (params = {}) => vm.$u.post('api/order/sale/install/nvr', params)
	// 获得所在已竣工的销售定单
	let canSaleInstalled = (params = {}) => vm.$u.get('api/order/sale/getinstalled', params)

	// ====通知消息====

	// 获得当前用户未读取报警消息
	let alarmUnreadAll = (params = {}) => vm.$u.get('api/message/alarm/unread/getall', params)
	// 	获得报警消息详情
	let alarmUnreadById = (params = {}) => vm.$u.get('api/message/alarm/getbyid', params)
	// 报警消息处置
	let processExecute = (params = {}) => vm.$u.post('api/message/alarm/process/execute', params)
	// 报警消息复位
	let processReset = (params = {}) => vm.$u.post('api/message/alarm/process/reset', params)
	
	// ====设备管理====
	
	// 根据设备ID或出厂序列号查找设备信息
	let deviceComplexfind = (params = {}) => vm.$u.get('api/device/complexfind', params)
	// 获得所有设备型号信息
	let modelGetall = (params = {}) => vm.$u.get('api/model/getall', params)
	// 设备入库
	let stockin = (params = {}) => vm.$u.post('api/device/stockin', params)
	// 按出厂序列号查找指定公司下的设备信息
	let deviceCompanyById = (params = {}) => vm.$u.get('api/device/searchbysn/company', params)
	// 获得指定单位下所有设备信息
	let deviceCompanyGetall = (params = {}) => vm.$u.get('api/device/company/getall', params)
	// 获得指定公司所有设备分页数据
	let deviceCompanyGetpagedall = (params = {}) => vm.$u.get('api/device/company/getpagedall', params)
	// 按出厂序列号查找指定公司下的设备信息
	let deviceSearchbysn = (params = {}) => vm.$u.get('api/device/searchbysn/company', params)
	// 更新报警主机设备信息
	let updatedDviceAlarm = (params = {}) => vm.$u.post('api/device/update/alarm', params)
	// 更新DTU网络传输设备信息
	let updatedDviceDtu = (params = {}) => vm.$u.post('api/device/update/dtu', params)
	// 更新灭火器设备信息
	let updatedDviceFire = (params = {}) => vm.$u.post('api/device/update/fire', params)
	// 更新燃气泄漏报警设备信息
	let updatedDviceGas = (params = {}) => vm.$u.post('api/device/update/gas', params)
	// 更新智能网关设备信息
	let updatedDviceGateway= (params = {}) => vm.$u.post('api/device/update/gateway', params)
	// 更新IPC网络摄像机设备信息
	let updatedDviceIpc = (params = {}) => vm.$u.post('api/device/update/ipc', params)
	// 更新NVR网络硬盘机设备信息
	let updatedDviceNvr = (params = {}) => vm.$u.post('api/device/update/nvr', params)
	// 设备报损
	let deviceLoss = (params = {}) => vm.$u.post('api/device/loss', params)
	// 设备注销
	let deviceDestroy = (params = {}) => vm.$u.post('api/device/destroy', params)
	// 获得客户单位所有安装区域信息
	let getCustomrArea = (params = {}) => vm.$u.get('api/customer/area/getall', params)
	// 获得所有报警主机型号
	let getAlarm = (params = {}) => vm.$u.get('api/model/alarm/getall', params)
	// 获得所有DTU型号
	let getDtu = (params = {}) => vm.$u.get('api/model/dtu/getall', params)
	// 获得所有灭火器型号
	let getFire = (params = {}) => vm.$u.get('api/model/fire/getall', params)
	// 获得所有燃气泄漏报警器型号
	let getGas = (params = {}) => vm.$u.get('api/model/gas/getall', params)
	// 获得所有智能网关
	let getGateway = (params = {}) => vm.$u.get('api/model/gateway/getall', params)
	// 获得所有IPC网络摄像机型号
	let getIpc = (params = {}) => vm.$u.get('api/model/ipc/getall', params)
	// 获得所有NVR网络硬盘录像机型号
	let getNvr = (params = {}) => vm.$u.get('api/model/nvr/getall', params)
	// 按设备名称查找当前组织下所有设备信息
	let getSearchbyName = (params = {}) => vm.$u.get('api/device/searchbyname/current', params)
	
	// ====数据字典====

	// 设备类别
	let getDeviceType = (params = {}) => vm.$u.get('api/dictionary/devicetype')
	// 设备状态
	let getDeviceStatus = (params = {}) => vm.$u.get('api/dictionary/devicestatus')
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
	// 报警消息状态
	let getAlarStatus = (params = {}) => vm.$u.get('api/dictionary/alarmmessagestatus')
	// 报警类别
	let getAlarmtype = (params = {}) => vm.$u.get('api/dictionary/alarmtype')
	
	// ==== 存储字典 ====
	
	let getAlarmtypeFn = async () => {
		let is = uni.getStorageSync('GetAlarmtype')
		if (is) return is
		else {
			const res = await getAlarmtype()
			if (res.success) uni.setStorageSync('GetAlarmtype', res.data)
			return res.data
		}
	}
	let getAlarStatusFn = async () => {
		let is = uni.getStorageSync('GetAlarStatus')
		if (is) return is
		else {
			const res = await getAlarStatus()
			if (res.success) uni.setStorageSync('GetAlarStatus', res.data)
			return res.data
		}
	}
	let getCompanyListFc = async () => {
		let is = uni.getStorageSync('GetCompanyList')
		if (is) return is
		else {
			const res = await getCompanyList()
			if (res.success) uni.setStorageSync('GetCompanyList', res.data)
			return res.data
		}
	}
	let getCustomersListFc = async () => {
		let is = uni.getStorageSync('GetCustomersList')
		if (is) return is
		else {
			const res = await getCustomersList()
			if (res.success) uni.setStorageSync('GetCustomersList', res.data)
			return res.data
		}
	}
	let getDeviceTypeFc = async () => {
		let is = uni.getStorageSync('GetDeviceType')
		if (is) return is
		else {
			const res = await getDeviceType()
			if (res.success) uni.setStorageSync('GetDeviceType', res.data)
			return res.data
		}
	}
	let getDeviceStatusFc = async () => {
		let is = uni.getStorageSync('GetDeviceStatus')
		if (is) return is
		else {
			const res = await getDeviceStatus()
			if (res.success) uni.setStorageSync('GetDeviceStatus', res.data)
			return res.data
		}
	}
	let getDevicesMdoleFc = async () => {
		let is = uni.getStorageSync('GetDevicesMdole')
		if (is) return is
		else {
			const res = await getDevicesMdole()
			if (res.success) uni.setStorageSync('GetDevicesMdole', res.data)
			return res.data
		}
	}

	vm.$u.api = {
		Login,
		getInfo,
		getcompanyAll,
		updataCompany,
		updataName,
		updataCurrUser,
		userChangepassword,
		changeAvatar,
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
		getorderDeliveried,
		getorderInstalling,
		acceptSaleInstall,
		refuseSaleInstall,
		deviceGetdetails,
		finishSaleInstall,
		canSaleInstall,
		installSaleAlarm,
		installSaleDtu,
		installSaleFire,
		installSaleGas,
		installSaleIPC,
		installSaleNVR,
		canSaleInstalled,
		alarmUnreadAll,
		alarmUnreadById,
		processReset,
		processExecute,
		deviceComplexfind,
		modelGetall,
		stockin,
		deviceCompanyById,
		deviceCompanyGetall,
		deviceCompanyGetpagedall,
		deviceSearchbysn,
		updatedDviceAlarm,
		updatedDviceDtu,
		updatedDviceFire,
		updatedDviceGas,
		updatedDviceGateway,
		updatedDviceIpc,
		updatedDviceNvr,
		deviceLoss,
		deviceDestroy,
		getCustomrArea,
		getAlarm,
		getDtu,
		getFire,
		getGas,
		getIpc,
		getGateway,
		getNvr,
		getSearchbyName,
		installSaleGateway,
		getOrderSaleList,
		createOrderSale,
		getModelSaleList,
		addDeviceSale,
		getOrderInfo,
		getOrderSaleDevices,
		getModelFindById,
		updataDeviceSale,
		saleOrderFinish,
		deleteDeviceSale,
		acceptSaleOrder,
		refuseSaleOrder,
		destroySaleOrder,
		getOrderSaled,
		getOrderDelivering,
		complexfindById,
		canSaleDelivery,
		deviceSaleDelivery,
		acceptSaleDelivery,
		getDeviceType,
		getDeviceStatus,
		getDevicesMdole,
		getIpcsdk,
		getRoletype,
		getRolestatus,
		getUsertype,
		getUserstatus,
		getOrderstatus,
		getOrderopertype
	};
	vm.$u.dictionary = {
		getAlarmtypeFn,
		getAlarStatusFn,
		getCompanyListFc,
		getDeviceTypeFc,
		getDeviceStatusFc,
		getDevicesMdoleFc
	}
}

export default {
	install
}
