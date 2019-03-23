$(document).ready(function(){
    nicklist();
    function nicklist() {
        var src,pduserid=window.myJS.getIsGuest();
        var userid = GetQueryString("userid");
        var userscore=GetQueryString('score');
        var usertime=GetQueryString('time');
        var pushid=GetQueryString('pushid');
        if (userid != null && userid.toString().length > 1) {
            $.ajax({
                type : 'post',
                contentType : "application/json",
                url : 'http://101.201.146.79:8088/dts/examRecord/userInfo?userId='+userid,
                dataType : 'jsonp',
                /*data : {
                 userId :userid
                 },*/
                jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                success : function(msg) {
                    var header = 'http://101.201.146.79:8088/dts/image/';
                    for(var i=0;i<msg.length;i++){
                        //图片
                        $('.icon-img').eq(i).children('img').attr('src',pdtp(msg[i].image));
                        //姓名
                        $('.icon-name').eq(i).html(msg[i].nickname);
                        //区域
                        if (msg[i].area == '') {
                            $('.area-name').eq(i).html(' ');
                        } else {
                            $('.area-name').eq(i).html(msg[i].area);
                        }
                        //报考类型
                        if (msg[i].vehicleTypeId== '') {
                            $('.jz-type').html(' ');
                        } else {
                            $('.jz-type').html(' ');
                        }
                        //学车状态
                        if (msg[i].status== '') {
                            $('.state-type').html(' ');
                        } else {
                            $('.state-type').html(msg[i].status);
                        }
                        //学车圈
                        $('.xcq-link').children('a').attr('href','../xcq/grdt.html?userid='+userid)
                    }
                    src=$('.icon-img img').attr('src');
                    $('#sl-btn').click(function () {
                        if(userid == window.myJS.getUserId())
                        {
                            return;
                        }
                        if(pushid == window.myJS.getPushId())
                        {
                            $('.mask-hide').show();
                            $('.tip-hide').show();
                            setTimeout(function () {
                                $('.mask-hide').hide();
                                $('.tip-hide').hide();
                            },3000);
                            $('.mask-hide').click(function () {
                                $(this).hide();
                                $('.tip-hide').hide();
                            });
                            return;//tip:同一设备用户不能进行私聊
                        }
                        if(pduserid==1){
                        	 if(getQueryString('source')){
                                 window.myJS.openLogin('xcq');
                             }else{
                                 window.myJS.openLogin('ltb');
                             }
                        }else{
                            //私聊推送
                            $.ajax({
                                type : 'post',
                                contentType : "application/json;charset=utf-8",
                                url : 'http://101.201.146.79:8088/dts/challenge/sendPush?sidePushId='+pushid+'&userId='+window.myJS.getUserId()+'&pkUserId='+userid,
                                //url : 'http://101.201.146.79:8088/dts/challenge/sendPush?sidePushId=120c83f76024357e9a3&userId=437858287103246336',
                                cache : false,
                                dataType : 'jsonp',
                                jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                                error : function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log(XMLHttpRequest.status + ' '
                                    + XMLHttpRequest.readyState + ' ' + textStatus);
                                }
                            });
                            $(this).children('a').attr('href','../xcq/sl.html?pushId='+window.myJS.getPushId()+'&sidepushId='+pushid+'&userId='+window.myJS.getUserId()+'&pkUserId='+userid+'&flag=0');
                            /*$(this).children('a').attr('href','../xcq/sl.html?pushId=100d855909474ea9a1a&sidepushId='+pushid+'&flag=0')*/
                        }
                    });
                    $('#tz-btn a').click(function(){
                        var subjectType;
                        if(userid == window.myJS.getUserId())
                        {
                            return;
                        }
                        if(pushid == window.myJS.getPushId())
                        {
                            $('.mask-hide').show();
                            $('.tip-hide').show();
                            setTimeout(function () {
                                $('.mask-hide').hide();
                                $('.tip-hide').hide();
                            },3000);
                            $('.mask-hide').click(function () {
                                $(this).hide();
                                $('.tip-hide').hide();
                            });
                            return;//tip:同一设备用户不能进行约战
                        }
                        if(pduserid==1){
                        	 if(getQueryString('source')){
                                 window.myJS.openLogin('xcq');
                             }else{
                                 window.myJS.openLogin('ltb');
                             }
                        }else{
                             if(getQueryString('source')){
                                $('.mask-hide').show();
                                $('.chose-km').show();
                                $('.chose-list-btn').click(function(){
                                    subjectType=$(this).html();
                                    $('.mask-hide').hide();
                                    $('.chose-km').hide();
                                    location.href='tz.html?userid='+userid+'&pkScore='+userscore+'&pkTime='+usertime+'&subjectType='+subjectType;
                                });
                            }else{
                                $(this).attr('href','tz.html?userid='+userid+'&pkScore='+userscore+'&pkTime='+usertime);
                            }
                        }
                    })
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status + ' '
                    + XMLHttpRequest.readyState + ' ' + textStatus);
                }
            });
        }
    }
});