$(document).ready(function () {
    //返回
    $('.page-return').click(function () {
        var pagenume=getQueryString('page');
        if(pagenume&&getQueryString('page')==pagenume){
            location.href='ywxg.html?index='+pagenume;
        }else{
            history.back();
        }
    });
    eachpyq();
});
var pubid=GetQueryString('pubid');
xx(window.myJS.getUserId());
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
            var html='<li class="main-list" style="border: none"> <div class="po-avt-wrap"> <img src="" alt=""> </div> <div class="po-cmt"> <div class="po-hd"> <p class="po-name"><span class="datapo-name"></span></p> <div class="post"> <p class="post-content"></p> <p class="post-img"></p> </div> <div class="other-list"> <p class="time"></p> <p class="address"></p></div> </div> </li>';
            var html1='<img class="de-img" src="" alt=""/>';
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
                $('.time').eq(i).html(msg[i].sendTime);
                //地区
                $('.address').eq(i).html(msg[i].areas);
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
}
