$(document).ready(function(){
    alldz();comment1();
    // sl();
    // notice();
    $('.sl-btn').click(function(){
        if($('.sl-btn .circle').css('display')=='none'){
            sl();
        }else{
            slck();
        }
    });
    $('.notice-btn').click(function(){
        if($('.notice-btn .circle').css('display')=='none'){
            // notice();
        }else{
            noticeck();
        }
    });
    var i=GetQueryString('index');
    if(i){
        xxk(i);
        // notice();
    }else{
        xxk(0);
    }
    var index;
    $('.link-list').click(function () {
        index=$(this).index('.link-list');
        xxk(index);
    });
    function xxk(index){
        $('.link-list').removeClass('cur');
        $($('.link-list')[index]).addClass('cur');
        $('.main-box').hide();
        $($('.main-box')[index]).show();
    }
});
var bid;var slpushid;var uid;var dzarr=[];var myownid=localStorage.getItem("openId");
var pduserid="";
var pub_id;
var commentarr=[];
function comment1(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/comment/getCommentByUserId?userId='+myownid,
        //url : 'http://101.201.146.79:8088/dts/comment/getCommentByUserId?userId=437859186810814464',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {userId:'437800275063865344'},
        success : function(msg) {
            commentarr=[];
            //栽取新的数组
            for(var j=0;j<msg.length;j++){
                msg[j].index=j;
                if(msg[j].flag=='0'){
                    $('.comment-btn .circle').show();
                    $('.ywxg-btn .circle').show();
                    commentarr.push(msg[j]);
                }
                if(msg==''){
                    $('.pl-detail').html('<div class="no-ts">暂时没收到回复</div>');
                }
            }
            //展示页面
            $('.pl-detail').html(' ');
            if(commentarr.length==0){
                $('.pl-detail').html('<div class="no-ts">暂时没收到回复</div>');
            }
            var plhtml='<li class="detail-list pl-list"> <div class="icon-img"> <img src="" alt=""> </div> <div class="detail-text"> <div class="text-top"> <span></span>回复了你的话题 </div> <div class="text-time"></div> </div> </li>';
            for(var i=0;i<commentarr.length;i++){
                commentarr[i].index=i;
                $('.pl-detail').append(plhtml);
                $('.pl-list').eq(i).children('.icon-img').children('img').attr('src',pdtp(commentarr[i].image));
                $('.pl-list').eq(i).children('.detail-text').children('.text-top').children('span').html(commentarr[i].nickname);
                $('.pl-list').eq(i).children('.detail-text').children('.text-time').html(commentarr[i].commentTime);
                //点击每一个
                $('.pl-list').click(function () {
                    var index=$(this).index('.pl-list');
                    var pubid =commentarr[index].publishId;
                    pub_id=commentarr[index].id;
                    commentck(pub_id);
                    setTimeout(function(){
                        location.href='htnr.html?pubid='+pubid+'&page=1';
                    },100)
                })
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
// function notice(){
//     $.ajax({
//         type : 'post',
//         contentType : "application/json;charset=utf-8",
//         url : 'http://101.201.146.79:8088/dts/challenge/getNotice?pushId='+window.myJS.getPushId()+'&sign=2',
//         //url : 'http://101.201.146.79:8088/dts/challenge/getNotice?pushId=120c83f76024357e9a3&sign=2',
//         cache : false,
//         dataType : 'jsonp',
//         jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
//         //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
//         //data : {pushId:'100d8559094762fd345',sign:2},
//         success : function(msg) {
//             $('.notice-box .main-detail').html('');
//             var html='<li class="detail-list notice-list"> <div class="icon-img"> <img src="" alt=""/> </div> <div class="detail-text"> <div class="text-top"> <span>大卫</span>向你发起了挑战</div> <div class="text-time"></div> </div> <div class="tz-book"><a target="_top" href="">挑战书</a></div> </li>';
//             if(msg==' '){
//                 $('.notice-box .main-detail').html('<div class="no-ts">暂时没收到通知</div>');
//             }
//             for(var i=0;i<msg.length;i++){
//                 msg[i].index=i;
//                 $('.notice-box .main-detail').append(html);
//                 $('.notice-list').eq(i).children('.icon-img').children('img').attr('src',pdtp(msg[i].image));
//                 $('.notice-list').eq(i).children('.detail-text').children('.text-top').children('span').html(msg[i].nickname);
//                 $('.notice-list').eq(i).children('.detail-text').children('.text-time').html(msg[i].sendTime);
//                 $('.notice-list').eq(i).children('.tz-book').children('a').attr('href','../ltb/yzs.html'+msg[i].link+'&page=3');
//                 //通知
//                 if(msg[i].flag=='0'){
//                     $('.notice-btn .circle').show();
//                     $('.ywxg-btn .circle').show();
//                 }
//             }
//         },
//         error : function(XMLHttpRequest, textStatus, errorThrown) {
//             console.log(XMLHttpRequest.status + ' '
//             + XMLHttpRequest.readyState + ' ' + textStatus);
//         }
//     })
// }
function sl(){
    $.ajax({
        async:false,
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/getNotice?pushId=&sign=1',
        //url : 'http://101.201.146.79:8088/dts/challenge/getNotice?pushId=100d855909474ea9a1a&sign=1',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {pushId:'100d8559094762fd345',sign:1},
        success :function(msg){
            $('.chat-detail').html('');
            var html='<li class="detail-list chat-list"> <a href="javascript:;" target="_top"><div class="icon-img1"> <img src="" alt=""/> </div> <div class="detail-text"> <div class="text-top"> <div class="text-name"></div> <div class="text-time"></div> </div> <div class="text-detail"></div> </div></a></li>';
            if(msg==' '){
                $('.chat-detail').html('<div class="no-ts">暂时没收到聊天</div>');
            }
            for(var i=0;i<msg.length;i++){
                msg[i].index=i;
                $('.chat-detail').append(html);
                //显示内容
                $('.chat-list a').eq(i).children('.icon-img1').children('img').attr('src',pdtp(msg[i].image));
                $('.chat-list a').eq(i).children('.detail-text').children('.text-top').children('.text-name').html(msg[i].nickname);
                $('.chat-list a').eq(i).children('.detail-text').children('.text-top').children('.text-time').html(msg[i].sendTime);
                $('.text-detail').eq(i).html(msg[i].content);
                //通知
                if(msg[i].flag=='0'){
                    $('.sl-btn .circle').show();
                    $('.ywxg-btn .circle').show();
                }
                //点击每个进去
                $('.chat-list a').click(function(){
                    var index=$(this).index('.chat-list a');
                    uid=msg[index].userId;
                    xx(uid);
                    //setTimeout("location.href='sl.html?pushId=120c83f76024357e9a3&sidepushId='+$('#input_pushid').val()+'&userId=437859186810814464&pkUserId='+uid+'&uid='+uid+'&flag=0'",200);
                    if(uid == myownid){
                        return;
                    }
                    if($('#input_pushid').val() == window.myJS.getPushId())
            		{
                        $('.mask-box1').show();
                        $('.tip-hide').show();
                        setTimeout(function () {
                            $('.mask-box1').hide();
                            $('.tip-hide').hide();
                        },3000);
                        $('.mask-box1').click(function(){
                            $(this).hide();
                            $('.tip-hide').hide();
                        });
                		return;//tip:同一设备用户不能进行私聊
            		}
                    if(pduserid==1){
                        window.myJS.openLogin('xcq');
                    }else{
                     //私聊推送
                         $.ajax({
                         type : 'post',
                         contentType : "application/json;charset=utf-8",
                         url : 'http://101.201.146.79:8088/dts/challenge/sendPush?sidePushId='+$('#input_pushid').val()+'&userId='+myownid+'&pkUserId='+uid,
                         cache : false,
                         dataType : 'jsonp',
                         jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                         error : function(XMLHttpRequest, textStatus, errorThrown) {
                         console.log(XMLHttpRequest.status + ' '
                         + XMLHttpRequest.readyState + ' ' + textStatus);
                         }
                         });
                     setTimeout("location.href='sl.html?pushId='+window.myJS.getPushId()+'&sidepushId='+$('#input_pushid').val()+'&userId='+myownid+'&pkUserId='+uid+'&uid='+uid+'&flag=0&page=2'",200);
                    }
                });
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function delsl(id){
    console.log(id);
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/deleteNotice?id='+id+'&sign=1',
        //url : 'http://101.201.146.79:8088/dts/Like/updateFlag?userId=437859186810814464',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {userId:'437800275063865344'},
        success : function(msg) {},
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function alldz(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/Like/getIslikeById?userId='+myownid,
        //url : 'http://101.201.146.79:8088/dts/Like/getIslikeById?userId=437859186810814464',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {userId:'437800275063865344'},
        success : function(msg) {
            dzarr=[];
            for(var j=0;j<msg.length;j++){
                msg[j].index=j;
                if(msg[j].userId!=myownid&&msg[j].flag=='0'){
                    dzarr.push(msg[j]);
                    $('.ywxg-btn .circle').show();
                    $('.dz-btn .circle').show();
                }
                if(msg==''){
                    $('.dz-detail').html('<div class="no-ts">暂时没收到点赞</div>');
                }
            }
            $('.dz-detail').html('');
            if(dzarr.length==0){
                $('.dz-detail').html('<div class="no-ts">暂时没收到点赞</div>');
            }
            var dzhtml='<li class="detail-list dz-list"> <div class="icon-img"> <img src="../images/icon3.png" alt=""> </div> <div class="detail-text"> <div class="text-top"> <span>李雷</span>赞了你的话题 </div> <div class="text-time">2月11日8:45 </div> </div> </li>';
            var dzhtmlt='<li class="detail-list dz-list"> <div class="icon-img"> <img src="../images/icon3.png" alt=""> </div> <div class="detail-text"> <div class="text-top"><span>李雷</span>赞了你的话题 </div> <div class="detail-img"> <img src="../images/pic.jpg" alt=""> </div> <div class="text-time">2月11日8:45 </div></div> </li>';
            for(var i=0;i<dzarr.length;i++){
                dzarr[i].index=i;
                if(dzarr[i].images=''){
                 $('.dz-detail').append(dzhtml);
                 }else{
                 $('.dz-detail').append(dzhtmlt);
                 }

                 $('.icon-img').eq(i).children('img').attr('src',pdtp(dzarr[i].image));
                 $('.detail-text').eq(i).children('.text-top').children('span').html(dzarr[i].nickname);
                 $('.text-time').eq(i).html(dzarr[i].likeTime);
                 if(dzarr[i].images==''){
                 $('.detail-img').eq(i).hide();
                 }else{
                 $('.detail-img').eq(i).children('img').attr('src',dzarr[i].images)
                 }
                //点击每一个
                 $('.dz-list').click(function () {
                     var index=$(this).index('.dz-list');
                     var pubid=dzarr[index].publishId;
                     pub_id=dzarr[index].id;
                     dzck(pub_id);
                     setTimeout(function(){
                         location.href='htnr.html?pubid='+pubid+'&page=0';
                     },100);
                 })
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function dzck(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/Like/updateFlag?userId='+pub_id,
        //url : 'http://101.201.146.79:8088/dts/Like/updateFlag?userId=437859186810814464',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {userId:'437800275063865344'},
        success : function(msg) {
            $('.dz-btn .circle').hide();
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function commentck(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/comment/updateFlag?userId='+pub_id,
        //url : 'http://101.201.146.79:8088/dts/comment/updateFlag?userId=437859186810814464',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {userId:'437800275063865344'},
        success : function(msg) {
            $('.comment-btn .circle').hide();
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function slck(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/updateFlag?buserId='+window.myJS.getPushId()+'&sign=1',
        //url : 'http://101.201.146.79:8088/dts/challenge/updateFlag?buserId=100d855909474ea9a1a&sign=1',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {pushId:'100d8559094762fd345',sign:1},
        success : function(msg) {
            $('.sl-btn .circle').hide();
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function noticeck(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/updateFlag?buserId='+window.myJS.getPushId()+'&sign=2',
        //url : 'http://101.201.146.79:8088/dts/challenge/updateFlag?buserId=120c83f76024357e9a3&sign=2',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {pushId:'100d8559094762fd345',sign:2},
        success : function(msg){
            $('.notice-btn .circle').hide();
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}