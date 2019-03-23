$(document).ready(function () {

    



    //返回
    $('.page-return').click(function () {
        var pagenume=getQueryString('page');
        // if(pagenume&&getQueryString('page')==pagenume){
        //     location.href='ywxg.html?index='+pagenume;
        // }else{
            window.history.back();
        // }
    });
    eachpyq();
    $('.report-fsbtn').click(function(){
        var type=$('.cur').html();
        var pubid=GetQueryString('pubid');
        $(this).children('a').attr('href','../xcq/jb.html?type='+type+'&pubid='+pubid);
    });
    var winurl=location.href;
    $('.share-btn').click(function () {
        if(winurl.indexOf('htnr')>0){
            newurl=winurl.replace('htnr','htnrshare');
        }
        window.myJS.shareTopic(newurl);
    })
});

var jsonStrUser = localStorage.getItem("wx_user")
var jsonUser = JSON.parse(jsonStrUser);

var pubid=GetQueryString('pubid');
var buserId,plindex;var flag2=true;
xx(localStorage.getItem("openId"));
var myname1=jsonUser.nickname;
//点赞
function eachdz(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/Like/updateLike?userId='+localStorage.getItem("openId")+'&publishId='+pubid,
        //cache : true,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback5",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {userId:'437800275063865344',publishId:pubid},
        success : function(msg) {},
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
//取消点赞
function qxdz(obj){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/Like/deleteIslike?userId='+localStorage.getItem("openId")+'&publishId='+pubid,
        //cache : true,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback6",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {userId:'437800275063865344',publishId:pubid},
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
//查一条动态所有的点赞
function alldzcx(){
    $.ajax({
        async:false,
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/Like/getIslike?publishId='+pubid,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback3",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data:{publishId:pubid},
        success : function(msg) {
            //点赞如果没人的话
            if(msg.length==0){
                $('#my-id').html(myname1);
                $('.zan-all-box').hide();
                $('.zan-box').click(function(){
                    if(window.myJS.getIsGuest()==1){
                        window.myJS.openLogin('xcq');
                    }else{
                        $('.zan-all-box').show();
                    }
                })
            }
            for(var j=0;j<msg.length;j++){
                msg[j].index=j;
                if(msg.length==1||j==msg.length-1){
                    $('.dz-all').append(msg[j].nickname);
                }else{
                    $('.dz-all').append(msg[j].nickname+',');
                }
                if(msg[j].userId==localStorage.getItem("openId")){
                    $('.zan-box').children('span').html('取消');
                    flag2=false;
                    $('.zan-box').click(function (){
                        if(window.myJS.getIsGuest()==1){
                            window.myJS.openLogin('xcq');
                        }else{
                            var zall=$('.dz-all').html();
                            var zarr=zall.split(',');
                            if(zarr.length==1){
                                $('.main-list').find('.dz-all').html('');
                                $('#my-id').html(myname1);
                                $('.main-list').find('.zan-all-box').show();
                            }
                            for(var j=0;j<zarr.length;j++){
                                if(zarr[j]==myname1){
                                    zarr.splice(j,1);
                                    var newarr=zarr.join();
                                    $('.dz-all').html(newarr);
                                }
                            }
                        }
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
function dzpl(){
    $.ajax({
        //async:false,
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/comment/getCommentById?publishId='+pubid,
        //cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback2",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data:{publishId:pubid},
        success : function(msg) {
            //$('.dao_subcontainer').html('');
            //console.log(num);
            for(k=0;k<msg.length;k++){
                msg[k].index=k;
                $('.dao_subcontainer').append('<li class="cmt-list"><div class="pl-all-box"><p class="pl-con-box"><span class="cmt-name plcmt-name"></span><span class="dao_textarea_con"></span></p></div></li>')
   
                $('.pl-all-box').eq(k).attr('data-id',msg[k].userId);
                if(msg[k].buserId==''||msg[k].bnickname==''){
                    $('.plcmt-name').eq(k).html(msg[k].nickname+':');
                    $('.dao_textarea_con').eq(k).html(emojiStr(msg[k].content));
                    console.log(msg[k].content)
                }else{
                    if(msg[k].bnickname!=msg[k].nickname){
                        $('.pl-all-box').eq(k).append('<p class="hf-conbox"> <span class="my-hfname cmt-name">'+msg[k].nickname+'</span>回复 <span class="hf-name">'+msg[k].bnickname+':'+'</span> <i class="hf-detail-con">'+AnalyticEmotion(msg[k].content)+'</i></p>');
                    }
                }
                if($('.dao_textarea_con').eq(k).html()==''){
                    $('.pl-con-box').eq(k).hide();
                }
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
}
//评论 回复保存信息

function comment(){
    content=$('.emotion').html();
    for(var i = 0; i < 36; i++){
        var n = "0";
        if(i < 9){
            n = "00";
        }else{
            n = "0";
        }
        content = content.replace('<img src="http://101.201.146.79:8088/emoji/f'+n+(i+1)+'.png">',emoji["f"+n+(i+1)]);
        console.log(content)
    }
    
    if(content!=''||content!=null){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/comment/addComment?userId='+localStorage.getItem("openId")+'&buserId='+buserId+'&publishId='+pubid+'&content='+content,
            //cache : true,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback : "success_jsonpCallback4",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data : {userId:'437800275063865344',buserId:buserId,publishId:pubid,content:content},
            success : function(msg) {},
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
}
//查单独的一个话题内容
function eachpyq(){
    $.ajax({
        async:false,
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/publish/getPublishId?id='+pubid,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback2",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {id:pubid},
        success : function(msg) {
            var html='<li class="main-list"> <div class="po-avt-wrap"> <img src="" alt=""> </div> <div class="po-cmt"> <div class="po-hd"> <p class="po-name"><span class="datapo-name"></span></p> <div class="post"> <p class="post-content"></p> <p class="post-img"></p> </div> <div class="other-list"> <p class="time"></p> <p class="address"></p> <div class="show-box"> <span class="show-img"> <img src="../images/show1.png" alt=""> </span> <span class="show-text">收起</span> </div> <div class="comment-box"> <a class="zan-box" href="javascript:;"> <img class="zan" src="../images/zan1.png" alt=""> <span>赞</span> </a> <a class="pl-box" href="javascript:;"> <img class="pl" src="../images/pl.png" alt=""> <span>评论</span> </a> </div> </div> </div> <div class="hide-comment"><div class="zan-all-box"><div class="r"></div> <div class="cmt-wrap"> <div class="like"><img src="../images/xin.png"><span class="dz-all" id="dz-all"></span><span data-id="" id="my-id">'+","+myname1+'</span></div></div></div><ul class="dao_subcontainer"></ul> </div> </div> </li>';
            var html1='<img class="de-img" src="" alt=""/>';
            //阻止事件冒泡
            function stopBubble(e) {
                if (e && e.stopPropagation) {//非IE浏览器
                    e.stopPropagation();
                }
                else {//IE浏览器
                    window.event.cancelBubble = true;
                }
            }
            var currentNum;
            //页面展示
            for(i=0;i<msg.length;i++){
                var header = 'http://101.201.146.79:8088/dts/bgImage/';
                msg[i].index=i;
                $('.main-box').append(html);
                //头像
                $('.main-list').eq(i).children('.po-avt-wrap').children('img').attr('src',pdtp(msg[i].image));
                //昵称
                $('.datapo-name').eq(i).html(msg[i].nickname);
                //内容
                $('.post-content').eq(i).html(msg[i].content);
                //内容有图片
                var detailimgs=msg[i].images;
                if(detailimgs!=''){
                    var deimgs=detailimgs.split(',');
                    for(var j=0;j<deimgs.length;j++){
                        deimgs[j].index=j;
                        if(deimgs[j]!='null'){
                            $('.post-img').eq(i).append(html1);
                            if(deimgs.length==1){
                                $('.post-img').eq(i+(currentNum-1)*5).children('img').addClass('de-img-one');
                            }
                            $('.post-img').eq(i).children('img').eq(j).attr('src',header+deimgs[j]);
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
                    $('.bigimg-box').show().css('top',0);
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
                $('.time').eq(i).html(newtime);
                //地区
                $('.address').eq(i).html(msg[i].areas);
                //点击每个人的头像
                $('.main-list').eq(i).children('.po-avt-wrap').click(function(){
                    var index=$(this).index('.po-avt-wrap');
                    location.href='grdt.html?userid='+msg[index].userId;
                });
                //点击每个人的昵称
                $('.main-list').eq(i).children('.po-cmt').children('.po-hd').children('.po-name').click(function(){
                    var index=$(this).index('.po-name');
                    location.href='grdt.html?userid='+msg[index].userId;
                });
            }
            //点击赞按钮
            alldzcx();
            $('.zan-box').click(function(){
                // if(window.myJS.getIsGuest()==1){
                //     window.myJS.openLogin('xcq');
                // }else{
                    
                // }
                if(flag2){
                    eachdz();
                    $(this).children('span').html('取消');
                    $('#my-id').show();
                    flag2=false;
                }else{
                    qxdz($('#my-id'));
                    $(this).children('span').html('赞');
                    $('#my-id').hide();
                    flag2=true;
                }
            });
            //查看所有评论
            dzpl();

            function daoTextarea(obj){
                var moreComment='<div class="comment-bottom"> <div class="emotion"  contenteditable="true"  style="width:60%; font-size:.48rem; overflow-x:auto; white-space:nowrap;   background:#fff; line-height:1rem; padding:0 .3rem; border:1px solid #ddd; border-radius:.3rem;margin-left:.2rem;" maxlength="200"></div> <div class="comment-img" id="face"> <a href="javascript:;"> <img src="../images/bq.png" alt=""/> </a> </div> <div class="comment-btn" id="analytic"> <a href="javascript:;"> 发送 </a> </div> </div>';
                //$('.comment-bottom').css({width:'0%',bottom:0})
                $(obj).append(moreComment);
                $('#face').click(function (e) {
                    e.stopPropagation()
                    $('.comment-bottom').css('bottom',$("#isface").height());
                    $("#isface").show();
                });

                $("#isface img").click(function(e){
                    e.stopPropagation()
                    var isemjio = $(this).clone();
                    $(".emotion").append(isemjio)
                });
            }
            function daoTextcon(obj,val){
                var content='<li class="cmt-list"><div class="pl-all-box"><p class="pl-con-box"><span class="my-name plr-name"></span><span class="dao_textarea_con">'+obj+'</span></p></div></li>'
                $(val).append(content);
            }
            function daohuifu(val){
                var con='<p class="hf-conbox"> <span class="data-name cmt-name"></span>回复<span class="hf-name"></span> <i></i></p>'
                $(val).append(con);
            }
            //点击评论按钮
            $(".pl-box").click(function(){
                // if(window.myJS.getIsGuest()==1){
                //     window.myJS.openLogin('xcq');
                // }
                
                    var parent=$(this).parents('.main-list');
                    daoTextarea(parent);
                    $('.comment-bottom').css('width','100%');
                    // $('#face').SinaEmotion($('.emotion'));
                
            });
            
            //点击发送按钮
            $('.comment-btn').live('click',function(){
                var objs=$(".emotion").html(); //输入内容
                 // var obj=AnalyticEmotion(objs);
                var va=$(this).parent().prev().children('.hide-comment').children('.dao_subcontainer');
                

                for(var i = 0; i < 36; i++){
                    var n = "0";
                    if(i < 9){
                        n = "00";
                    }else{
                        n = "0";
                    }
                    
                }



                    comment();
                    daoTextcon(objs,va);
                    $('.emotion').val('');//清空内容
                    $(this).parent().remove();
                    $("#isface").hide();
                // }
                $('.my-name').html(myname1+':');
                return false;//阻止事件冒泡
            });
            //回复别人
            $('.cmt-list .pl-all-box').live('click',function () {
                // if(window.myJS.getIsGuest()==1){
                //     window.myJS.openLogin('xcq');
                // }
                {
                    var name,name1;
                    buserId=$(this).attr('data-id');
                    plindex=$('.cmt-list .pl-all-box').index(this);
                    if($(this).find('.hf-conbox').length!=0){
                        name=$(this).children('.hf-conbox:last').children('.cmt-name').html();
                        name1=name;
                    }else{
                        name=$(this).children('.pl-con-box').children('.cmt-name').html();
                        name1=name.substring(0,name.length-1);
                    }
                    console.log(name1);
                    console.log(myname1+'&&&&&&&&'+name1);
                    if(myname1!=name1){
                        //dzpl(plindex);
                        $('.comment-bottom').click(function () {
                            stopBubble(this.class);
                        });
                        daoTextarea($(this).parent('.cmt-list'));
                        $('.comment-bottom').css('width','100%').children('input').attr('placeholder','回复'+name1);
                        // $('#face').SinaEmotion($('.emotion'));
                        $('#analytic').removeClass('comment-btn').addClass('comment-btn1');
                    }
                    return false;//阻止事件冒泡
                }
            });
            //回复别人点击发送按钮
            $('.comment-btn1').live('click',function(){
                $("#isface").hide();
                var par=$(this).parent('.comment-bottom').parent('.cmt-list').children('.pl-all-box');
                var name,name1;
                if(par.find('.hf-conbox').length!=0){
                    name=par.children('.hf-conbox').children('.cmt-name').html();
                    name1=name;
                }else{
                    name=par.children('.pl-con-box').children('.cmt-name').html();
                    name1=name.substring(0,name.length-1);
                    console.log(name);
                }
                var objs=$(".emotion").html(); //输入内容
                var obj=objs;
                // if(objs.replace(/\s+/g,"")!=''){
                    comment();
                    daohuifu(par);
                    buserId=' ';
                    $('.data-name').html(myname1);
                    console.log(par);
                    console.log(par.children('.hf-conbox').find('.hf-name:last'))
                    par.children('.hf-conbox:last').find('.hf-name').html(name1+":");
                    var va=par.children('.hf-conbox').last().children('i');
                    va.html(obj);
                    $('.emotion').val('');//清空内容
                    $(this).parent().remove();
                    if(par.find('.hf-conbox').length>1){
                        //location.href='';
                    }
                // }else{
                //     return false
                // }
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
            $('.show-box').click(function(){
                var index=$(this).parents('.main-list').index();
                if(flag1[index]){
                    $(this).children('.show-img').children('img').css('-webkit-transform','rotate(180deg)');
                    $(this).children('.show-text').html('展开');
                    $(this).parents('.po-hd').next('.hide-comment').hide();
                    flag1[index]=false;
                }else{
                    $(this).children('.show-img').children('img').css('-webkit-transform','rotate(0deg)');
                    $(this).children('.show-text').html('收起');
                    $(this).parents('.po-hd').next('.hide-comment').show();
                    flag1[index]=true;
                }
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
}

 //文字转表情
    function emojiStr(_str){
        var emoji = {
          f001 : "[大笑]",
          f002 : "[满足]",
          f003 : "[挤眼]",
          f004 : "[吐舌头]",
          f005 : "[亲亲]",
          f006 : "[飞吻]",
          f007 : "[憨笑]",
          f008 : "[狡猾]",
          f009 : "[害羞]",
          f010 : "[哭笑]",
          f011 : "[痛哭]",
          f012 : "[傻眼]",
          f013 : "[无奈]",
          f014 : "[囧]",
          f015 : "[惊呼]",
          f016 : "[生气]",
          f017 : "[愤怒]",
          f018 : "[开心]",
          f019 : "[微笑]",
          f020 : "[鬼脸]",
          f021 : "[色]",
          f022 : "[汗]",
          f023 : "[尴尬]",
          f024 : "[苦逼]",
          f025 : "[咖啡]",
          f026 : "[感冒]",
          f027 : "[鄙视]",
          f028 : "[甜蜜]",
          f029 : "[胜利]",
          f030 : "[赞]",
          f031 : "[心碎]",
          f032 : "[玫瑰]",
          f033 : "[大便]",
          f034 : "[猪]",
          f035 : "[爱情]",
          f036 : "[西瓜]"
        }
        
        var emoji1 = {
              "[大笑]" : "f001", 
              "[满足]" : "f002", 
              "[挤眼]" : "f003", 
              "[吐舌头]" : "f004",
              "[亲亲]" : "f005", 
              "[飞吻]" : "f006", 
              "[憨笑]" : "f007", 
              "[狡猾]" : "f008", 
              "[害羞]" : "f009", 
              "[哭笑]" : "f010", 
              "[痛哭]" : "f011", 
              "[傻眼]" : "f012", 
              "[无奈]" : "f013", 
              "[囧]"   : "f014",
              "[惊呼]" : "f015", 
              "[生气]" : "f016", 
              "[愤怒]" : "f017", 
              "[开心]" : "f018", 
              "[微笑]" : "f019", 
              "[鬼脸]" : "f020", 
              "[色]"   : "f021",  
              "[汗]"   : "f022",  
              "[尴尬]" : "f023", 
              "[苦逼]" : "f024", 
              "[咖啡]" : "f025", 
              "[感冒]" : "f026", 
              "[鄙视]" : "f027", 
              "[甜蜜]" : "f028", 
              "[胜利]" : "f029", 
              "[赞]"   : "f030",
              "[心碎]" : "f031", 
              "[玫瑰]" : "f032", 
              "[大便]" : "f033", 
              "[猪]"   : "f034",
              "[爱情]" : "f035", 
              "[西瓜]" : "f036",
            }

            var src = _str;
            for(var i = 0; i < 36; i++){
                var n = "0";
                if(i < 9){
                    n = "00";
                }else{
                    n = "0";
                }
                if(_str.indexOf(emoji["f"+n+(i+1)+""]) != -1){
                    src = src.replace(emoji["f"+n+(i+1)+""],'<img src="http://101.201.146.79:8088/emoji/'+emoji1[emoji["f"+n+(i+1)+""]]+'.png">')
                }
            }

            return src   
    }
