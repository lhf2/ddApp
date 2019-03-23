$(function(){
    var sidePushId;var PushId;var date1;var obj;var userid;
    var pushid=GetQueryString('sidepushId');
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
    var header = 'http://101.201.146.79:8088/dts/image/';
    //私聊推送
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/sendPush?sidePushId='+pushid+'&userId='+window.myJS.getUserId(),
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        /*data : {sideUserId:userid,userId:window.myJS.getUserId()},*/
        /*success : function(msg) {

         },*/
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
    var myheader_img,myname,siderheader_img,sidername;
    var flag=GetQueryString('flag');
    if(flag==0){
        sidePushId=GetQueryString('sidepushId');
        PushId=GetQueryString('pushId');
        //userid='430545039492382720';
        userid=window.Js.getUserId();
        $.ajax({//获取自己名字和头像
            type: 'post',
            contentType: "application/json;charset=utf-8",
            url: 'http://101.201.146.79:8088/dts/challenge/userInfo?userId='+userid,
            cache: false,
            dataType: 'jsonp',
            jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback: "success_jsonpCallback3",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data: {userId: userid},
            success: function (msg) {
                var name;var img;
                myheader_img=pdtp(msg.image);
                myname=msg.nickname;
                name=msg.nickname;
                img = pdtp(msg.image);
                //昵称
                $('.top-detail').html('<a href="javascript:;" class="return-btn"> <img class="top-return" src="../images/rtn.png" alt=""> </a> <span>'+name+'</span>')
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        });
    }
    if(flag==1){
        PushId=GetQueryString('sidepushId');
        sidePushId=GetQueryString('pushId');
        //userid='422294912088670208';
        userid=window.Js.getUserId();
        $.ajax({//获取对方名字和头像
            type: 'post',
            contentType: "application/json;charset=utf-8",
            url: 'http://101.201.146.79:8088/dts/challenge/userInfo?userId='+userid,
            cache: false,
            dataType: 'jsonp',
            jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback: "success_jsonpCallback2",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data: {userId: sideuserid},
            success: function (msg) {
                var name;var img;
                siderheader_img=pdtp(msg.image);
                sidername=msg.nickname;
                name=msg.nickname;
                img = pdtp(msg.image);
                //昵称
                $('.top-detail').html('<a href="javascript:;" class="return-btn"> <img class="top-return" src="../images/rtn.png" alt=""> </a> <span>'+name+'</span>')
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        });
    }
    $('#face').click(function () {
        $('.btn-bottom').css('bottom',150+'px');
    });
    $('#face').SinaEmotion($('#message'));
    $('.fs-btn').click(function () {
        var objs=$("#message").val(); //输入内容
        obj=AnalyticEmotion(objs);
        $('#message').val('');//清空内容
    });
    var websocket;
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://101.201.146.79:8088/dts/webSocketServer?pushid="+PushId);
    } else if ('MozWebSocket' in window) {
        websocket = new MozWebSocket("ws://dts/webSocketServer?pushid="+PushId);
    } else {
        websocket = new SockJS("http://101.201.146.79:8088/dts/sockjs/webSocketServer?pushid"+PushId);
    }
    websocket.onopen = function (evnt) {
        //$("#tou").append("链接服务器成功!");
    };
    websocket.onmessage = function (evnt) {
        console.log(evnt.data);
        $(".chat-box").append('<li class="chat-list chat-left"><div class="chat-img"><img src='+siderheader_img+' alt=""/></div><div class="chat-text sj-left">'+AnalyticEmotion(evnt.data)+'<div class="triangle_border_left"><span></span></div></div></li>');
    };
    websocket.onerror = function (evnt) {
    };
    websocket.onclose = function (evnt) {
        //$("#tou").append("与服务器断开了链接!")
    }
    $('#send').bind('click', function() {
        send();
    });
    function send(){
        if (websocket != null) {
            //var message = document.getElementById('message').value;
            $.ajax({
                type: 'post',
                contentType: "application/json;charset=utf-8",
                url: "http://101.201.146.79:8088/dts/challenge/auditing?userId=" + userid + "&message=" + obj+'&sidePushId='+sidePushId,
                cache: false,
                dataType: 'jsonp',
                jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                jsonpCallback: "success_jsonpCallback1",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                success: function (data) {
                    $(".chat-box").append('<li class="chat-list chat-list-ling"><div class="chat-img"><img src='+myheader_img+' alt=""/></div><div class="chat-text sj-right">' + obj + '<div class="triangle_border_right"><span></span></div></div></li>')
                    $("#message").val('');
                }
            })
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