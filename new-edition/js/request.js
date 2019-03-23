// request.js 示例
// 
// 先声明请求链接地址
// request.url = "http://dd.dingdongxueche.com/DDWeb/drivingInfo/selectByConditions.htm";
// 
// 然后执行request.func.start();
// 参数1：里面的参数是要给 request.url 后面拼接的参数
// 参数2：回调，回带的参数为请求回来的数据
//       request.func.start({
//                city: "",  //-------------城市
//             keyword: "",  //-------------关键字
//               price: "",  //-------------价格
//                area: "",  //-------------区域
//            district: "",  //-------------街区
//            sortType: "",  //-------------排序类型
//                 wom: "",  //-------------评分
//        licenseLevel: "",  //-------------驾照类型
//             haveBus: "",   //-------------有无班车  1 有 0 无
//        haveExamSite: "",   //-------------自带考场  1 有 0 无
// authenticationAgent: "",   //-------------认证代理  1 有 0 无
//           promotion: "",   //-------------活动优惠  ""  1 有 0 无
//            distance: "",   //-------------距离
//            latitude: localStorage.getItem("latitude") || "",   //-------------纬度
//           longitude: localStorage.getItem("longitude") || "",   //-------------经度
//           peopleNum: "",   //-------------练车人数
//           classType: ""   //-------------班级类型
//         },function(_data){
//           createlistDom(_data)
//         });




var request = {};
var requestPOP = new DDPOP();

request.urlCache = "";
request.attr = {};
request.func = {
  // 获取以及自动拼接链接参数 _attr typeof === object
  // 得到参数以及数据完全请求完毕后进行_callback回调
  start:function(_obj,_callback){
    var _obj = $.extend(request.attr,_obj);
    var _this = this;
    request.callback = _callback || null;
    this.getUrl(_obj,function(){
      _this.goAjax.ajax();
    });
    requestPOP.init("加载中...","",{
      icontype:"loading"
    });
  },
  // 接参数 
  // 得到参数以后立即进行_callback回调
  getUrl:function(_attr,_callback){
   var attr = _attr;
   var forInIndex = 0;
  request.urlCache = request.url;
   for(val in attr){
      request.urlCache+= (forInIndex == 0 ? "?" : "&") +val+"="+attr[val];
      forInIndex++;
   }
   _callback && _callback();
  },
  //请求数据
  goAjax:{
    ajax:function(){
      var _this = this;
      $.ajax({
        url:request.urlCache,
        success:this.callback
      });
      console.log(request.urlCache);
    },
    callback:function(_data){
      requestPOP.close();
      var data = JSON.parse(_data);
      request.callback && request.callback(data);
    },
  }
}; 