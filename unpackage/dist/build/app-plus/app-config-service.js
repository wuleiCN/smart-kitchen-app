
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/Login","pages/index/index","pages/customer/index","pages/company/index","pages/scan/index","pages/my/index","pages/message/New","pages/message/Detail","pages/device/Device","pages/device/Device","pages/device/Detail","pages/device/Warehousing","pages/order/monitor/list","pages/order/monitor/flow","pages/order/sale/list","pages/order/sale/selectproduct","pages/order/sale/saledevices","pages/order/sale/create","pages/customer/selector","pages/order/distribute/list","pages/order/distribute/distribute","pages/order/distribute/devicedistribute","pages/order/install/list","pages/order/install/install","pages/order/monitor/order_detail"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#0081ff","navigationStyle":"custom"},"tabBar":{"list":[{"pagePath":"pages/index/index"},{"pagePath":"pages/scan/index"},{"pagePath":"pages/my/index"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"XiangDao-App","compilerVersion":"2.7.14","entryPagePath":"pages/Login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/Login","meta":{"isQuit":true},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/customer/index","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/company/index","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/scan/index","meta":{"isQuit":true,"isTabBar":true},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/my/index","meta":{"isQuit":true,"isTabBar":true},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/message/New","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/message/Detail","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/device/Device","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/device/Detail","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/device/Warehousing","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/monitor/list","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/monitor/flow","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/sale/list","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/sale/selectproduct","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/sale/saledevices","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/sale/create","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/customer/selector","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/distribute/list","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/distribute/distribute","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/distribute/devicedistribute","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/install/list","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/install/install","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}},{"path":"/pages/order/monitor/order_detail","meta":{},"window":{"background":"#0A1121","bounceBackground":"#0A1121","animationType":"slide-in-right"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
