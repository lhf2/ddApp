     var param="?toRedirectUrl="+window.document.location;
    $.ajaxDone("http://wx.dingdongxueche.com/wx2pay/jsapi/wxjs"+param,call_signature);
    function call_signature(data){
        console.log('授权数据:'+data);
        var jsonObj=JSON.parse(data);
        wx_init(jsonObj);
    }