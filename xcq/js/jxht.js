var currentNum=1;
//判断是否到底部
$(window).scroll(function () {
    if($(document).scrollTop()==0){
        $('#download').show().css('margin-top','.3rem');
        location.href=location.href;
    }
    if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
        //$('#upload').show();
        currentNum++;
        $('.main-box-detail').append(jxht(currentNum));
    }
});
jxht(currentNum);

var jsonStrUser = localStorage.getItem("wx_user")
var jsonUser = JSON.parse(jsonStrUser);

var myuserid=GetQueryString('userId');
var myname1=jsonUser.nickname;
//var myname1='krystal Jamie';
var pduserid=localStorage.getItem("openId");
var content,pubid,buserId,myid,plindex,flag2=[];
//点赞
function eachdz(pid){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        //url : 'http://101.201.146.79:8088/dts/Like/updateLike?userId=437858287103246336&publishId='+pid,
        url : 'http://101.201.146.79:8088/dts/Like/updateLike?userId='+window.myJS.getUserId()+'&publishId='+pid,
        //cache : true,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback5",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {userId:'437868609583185920',publishId:pid},
        success : function(msg) {},
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
//取消点赞
function qxdz(pid,obj){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/Like/deleteIslike?userId='+window.myJS.getUserId()+'&publishId='+pid,
        //url : 'http://101.201.146.79:8088/dts/Like/deleteIslike?userId=437858287103246336&publishId='+pid,
        //cache : true,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback6",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {userId:'437868609583185920',publishId:pid},
        success : function(msg) {
            if(obj.siblings('.dz-all').html()==""){
                obj.parent().parent().parent().hide();
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
//查一条动态 所有的点赞
function alldzcx(dzindex,pid){
    $.ajax({
        async:false,
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/Like/getIslike?publishId='+pid,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback3",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data:{publishId:pid},
        success : function(msg) {
            //点赞如果没人的话
            if(msg.length==0){
                $('.zan-all-box').eq(dzindex+(currentNum-1)*5).hide();
                $('.zan-box').eq(dzindex+(currentNum-1)*5).click(function(){
                    if(window.myJS.getIsGuest()==1){
                    	stopBubble(this.class);
                        window.myJS.openLogin('xcq');
                    }else{
                        $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').show();
                        $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').children('.cmt-wrap').children('.like').children('.zan-id').show().html(myname1);
                    }
                    /* $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').show();
                     $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').children('.cmt-wrap').children('.like').children('.zan-id').show().html(myname1);*/
                })
            }
            for(var j=0;j<msg.length;j++){
                msg[j].index=j;
                if($('.main-list').eq(dzindex+(currentNum-1)*5).attr('pushid-cur')==pid){
                    if(msg.length==1||j==msg.length-1){
                        $('.main-list').eq(dzindex+(currentNum-1)*5).find('.dz-all').append(msg[j].nickname);
                    }else{
                        $('.main-list').eq(dzindex+(currentNum-1)*5).find('.dz-all').append(msg[j].nickname+',');
                    }
                }
                if(msg[j].userId==window.myJS.getUserId()){
                    $('.main-list').eq(dzindex+(currentNum-1)*5).find('.zan-box').children('span').html('取消');
                    flag2[dzindex+(currentNum-1)*5]=false;
                    $('.main-list').eq(dzindex+(currentNum-1)*5).find('.zan-box').click(function(){
                        //alldzcx();
                        if(window.myJS.getIsGuest()==1){
                        	stopBubble(this.class);
                            window.myJS.openLogin('xcq');
                        }else{
                            var zall=$(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').find('.dz-all').html();
                            var zarr=zall.split(',');
                            if(zarr.length==1&&zarr[0]==myname1){
                                zall=='';
                            }
                            if($(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').find('.dz-all').html()==''){
                                $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').show();
                                $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').children('.cmt-wrap').children('.like').children('.zan-id').show().html(myname1);
                            }
                            for(var j=0;j<zarr.length;j++){
                                if(zarr[j]==myname1){
                                    zarr.splice(j,1);
                                    var newarr=zarr.join();
                                    $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').find('.zan-id').hide();
                                    $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').find('.dz-all').html(newarr);
                                }
                            }
                        }
                        /*var zall=$(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').find('.dz-all').html();
                         var zarr=zall.split(',');
                         if(zarr.length==1&&zarr[0]==myname1){
                         zall=='';
                         }
                         if($(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').find('.dz-all').html()==''){
                         $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').show();
                         $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').children('.cmt-wrap').children('.like').children('.zan-id').show().html(myname1);
                         }
                         for(var j=0;j<zarr.length;j++){
                         if(zarr[j]==myname1){
                         zarr.splice(j,1);
                         var newarr=zarr.join();
                         $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').find('.zan-id').hide();
                         $(this).parents('.po-hd').siblings('.hide-comment').children('.zan-all-box').find('.dz-all').html(newarr);
                         }
                         }*/
                    })
                }
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
}
//查一条动态的所有评论
function dzpl(plin,pid){
    $.ajax({
        //async:false,
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/comment/getCommentById?publishId='+pid,
        //cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback2",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data:{publishId:pid},
        success : function(msg){
            //console.log(num);
            for(k=0;k<msg.length;k++){
                msg[k].index=k;
                $('.dao_subcontainer').eq(plin+(currentNum-1)*5).append('<li class="cmt-list"><div class="pl-all-box"><p class="pl-con-box"><span class="cmt-name plcmt-name"></span><span class="dao_textarea_con"></span></p></div></li>');
                $('.dao_subcontainer').eq(plin+(currentNum-1)*5).find('.pl-all-box').eq(k).addClass('pl-allcon'+plin).attr('data-id',msg[k].userId);
                if(msg[k].buserId==''||msg[k].bnickname==''){
                    $('.dao_subcontainer').eq(plin+(currentNum-1)*5).find('.plcmt-name').eq(k).html(msg[k].nickname+':');
                    $('.dao_subcontainer').eq(plin+(currentNum-1)*5).find(('.dao_textarea_con')).eq(k).html(AnalyticEmotion(msg[k].content));
                }else{
                    if(msg[k].bnickname!=msg[k].nickname){
                        $('.dao_subcontainer').eq(plin+(currentNum-1)*5).find(('.pl-all-box')).eq(k).append('<p class="hf-conbox"> <span class="cmt-name my-hfname">'+msg[k].nickname+'</span>回复 <span class="hf-name">'+msg[k].bnickname+':'+'</span> <i class="hf-detail-con">'+AnalyticEmotion(msg[k].content)+'</i></p>');
                    }
                }
                if($('.dao_subcontainer').eq(plin+(currentNum-1)*5).find('.dao_textarea_con').eq(k).html()==''){
                    $('.dao_subcontainer').eq(plin+(currentNum-1)*5).find('.pl-con-box').eq(k).hide();
                }
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
}
//评论
function comment(pid){
    content=AnalyticEmotion($('.emotion').val());
    if(content!=''){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/comment/addComment?userId='+window.myJS.getUserId()+'&buserId='+buserId+'&publishId='+pid+'&content='+content,
            //url : 'http://101.201.146.79:8088/dts/comment/addComment?userId=437858287103246336&buserId='+buserId+'&publishId='+pid+'&content='+content,
            //cache : true,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback : "success_jsonpCallback4",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data : {userId:'437868609583185920',buserId:buserId,publishId:pid,content:content},
            success : function(msg) {},
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
}
//朋友动态
function jxht(currentNum){
    $.ajax({
        //async:false,
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url:'http://101.201.146.79:8088/dts/publish/getPublishByFlag?flag=1&currentNum='+currentNum+'&count=5',
        //cache : true,
        dataType : 'jsonp',
        jsonp : "callbackparam",
        //jsonpCallback : "success_jsonpCallback",
        data : {},
        success : function(msg){
            var html='<li class="main-list"><div class="po-avt-wrap"> <img src="" alt=""> </div> <div class="po-cmt"> <div class="po-hd"> <p class="po-name"><span class="datapo-name"></span></p> <div class="post"> <p class="post-content"></p> <p class="post-img"></p> </div> <div class="other-list"> <p class="time"></p> <p class="address"></p> <div class="show-box"> <span class="show-img"> <img src="../images/show1.png" alt=""> </span> <span class="show-text">收起</span> </div> <div class="comment-box"> <a class="zan-box" href="javascript:;"> <img class="zan" src="../images/zan1.png" alt=""> <span>赞</span> </a> <a class="pl-box" href="javascript:;"> <img class="pl" src="../images/pl.png" alt=""> <span>评论</span> </a> </div> </div> </div> <div class="hide-comment"><div class="zan-all-box"><div class="r"></div> <div class="cmt-wrap"> <div class="like"><img src="../images/xin.png"><span class="dz-all"></span><span data-id='+myuserid+' id="my-id" class="zan-id">'+","+myname1+'</span></div></div></div><ul class="dao_subcontainer"></ul></div> </div> </li>';
            var html1='<img class="de-img" src="" alt=""/>'
            if(msg==''){
                $('#upload').html('暂无数据');
            }
            //阻止事件冒泡
            function stopBubble(e) {
                if (e && e.stopPropagation) {//非IE浏览器
                    e.stopPropagation();
                }
                else {//IE浏览器
                    window.event.cancelBubble = true;
                }
            }
            //页面展示
            for(i=0;i<msg.length;i++){
                var header = 'http://101.201.146.79:8088/dts/bgImage/';
                msg[i].index = i;
                $('.main-box-detail').append(html);
                pubid=msg[i].id;
                $('.main-list').eq(i+(currentNum-1)*5).attr('pushid-cur',pubid);
                //一个动态所有的评论
                dzpl(i,pubid);
                //头像
                $('.main-list').eq(i+(currentNum-1)*5).children('.po-avt-wrap').children('img').attr('src',pdtp(msg[i].image));
                //昵称
                $('.datapo-name').eq(i+(currentNum-1)*5).html(msg[i].nickname);
                //内容
                $('.post-content').eq(i+(currentNum-1)*5).html(msg[i].content);
                //内容有图片
                var detailimgs=msg[i].images;
                if(detailimgs!=''){
                    var deimgs=detailimgs.split(',');
                    for(var j=0;j<deimgs.length;j++){
                        deimgs[j].index=j;
                        if(deimgs[j]!='null'){
                            $('.post-img').eq(i+(currentNum-1)*5).append(html1);
                            if(deimgs.length==1){
                                $('.post-img').eq(i+(currentNum-1)*5).children('img').addClass('de-img-one');
                            }
                            $('.post-img').eq(i+(currentNum-1)*5).children('img').eq(j).attr('src',header+deimgs[j]);
                        }
                    }
                }
                var scolltop;
                $(window).scroll(function(){
                   scolltop=$(document).scrollTop();
                    $('.bigimg-box img').hide();
                    $('.bigimg-box').hide();
                });
                //点击查看大图
                $('.de-img').click(function(){
                    stopBubble(this.class);
                    var imgsrc=$(this).attr('src');
                    $('.bigimg-box').show().css('top',scolltop);
                    $('.bigimg-box').html('<img src='+imgsrc+' alt="">');
                });
                $('.bigimg-box').click(function () {
                    $('.bigimg-box img').hide();
                    $(this).hide();
                });
                //时间
                var sendtime=msg[i].sendTime;
                var newmouth=sendtime.substring(5,7);
                var newmouth1;
                if(newmouth.substring(0,1)==0){
                    newmouth1=newmouth.substring(1,2);
                }else{
                    newmouth1=newmouth;
                }
                var newday=sendtime.substring(8,10);
                var newday1;
                if(newday.substring(0,1)==0){
                    newday1=newday.substring(1,2);
                }else{
                    newday1=newday;
                }
                var newmin=sendtime.substring(11,16);
                var newtime=newmouth1+'月'+newday1+'日'+newmin;
                $('.time').eq(i+(currentNum-1)*5).html(newtime);
                //地区
                $('.address').eq(i+(currentNum-1)*5).html(msg[i].areas);
                //点击每个人的头像
                $('.main-list').eq(i+(currentNum-1)*5).children('.po-avt-wrap').click(function(){
                    var index=$(this).index('.po-avt-wrap');
                    stopBubble(this.class);
                    location.href='grdt.html?userid='+msg[index-(currentNum-1)*5].userId;
                });
                //点击每个人的昵称
                $('.main-list').eq(i+(currentNum-1)*5).children('.po-cmt').children('.po-hd').children('.po-name').click(function(){
                    var index=$(this).index('.po-name');
                    stopBubble(this.class);
                    location.href='grdt.html?userid='+msg[index-(currentNum-1)*5].userId;
                });
                //点击每个进入话题内容
                $('.main-list').live('click',function () {
                    var pushidc=$(this).attr('pushid-cur');
                    location.href='htnr.html?pubid='+pushidc;
                });
                //flag2
                flag2[i+(currentNum-1)*5]=true;
                //一个动态所有的点赞
                alldzcx(i,pubid);
                //点击赞按钮
                $('.zan-box').eq(i+(currentNum-1)*5).click(function(){
                    if(window.myJS.getIsGuest()==1){
                    	stopBubble(this.class);
                        window.myJS.openLogin('xcq');
                    }else{
                        var zi=$(this).index('.zan-box');
                        stopBubble(this.class);
                        var zi1=zi%5;
                        if(zi1>=0){
                            zi1=parseInt(zi/5)+1;
                        }
                        var pubid1=msg[zi-(zi1-1)*5].id;
                        if(flag2[zi]){
                            eachdz(pubid1);
                            $(this).children('span').html('取消');
                            console.log($('.zan-id').eq(zi))
                            $('.zan-id').eq(zi).show();
                            flag2[zi]=false;
                        }else{
                            qxdz(pubid1,$('.zan-id').eq(zi));
                            $(this).children('span').html('赞');
                            $('.zan-id').eq(zi).hide();
                            flag2[zi]=true;
                        }
                    }
                });
                //点击评论按钮
                $(".pl-box").eq(i+(currentNum-1)*5).click(function(){
                    if(window.myJS.getIsGuest()==1){
                    	stopBubble(this.class);
                        window.myJS.openLogin('xcq');
                    }else{
                        stopBubble(this.class);
                        var parent=$(this).parents('.main-list');
                        daoTextarea(parent);
                        $('.comment-bottom').css('width','100%');
                        $('#face').SinaEmotion($('.emotion'));
                    }
                });
            }
            //评论
            function daoTextarea(obj){
                var moreComment='<div class="comment-bottom"> <input class="emotion" maxlength="200"/> <div class="comment-img" id="face"> <a href="javascript:;"> <img src="../images/bq.png" alt=""/> </a> </div> <div class="comment-btn" id="analytic"> <a href="javascript:;"> 发送 </a> </div> </div>';
                $(obj).append(moreComment);
                $('.comment-img').click(function () {
                    stopBubble(this.class);
                    $('.comment-bottom').css('bottom',150+'px');
                    return false;
                });
                $('.emotion').click(function(){
                    stopBubble(this.class);
                });
            }
            function daoTextcon(obj,val){
                var content='<li class="cmt-list"><div class="pl-all-box"><p class="pl-con-box"><span class="cmt-name my-name plr-name"></span><span class="dao_textarea_con">'+obj+'</span></p></div></li>'
                $(val).append(content);
            }
            function daohuifu(val){
                var con='<p class="hf-conbox"> <span class="data-name cmt-name"></span>回复 <span class="hf-name"></span> <i></i></p>'
                $(val).append(con);
            }
            //点击发送按钮
            $('.comment-btn').live('click',function(){
                var comparent=$(this).parents('.comment-bottom').parents('.main-list');
                var coindex=comparent.index();
                var pubid2=comparent.attr('pushid-cur');
                var objs=$(".emotion").val(); //输入内容
                var obj=AnalyticEmotion(objs);
                var va=$(this).parent().siblings('.po-cmt').children('.hide-comment').children('.dao_subcontainer');
                if(objs.replace(/\s+/g,"")!=''){
                    comment(pubid2);
                    daoTextcon(obj,va);
                    $('.emotion').val('');//清空内容
                    $(this).parent().remove();
                }
                $('.my-name').html(myname1+':');
                return false;//阻止事件冒泡
            });
            //回复别人
            $('.cmt-list .pl-all-box').live('click',function (event) {
                if(window.myJS.getIsGuest()==1){
                	stopBubble(this.class);
                    window.myJS.openLogin('xcq');
                }else{
                    event.stopPropagation();
                    stopBubble(this.class);
                    var name,name1;
                    buserId=$(this).attr('data-id');
                    var dtindex=$(this).parents('.main-list').index();
                    var dtindex1=dtindex%5;
                    if(dtindex1>=0){
                        dtindex1=parseInt(dtindex/5)+1;
                    }
                    if($(this).find('.hf-conbox').length!=0){
                        name=$(this).children('.hf-conbox:last').children('.cmt-name').html();
                        name1=name;
                    }else{
                        name=$(this).children('.pl-con-box').children('.cmt-name').html();
                        name1=name.substring(0,name.length-1);
                    }
                    var parent=$(this).parent('.cmt-list');
                    if(myname1!=name1&&dtindex1==currentNum){
                        //dzpl(dtindex,plid,plindex);
                        daoTextarea(parent);
                        $('.comment-bottom').css('width','100%').children('input').attr('placeholder','回复'+name1);
                    }
                    $('#face').SinaEmotion($('.emotion'));
                    $('#analytic').removeClass('comment-btn').addClass('comment-btn1');
                    return false;//阻止事件冒泡
                }
            });
            //回复别人点击发送按钮
            $('.comment-btn1').live('click',function(){
                var name,name1;
                var comparent1=$(this).parents('.comment-bottom').parents('.main-list');
                var coindex1=$(comparent1).index();
                var pubid3=comparent1.attr('pushid-cur');
                var par=$(this).parent('.comment-bottom').parent('.cmt-list').children('.pl-all-box');
                console.log(par);
                if(par.find('.hf-conbox').length!=0){
                    name=par.children('.hf-conbox').children('.cmt-name').html();
                    name1=name;
                }else{
                    name=par.children('.pl-con-box').children('.cmt-name').html();
                    name1=name.substring(0,name.length-1);
                }
                var objs=$(".emotion").val(); //输入内容
                var obj=AnalyticEmotion(objs);
                if(objs.replace(/\s+/g,"")!=''){
                    comment(pubid3);
                    //dzpl(coindex1,pubid3,plindex);
                    daohuifu(par);
                    buserId=' ';
                    $('.data-name').html(myname1);
                    par.children('.hf-conbox:last').find('.hf-name').html(name1+":");
                    var va=par.children('.hf-conbox').last().children('i');
                    va.html(obj);
                    $('.emotion').val('');//清空内容
                    $(this).parent().remove();
                }else{
                    return false
                }
                return false;//阻止事件冒泡
            });
            //表情超过滚动条
            $(window).scroll(function () {
                $('.comment-bottom').remove();
                $('#emotions').hide();
            });
            //学车圈展开收起
            var flag1=[];
            for(var k=0;k<msg.length;k++){
                flag1[k]=true;
            }
            //$('.hide-comment').hide();
            $('.show-box').click(function(){
                stopBubble(this.class);
                var index=$(this).parents('.main-list').index();
                var currentNum1=index%5;
                if(currentNum1>=0){
                    currentNum1=parseInt(index/5)+1;
                }
                if(flag1[index-(currentNum1-1)*5]){
                    $(this).children('.show-img').children('img').css('-webkit-transform','rotate(180deg)');
                    $(this).children('.show-text').html('展开');
                    $(this).parents('.po-hd').next('.hide-comment').hide();
                    flag1[index-(currentNum1-1)*5]=false;
                }else{
                    $(this).children('.show-img').children('img').css('-webkit-transform','rotate(0deg)');
                    $(this).children('.show-text').html('收起');
                    $(this).parents('.po-hd').next('.hide-comment').show();
                    flag1[index-(currentNum1-1)*5]=true;
                }
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}