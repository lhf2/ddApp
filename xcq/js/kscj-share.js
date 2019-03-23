$(document).ready(function(){
    var id=GetQueryString('id');
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/examRecord/shareRecord?id='+id,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        success : function(msg){
            //图片
            $('.autor-icon').children('img').attr('src',
                pdtp(msg.image));
            //分数
            $('.score i').html(msg.score);
            //昵称
            $('.autor-img span').html(msg.nickname);
            //用时
            $('.time i').html(msg.timeConsuming);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
});