$(document).ready(function () {
    var date1;var content;
    content=$('#out').html();
    var date = new Date();
    var m;
    if (date.getMinutes() < 10) {
        m = '0' + date.getMinutes();
    } else {
        m = date.getMinutes();
    }
    date1=(date.getMonth() + 1) + '月' + date.getDate() + '日' + ' ' + date.getHours() + ':' + m;
    topic(content);
    //grdt();
});
function topic(content){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/publish/addPublish',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        data : {userId:window.myJS.getUserId(),content:content,images:'',areas:''},
        success : function(msg) {
            alert(1);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}