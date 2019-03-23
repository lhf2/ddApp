$(document).ready(function () {
    cjresult();
    var winurl=location.href;var newurl;
    if(winurl.indexOf('yzcj0')>0){
        newurl=winurl.replace('yzcj0','yzcj0share');
    }
    if(winurl.indexOf('yzcj1')>0){
        newurl=winurl.replace('yzcj1','yzcj1share');
    }
    if(winurl.indexOf('yzcj2')>0){
        newurl=winurl.replace('yzcj2','yzcj2share');
    }
    $('.share-btn').click(function () {
        window.myJS.shareResult(newurl);
    })
});
var recordid=GetQueryString('recordid');var myownid=window.myJS.getUserId(),pkscore,pktime,pkid;
function cjresult(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/shareChallengeRecord?id='+recordid,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {id:recordid},//recordid
        success : function(msg){
            //自己的信息
            $('.my-box .my-img img').attr('src',pdtp(msg.image));
            $('.my-box .my-name').html(msg.nickname);
            $('.my-box .my-detail .my-detail-score span').html(msg.score);
            //测试
            if(msg.timeConsuming==''){
                msg.timeConsuming=0;
            }
            $('.my-box .my-detail .my-detail-time span').html(msg.timeConsuming);
            //对方的信息
            $('.side-box .my-img img').attr('src',pdtp(msg.pkimage));
            $('.side-box .my-name').html(msg.pknickname);
            $('.side-box .my-detail .my-detail-score span').html(msg.pkScore);
            //测试
            if(msg.pkTimeConsuming==''){
                msg.pkTimeConsuming=0;
            }
            $('.side-box .my-detail .my-detail-time span').html(msg.pkTimeConsuming);
            if(msg.userId==myownid){
                pkid=msg.pkId;
                pkscore=msg.pkScore;
                pktime=msg.pkTimeConsuming;
            }
            if(msg.pkId==myownid){
                pkid=msg.userId;
                pkscore=msg.score;
                pktime=msg.timeConsuming;
            }
            $('.yz-fail-btn').click(function(){
                $(this).children('a').attr('href','../ltb/tz.html?userid='+pkid+'&pkScore=&'+pkscore+'&pkTime='+pktime)
            });
            $('.yz-pj-btn').click(function () {
                $(this).children('a').attr('href','../ltb/tz.html?userid='+pkid+'&pkScore=&'+pkscore+'&pkTime='+pktime)
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}