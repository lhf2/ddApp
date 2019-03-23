var userId;
WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf";
WEB_SOCKET_DEBUG = true;
var jsonStrUser = localStorage.getItem("wx_user")
var jsonUser = JSON.parse(jsonStrUser);
var sidePushId;var PushId;var date1;var obj;var userid;var pkUserId;
var myheader_img=jsonUser.header,myname,siderheader_img,sidername;


$(function() {
    //返回
    $('.page-return').click(function(){
        var pagenume=getQueryString('page');
        if(pagenume&&getQueryString('page')==pagenume){
            location.href='ywxg.html?index='+pagenume;
        }else{
            history.back();
        }
    });
    initPageViewHtml();
});
function initPageViewHtml(){
    var pushid=GetQueryString('sidepushId');
    //时间
    var header = 'http://101.201.146.79:8088/dts/image/';
    var flag=GetQueryString('flag');
    if(flag==0){
        sidePushId=GetQueryString('sidepushId');
        PushId=GetQueryString('pushId');
        pkUserId=GetQueryString('pkUserId');
        //userid='437858287103246336';
        userid=localStorage.getItem("openId");
        slhistory(sidePushId,PushId,pkUserId,userid);
        $.ajax({//获取自己名字和头像
            type: 'post',
            contentType: "application/json;charset=utf-8",
            url: 'http://101.201.146.79:8088/dts/challenge/userInfo?userId='+pkUserId,
            cache: false,
            dataType: 'jsonp',
            jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback: "success_jsonpCallback3",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data: {userId: userid},
            success: function (msg) {
                siderheader_img=pdtp(msg.image);
                sidername=msg.nickname;
                //昵称
                $('.top-detail span').html(sidername);
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
        pkUserId=GetQueryString('userId');
        //userid='437861175238066176';
        userid=window.myJS.getUserId();
        slhistory(sidePushId,PushId,pkUserId,userid);
        $.ajax({//获取对方名字和头像
            type: 'post',
            contentType: "application/json;charset=utf-8",
            url: 'http://101.201.146.79:8088/dts/challenge/userInfo?userId='+pkUserId,
            cache: false,
            dataType: 'jsonp',
            jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback: "success_jsonpCallback2",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data: {userId: sideuserid},
            success: function (msg) {
                siderheader_img=pdtp(msg.image);
                sidername=msg.nickname;
                //昵称
                $('.top-detail span').html(sidername);
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
    initWebConnect();
}
function initWebConnect(){
//	var msgWsUrl = data + userId+randomString(2);
    ws = new WebSocket("ws://101.201.146.79:8090/dts/websocket/message?pushid="+PushId);
//    alert(ws.readyState);//查看websocket当前状态
    ws.onopen = function() {
        // console.log("onopen");

    };
    ws.onmessage = function(e) {
        $('#div1').scrollTop( $('#div1')[0].scrollHeight);
        var estr= e.data;
        if(estr.trim()!=''){
            $(".chat-box").append('<li class="chat-list chat-left"><div class="chat-img"><img src='+siderheader_img+' alt=""/></div><div class="chat-text sj-left">'+AnalyticEmotion(e.data)+'<div class="triangle_border_left"><span></span></div></div></li>');
        }
    };
    ws.onclose = function() {
        // console.log("onclose");
        // removeNum();
    };
    ws.onerror = function(e) {
//        console.log(e);
    };
    $('#send').bind('click', function() {
        send();
        $('#div1').scrollTop( $('#div1')[0].scrollHeight);
    });
    function send(){
        $.ajax({
            type: 'post',
            contentType: "application/json;charset=utf-8",
            url: "http://101.201.146.79:8088/dts/challenge/auditing?userId=" + userid + "&message=" + obj+'&sidePushId='+sidePushId,
            cache: false,
            dataType: 'jsonp',
            jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback: "success_jsonpCallback1",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success: function (data) {
                if(obj.trim()!=''){
                    $(".chat-box").append('<li class="chat-list chat-list-ling"><div class="chat-img"><img src='+myheader_img+' alt=""/></div><div class="chat-text sj-right">' + obj + '<div class="triangle_border_right"><span></span></div></div></li>')
                    $("#message").val('');

                }
            }
        });
    }
    $(window).scroll(function () {
        $('.btn-bottom').css('bottom','0px');
        $('#emotions').hide();
    });
}
function slhistory(sidePushId,PushId,pkUserId,userid){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/getNoticeDetils?pushId='+sidePushId+'&pkUserId='+pkUserId+'&userId='+userid+'&sidePushId='+PushId+'&sign=1',
        //url : 'http://101.201.146.79:8088/dts/challenge/getNoticeDetils?pushId=100d8559094762fd345&pkUserId='+uid+'&userId=437858287103246336&sidePushId='+sidepushid+'&sign=1',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {pushId:'100d8559094762fd345',sign:2},
        success : function(msg){
            var dfhtml='<li class="chat-list chat-left"><div class="chat-img"><img src="http://101.201.146.79:8088/dts/image/default_head.png" alt=""></div><div class="chat-text sj-left"><span class="sj-con sjleft-con"></span><div class="triangle_border_left"><span></span></div></div></li>';
            var myhtml='<li class="chat-list chat-list-ling"><div class="chat-img"><img src="" alt=""></div><div class="chat-text sj-right"><span class="sj-con sjright-con"></span><div class="triangle_border_right"><span></span></div></div></li>';
            for(var i=0;i<msg.length;i++){
                msg[i].index=i;
                if(msg[i].userId==userid){
                    $('.chat-history').append(myhtml);
                }else{
                    $('.chat-history').append(dfhtml);
                }
                $('.main-time').eq(i).html(msg[i].sendTime);
                $('.chat-img img').eq(i).attr('src',pdtp(msg[i].image));
                $('.sj-con').eq(i).html(msg[i].content);
            }
            $('.chat-history').append('<div class="time-history"> <div class="history-tip">以上是历史信息</div> <div class="send-time"></div> </div>');
            if(msg!=''){
                $('.history-tip').show();
            }
            var date = new Date();
            var m;
            if (date.getMinutes() < 10) {
                m = '0' + date.getMinutes();
            } else {
                m = date.getMinutes();
            }
            date1=(date.getMonth() + 1) + '月' + date.getDate() + '日 ' + ' ' + date.getHours() + ':' + m;
            $('.send-time').html(date1);
            $(".main-box").scrollTop($('.main-box')[0].scrollHeight)
        },
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