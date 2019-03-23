$(document).ready(function(){
    jb();
    $('.clear-box').click(function () {
        history.back();
    });
});
var jbtype=getQueryString('type');
var pid=getQueryString('pubid');
function jb(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/report/addReport?user_id='+window.myJS.getUserId()+'&type='+jbtype+'&publishId='+pid,
        //url : 'http://101.201.146.79:8088/dts/report/addReport',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {user_id:'422294912088670208',type:jbtype,publishId:pid},
        success : function(msg) {},
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}