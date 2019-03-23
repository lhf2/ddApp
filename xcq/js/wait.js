$(document).ready(function () {
    wait();myinfor();
});
var flag=GetQueryString('flag');
var recordid=GetQueryString('recordId');
var score=GetQueryString('score');
var time=GetQueryString('time');
var qids,qidResult,qidPkresult,subjectType;
$('.share-btn').click(function () {
    window.myJS.shareResult(recordid);
});
function wait(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/challengeRecordById?recordId='+recordid,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {id:recordid},//recordid
        success : function(msg) {
            qids=msg.qids;
            qidResult=msg.qidResult;
            qidPkresult=msg.qidPkresult;
            subjectType=msg.subjectType;
            //查看试卷
            $('.cksj-btn').click(function () {
                window.myJS.openExamAll(flag,qids,qidResult,qidPkresult,subjectType);
            });
            //查看错题
            $('.ckct-btn').click(function () {
                window.myJS.openError(flag,qids,qidResult,qidPkresult,subjectType);
            });
            //擂台榜
            $('.ltb-btn').click(function () {
//            	location.href='../ltb/ltb.html?subjectType='+subjectType;
                $(this).children('a').attr('href','../ltb/ltb.html?subjectType='+subjectType);
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function myinfor(){
    $.ajax({//获取自己名字和头像
        type: 'post',
        contentType: "application/json;charset=utf-8",
        //url: 'http://101.201.146.79:8088/dts/challenge/userInfo?userId=437861175238066176',
        url: 'http://101.201.146.79:8088/dts/challenge/userInfo?userId='+window.myJS.getUserId(),
        cache: false,
        dataType: 'jsonp',
        jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback: "success_jsonpCallback3",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data: {userId: userid},
        success: function (msg) {
            $('.icon-img img').attr('src',pdtp(msg.image));
            $('.top-name').html(msg.nickname);
            $('.my-detail-score span').html(score);
            $('.my-detail-time span').html(time);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
}