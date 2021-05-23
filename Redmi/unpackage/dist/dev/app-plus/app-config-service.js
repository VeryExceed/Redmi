
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/class/class","pages/cart/cart","pages/my/my","pages/search/search","pages/search-list/search-list"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"仿小米商城","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFF"},"tabBar":{"color":"#B5B5B5","selectedColor":"#FD6801","borderStyle":"black","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/tabbar/index.png","selectedIconPath":"static/tabbar/indexSelected.png"},{"pagePath":"pages/class/class","text":"分类","iconPath":"static/tabbar/class.png","selectedIconPath":"static/tabbar/classSelected.png"},{"pagePath":"pages/cart/cart","text":"购物车","iconPath":"static/tabbar/cart.png","selectedIconPath":"static/tabbar/cartSelected.png"},{"pagePath":"pages/my/my","text":"我的","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/mySelected.png"}]},"nvueCompiler":"weex","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Redmi","compilerVersion":"3.1.13","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isNVue":true,"isTabBar":true},"window":{"scrollIndicator":"none","titleNView":{"searchInput":{"align":"left","backgroundColor":"#F7F7F7","borderRadius":"4px","disabled":true,"placeholder":"仿小米商城","placeholderColor":"#CCCCCC"},"buttons":[{"color":"#989898","colorPressed":"#FD6801","float":"left","fontSize":"22px","fontSrc":"/static/font/iconfont.ttf","text":""},{"color":"#989898","colorPressed":"#FD6801","float":"right","fontSize":"22px","fontSrc":"/static/font/iconfont.ttf","text":""}]}}},{"path":"/pages/class/class","meta":{"isQuit":true,"isTabBar":true},"window":{"scrollIndicator":"none","bounce":"none","titleNView":{"searchInput":{"align":"left","backgroundColor":"#F7F7F7","borderRadius":"4px","disabled":true,"placeholder":"仿小米商城","placeholderColor":"#CCCCCC"},"buttons":[{"color":"#989898","colorPressed":"#FD6801","float":"right","fontSize":"22px","fontSrc":"/static/font/iconfont.ttf","text":""}]}}},{"path":"/pages/cart/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false}},{"path":"/pages/search/search","meta":{},"window":{"scrollIndicator":"none","titleNView":{"searchInput":{"align":"left","backgroundColor":"#F7F7F7","borderRadius":"4px","disabled":false,"placeholder":"仿小米商城","placeholderColor":"#CCCCCC"},"buttons":[{"color":"#989898","colorPressed":"#FD6801","float":"right","fontSize":"16px","text":"搜索"}]}}},{"path":"/pages/search-list/search-list","meta":{},"window":{"scrollIndicator":"none","titleNView":{"searchInput":{"align":"left","backgroundColor":"#F7F7F7","borderRadius":"4px","disabled":false,"placeholder":"仿小米商城","placeholderColor":"#CCCCCC"},"buttons":[{"color":"#989898","colorPressed":"#FD6801","float":"right","fontSize":"16px","text":"搜索"}]}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
