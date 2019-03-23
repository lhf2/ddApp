$(document).ready(function () {
    grdt();
    var pduserid=localStorage.getItem("openId");
    var userid=GetQueryString('userid');
    xx(userid);
    jxmc(userid);
    var myownid=localStorage.getItem("openId");
    if(userid==myownid){
        $('#sl-btn').hide();
    }
    $('#sl-btn').click(function () {
        if(userid == myownid){
          return;
        }
        if(pushid == localStorage.getItem("openId"))
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
            window.myJS.openLogin('xcq');
         }else{
        	//私聊推送
             $.ajax({
                 type : 'post',
                 contentType : "application/json;charset=utf-8",
                 url : 'http://101.201.146.79:8088/dts/challenge/sendPush?sidePushId='+pushid+'&userId='+myownid+'&pkUserId='+userid,
                 //url : 'http://101.201.146.79:8088/dts/challenge/sendPush?sidePushId=120c83f76024357e9a3&userId=437858287103246336',
                 cache : false,
                 dataType : 'jsonp',
                 jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                 error : function(XMLHttpRequest, textStatus, errorThrown) {
                     console.log(XMLHttpRequest.status + ' '
                     + XMLHttpRequest.readyState + ' ' + textStatus);
                 }
             });
            $(this).attr('href','sl.html?pushId='+localStorage.getItem("openId")+'&sidepushId='+pushid+'&userId='+myownid+'&pkUserId='+userid+'&flag=0');
         }
    })
});
var userid=GetQueryString('userid');
function grdt(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/publish/getPublishById?userId='+userid,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {userId:userid},
        success : function(msg) {
            var html='<li class="main-detail-list"><a href="javascript:;"> <div class="detail-time"><i></i><span></span></div> <div class="main-text"> <div class="detail-img"></div> <div class="detail-text"> <div class="detail-top"> </div> <div class="detail-num">共<span>1</span>张</div> </div> </div> </a> </li>';
            var html1='<li class="main-detail-list"> <a href="javascript:;"> <div class="detail-time"><i>28</i><span>三月</span></div> <div class="main-text">  <div class="detail-img"></div> <div class="detail-text"> <div class="detail-top-ling detail-top">再学学应该就会了，考试还是没有问题，很有信心的说！ </div><div class="detail-num" style="display: none">共<span>1</span>张</div> </div> </div> </a> </li>';
            var html2='<img class="dt-img" src="" alt="">'
            for(var i=0;i<msg.length;i++){
                msg[i].index=i;
                var imgs=msg[i].images;
                //有图没图
                if(imgs==''){
                    $('.main-detail').append(html1);
                }else{
                    $('.main-detail').append(html);
                }
                //我的时间
                function GetDateStr(AddDayCount) {
                    var dd = new Date();
                    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
                    var y = dd.getFullYear();
                    var m = dd.getMonth()+1;//获取当前月份的日期
                    if(m<10){
                        m='0'+m;
                    }
                    var d = dd.getDate();
                    if(d<10){
                        d='0'+d;
                    }
                    return y+"-"+m+"-"+d;
                }
                //时间
                var sendtime=msg[i].sendTime;
                var mytime=sendtime.split(' ');
                for(k=0;k<mytime.length;k++){
                    console.log(mytime[0]+'%%%%%'+GetDateStr(0));
                    if(mytime[0]==GetDateStr(0)){
                        $('.detail-time').eq(i).html('今天')
                    }
                    if(mytime[0]==GetDateStr(-1)){
                        $('.detail-time').eq(i).html('昨天')
                    }
                }
                var y=sendtime.substr(6,1);
                var r=sendtime.substr(8,2);
                $('.detail-time').eq(i).children('i').html(r);
                $('.detail-time').eq(i).children('span').html(y+'月');
                //内容
                $('.detail-text').eq(i).children('.detail-top').html(msg[i].content);
                //图片
                var header = 'http://101.201.146.79:8088/dts/bgImage/';
                var varimgs=imgs.split(',');
                if(varimgs!=''){
                    for(var j=0;j<varimgs.length;j++){
                        varimgs[j].index=j;
                        $('.detail-img').eq(i).append(html2);
                        if(varimgs!='null'){
                            //图片排序样式
                            if(varimgs.length==1){
                                $('.detail-img').eq(i).find('.dt-img').eq(j).css({width:'100%',height:'100%'}).attr('src',header+varimgs[j])
                            }
                            if(varimgs.length==2){
                                $('.detail-img').eq(i).find('.dt-img').eq(j).css({width:'50%',height:'100%'}).attr('src',header+varimgs[j])
                            }
                            if(varimgs.length==3){
                                $('.detail-img').eq(i).find('.dt-img').eq(j).css({width:'50%',height:'50%',verticalAlign:'top'}).attr('src',header+varimgs[j]);
                                $('.detail-img').eq(i).find('.dt-img').eq(0).css({width:'50%',height:'100%'});
                            }
                            if(varimgs.length>=4){
                                $('.detail-img').eq(i).find('.dt-img').eq(j).css({width:'50%',height:'50%',verticalAlign:'top'}).attr('src',header+varimgs[j]);
                            }
                            //个数
                            $('.detail-num').eq(i).children('span').html(varimgs.length)
                        }
                    }
                }else{
                    $('.detail-img').eq(i).hide();
                }
                //点击一条进入动态
                $('.main-detail-list').click(function () {
                    var listindex=$(this).index('.main-detail-list');
                    var pubid=msg[listindex].id;
                    location.href='htnr.html?pubid='+pubid;
                })
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
