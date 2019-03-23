$(function(){
    var sideuserid;var userid;
    var flag=GetQueryString('flag');
    /*var src=GetQueryString('img');
    var src1=GetQueryString('img1');*/
    yhxx();
    //sideyhxx();
    if(flag==0){
        alert(1);
        sideuserid=GetQueryString('sideUserId');
        userid=GetQueryString('userid');
        //$('.chat-left .chat-img img').attr('src',src);
        //$('.chat-list-ling .chat-img img').attr('src',src1);
        $('.sj-right .chat-text-detail').html(message)
    }
    if(flag==1){
        alert(2);
        userid=GetQueryString('sideUserId');
        sideuserid=GetQueryString('userid');
        //$('.chat-left .chat-img img').attr('src',src1);
        //$('.chat-list-ling .chat-img img').attr('src',src);
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
        $("#tou").html("链接服务器成功!");
    };
    websocket.onmessage = function (evnt) {
        alert(evnt.data)
        $('.sj-left .chat-text-detail').html(evnt.data);
        //$("#msg").html($("#msg").html() + "<br/>" + evnt.data);
    };
    websocket.onerror = function (evnt) {
    };
    websocket.onclose = function (evnt) {
        $("#tou").html("与服务器断开了链接!")
    }
    $('#send').bind('click', function() {
        send();
    });
    function yhxx(){
        console.log(userid)
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/challenge/userInfo',
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            data : {userId:userid},
            success : function(msg) {
                ('.chat-left .chat-img img').attr('src',msg.image);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
    function sideyhxx(){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/challenge/userInfo',
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            data : {userId:sideuserid},
            success : function(msg) {
                ('.chat-list-ling .chat-img img').attr('src',msg.image);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
    function send(){
        var message = document.getElementById('message').value;
        if (websocket != null) {
            $.ajax({
                type:'post',
                contentType: "application/json",
                url:"http://101.201.146.79:8088/dts/challenge/auditing?userId="+sideuserid+"&message="+message,
                cache : false,
                dataType : 'jsonp',
                jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
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
    