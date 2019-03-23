$(document).ready(function () {
    $('.main-bg').click(function () {
        bjt();
    });
    /*$('.pydt-btn').click(function(){
        pyq();
    });*/
    pyq();
    //点个人的头像
    $('.my-img').click(function(){
        $(this).children('a').attr('href','grdt.html?userid='+myuserid);
    });
});
var myuserid=GetQueryString('userId');
if(myuserid){
    xx(myuserid)
}else{
    myuserid='422294912088670208';
    xx('422294912088670208');
}
//点赞
function eachdz(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/Like/updateLike',
        //cache : true,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        data : {userId:'422294912088670208',publishId:pubid},
        success : function(msg) {

        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
//评论
var islike=0,content,pubid,myid;
function comment(){
    content=$('.emotion').val();
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/comment/addComment',
        //cache : true,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        data : {userId:'422294912088670208',commentId:'',publishId:pubid,content:content,islike:islike},
        success : function(msg) {

        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
//查一条动态所有的点赞
function alldzcx(){
    $.ajax({
        async:false,
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/Like/getIslike',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback2",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        data:{publishId:pubid},
        success : function(msg) {
            for(var j=0;j<i;j++){

            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
}
//查一条动态的所有评论
function dzpl(){
    $.ajax({
        async:false,
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/comment/getCommentById',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback2",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        data:{publishId:pubid},
        success : function(msg) {
            alert('aaaaaaaaaaa')
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
}
//朋友动态
function pyq(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/publish/getPublish',
        //cache : true,
        dataType : 'jsonp',
        jsonp : "callbackparam",
        jsonpCallback : "success_jsonpCallback3",
        data : {},
        success : function(msg){
            var html='<li class="main-list"><div class="po-avt-wrap"> <img src="" alt=""> </div> <div class="po-cmt"> <div class="po-hd"> <p class="po-name"><span class="data-name"></span></p> <div class="post"> <p class="post-content"></p> <p class="post-img"></p> </div> <div class="other-list"> <p class="time"></p> <p class="address"></p> <div class="show-box"> <span class="show-img"> <img src="../images/show.png" alt=""> </span> <span class="show-text">展开</span> </div> <div class="comment-box"> <a class="zan-box" href="javascript:;"> <img class="zan" src="../images/zan1.png" alt=""> <span>赞</span> </a> <a class="pl-box" href="javascript:;"> <img class="pl" src="../images/pl.png" alt=""> <span>评论</span> </a> </div> </div> </div> <div class="hide-comment"> <div class="r"></div> <div class="cmt-wrap"> <div class="like"><img src="../images/xin.png"><span data-id='+myuserid+' id="my-id">'+myname+","+'</span></div></div><ul class="dao_subcontainer"><li class="cmt-list"> <p class="pl-con-box"><span class="dao_textarea_con"></span></p></li></ul> </div> </div> </li>';
            var html1='<img class="de-img" src="" alt=""/>'
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
                pubid=msg[i].id;
                var header = 'http://101.201.146.79:8088/dts/image/';
                msg[i].index = i;
                //一个动态所有的点赞
                alldzcx();
                $('.main-box-detail').append(html);
                //头像
                $('.main-list').eq(i).children('.po-avt-wrap').children('img').attr('src',pdtp(msg[i].image));
                //昵称
                $('.data-name').eq(i).html(msg[i].nickname);
                //内容
                $('.post-content').eq(i).html(msg[i].content);
                //内容有图片
                var detailimgs=msg[i].images;
                var deimgs=detailimgs.split(';');
                for(var j=0;j<deimgs.length;j++){
                    deimgs[j].index=j;
                    $('.post-img').eq(i).append(html1);
                    $('.post-img').eq(i).children('img').eq(j).attr('src',header+deimgs[j]);
                }
                //时间
                $('.time').eq(i).html(msg[i].sendTime);
                //地区
                $('.address').eq(i).html(msg[i].areas);
                //点击每个人的头像
                $('.main-list').eq(i).children('.po-avt-wrap').click(function(){
                    var index=$(this).index('.po-avt-wrap');
                    stopBubble(this.class);
                    location.href='grdt.html?userid='+msg[index].userId;
                });
                //点击每个人的昵称
                $('.main-list').eq(i).children('.po-cmt').children('.po-hd').children('.po-name').click(function(){
                    var index=$(this).index('.po-name');
                    stopBubble(this.class);
                    location.href='grdt.html?userid='+msg[index].userId;
                });
                //点击每个进入话题内容
                $('.main-list').live('click',function () {
                    location.href='htnr.html?pubid='+pubid;
                });
            }
            function daoTextarea(obj){
                var moreComment='<div class="comment-bottom"> <input class="emotion"/> <div class="comment-img" id="face"> <a href="javascript:;"> <img src="../images/bq.png" alt=""/> </a> </div> <div class="comment-btn" id="analytic"> <a href="javascript:;"> 发送 </a> </div> </div>';
                $(obj).append(moreComment);
                $('#face').click(function () {
                    $('.comment-bottom').css('bottom',150+'px');
                });
                $('.emotion').click(function(){
                    stopBubble(this.class);
                });
            }
            function daoTextcon(obj,val){
                var content='<li class="cmt-list"> <p class="pl-con-box"><span class="cmt-name my-name plr-name">学员2333：</span><span class="dao_textarea_con">'+obj+'</span></p></li>'
                $(val).append(content);
            }
            function daohuifu(val){
                var con='<p class="hf-conbox"> <span class="data-name my-hfname">激烈小丸子</span>回复 <span class="hf-name"></span> <i></i></p>'
                $(val).append(con);
            }
            var plcon='<li class="cmt-list"> <p class="pl-con-box"><span class="cmt-name">学员2333：</span><span class="dao_textarea_con"></span></p><p class="hf-conbox"> <span class="data-name">激烈小丸子</span>回复 <span class="hf-name"></span> <i></i></p></li>';
            $('.dao_subcontainer').html(plcon)
            //回复别人
            $('.cmt-list .pl-con-box').live('click',function () {
                var name=$(this).children('.cmt-name').html();
                var parent=$(this).parent('.cmt-list');
                daoTextarea(parent);
                $('.comment-bottom').css('width','100%').children('input').attr('placeholder','回复'+name);
                $('#face').SinaEmotion($('.emotion'));
                $('#analytic').removeClass('comment-btn').addClass('comment-btn1');
                return false;//阻止事件冒泡
            });
            //点击赞按钮
            var flag2=true;
            $('.zan-box').click(function(){
                eachdz();
                var zi=$(this).index('.zan-box');
                //$('.r').eq(zi).show();
                //$('.cmt-wrap').eq(zi).show();
                stopBubble(this.class);
                if(flag2){
                    alert('true');
                    $(this).children('span').html('取消');
                    islike=1;
                    $('#my-id').show();
                    flag2=false;
                }else{
                    alert('false');
                    $(this).children('span').html('赞');
                    islike=0;
                    $('#my-id').hide();
                    flag2=true;
                }
            });
            //点击评论按钮
            $(".pl-box").click(function(){
                dzpl();
                stopBubble(this.class);
                var parent=$(this).parents('.main-list');
                daoTextarea(parent);
                $('.comment-bottom').css('width','100%');
                $('#face').SinaEmotion($('.emotion'));
            });
            //点击发送按钮
            $('.comment-btn').live('click',function(){
                comment();
                var objs=$(".emotion").val(); //输入内容
                var obj=AnalyticEmotion(objs);
                var va=$(this).parent().prev().children('.hide-comment').children('.dao_subcontainer');
                if(objs.replace(/\s+/g,"")!=''){
                    daoTextcon(obj,va);
                    $('.emotion').val('');//清空内容
                    $(this).parent().remove();
                }
                $('.my-name').html(myname+':');
                return false;//阻止事件冒泡
            });
            //回复别人点击发送按钮
            $('.comment-btn1').live('click',function(){
                var par=$(this).parent('.comment-bottom').parent('.cmt-list');
                var name=par.children('.pl-con-box').children('.cmt-name').html();
                var objs=$(".emotion").val(); //输入内容
                var obj=AnalyticEmotion(objs);
                if(objs.replace(/\s+/g,"")!=''){
                    daohuifu(par);
                    $('.my-hfname').html(myname);
                    par.children('.hf-conbox').children('.hf-name').html(name);
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
            for(var k=0;k<2;k++){
                flag1[k]=true;
            }
            $('.show-box').click(function () {
                stopBubble(this.class);
                var index=$(this).parents('.main-list').index();
                console.log(flag1[index])
                if(flag1[index]){
                    $(this).children('.show-img').children('img').css('-webkit-transform','rotate(180deg)');
                    $(this).children('.show-text').html('收起');
                    $(this).parents('.po-hd').next('.hide-comment').hide();
                    flag1[index]=false;
                }else{
                    $(this).children('.show-img').children('img').css('-webkit-transform','rotate(0deg)');
                    $(this).children('.show-text').html('展开');
                    $(this).parents('.po-hd').next('.hide-comment').show();
                    flag1[index]=true;
                }
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}


