$(function(){
    var sideuserid;var userid;var date1;
    //时间
    var date = new Date();
    var m;
    if (date.getMinutes() < 10) {
        m = '0' + date.getMinutes();
    } else {
        m = date.getMinutes();
    }
    date1=(date.getMonth() + 1) + '月' + date.getDate() + '日 ' + ' ' + date.getHours() + ':' + m;
    $('.main-time').html(date1);
    //聊天
    var header = 'http://101.201.146.79:8088/dts/image/';
    var img,name,sideimg;
    var flag=GetQueryString('flag');
    if(flag==0){
        sideuserid=GetQueryString('sideUserId');
        userid=GetQueryString('userid');
    }
    if(flag==1){
        userid=GetQueryString('sideUserId');
        sideuserid=GetQueryString('userid');
    }
    var websocket;
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://101.201.146.79:8088/dts/webSocketServer?userid="+userid);
    } else if ('MozWebSocket' in window) {
        websocket = new MozWebSocket("ws://dts/webSocketServer?userid="+userid);
    } else {
        websocket = new SockJS("http://101.201.146.79:8088/dts/sockjs/webSocketServer?userid"+userid);
    }
    websocket.onopen = function (evnt) {
        $("#tou").append("链接服务器成功!");

    };
    websocket.onmessage = function (evnt) {
        console.log('$$$$'+userid)
        $(".chat-box").append('<li class="chat-list chat-left"><div class="chat-img"><img src='+header+img+' alt=""/></div><div class="chat-text sj-left">'+evnt.data+'<div class="triangle_border_left"><span></span></div></div></li>');
    };
    websocket.onerror = function (evnt) {
    };
    websocket.onclose = function (evnt) {
        $("#tou").append("与服务器断开了链接!")
    }
    $('#send').bind('click', function() {
        send();
    });
    $.ajax({
        type: 'post',
        contentType: "application/json;charset=utf-8",
        url: 'http://101.201.146.79:8088/dts/challenge/userInfo',
        cache: false,
        dataType: 'jsonp',
        jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback: "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        data: {userId:userid},
        success: function (msg) {
            img=msg.image;
            name=msg.nickname;
            //昵称
            $('.top-detail').html('<a href="javascript:;" class="return-btn"> <img class="top-return" src="../images/rtn.png" alt=""> </a> <span>'+name+'</span>')
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
    /*$.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/userInfo',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        data : {userId:sideuserid},
        success : function(data) {
            sideimg=data.image;
            console.log(sideimg)
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });*/
    function send(){
        if (websocket != null) {
            var message = document.getElementById('message').value;
            $.ajax({
                type: 'post',
                contentType: "application/json",
                url: "http://101.201.146.79:8088/dts/challenge/auditing?userId=" + sideuserid + "&message=" + message,
                cache: false,
                dataType: 'jsonp',
                jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                jsonpCallback: "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                success: function (data) {
                    console.log('&&&'+userid)
                    $(".chat-box").append('<li class="chat-list chat-list-ling"><div class="chat-img"><img src='+header+img+' alt=""/></div><div class="chat-text sj-right">' + $("#message").val() + '<div class="triangle_border_right"><span></span></div></div></li>')
                    $("#message").val('');
                }
            });
        } else {
            alert('未与服务器链接.');
        }
    }
});
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}