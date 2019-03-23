$(function () {
    var sideid=GetQueryString('userid');
    var pkScore=GetQueryString('pkScore');
    var pkTime=GetQueryString('pkTime');
    var qids,recordid,subjectType,subject;
    var vehicleType=window.myJS.getQuestionType();
    var subject1= getQueryString('subjectType');
    if(subject1!='null'&&subject1!=''&&subject1!='undefined'){
        subject=subject1;
    }else{
        subject=window.myJS.getSubjectType();
    }
    if(!subject)
	{
    	subject = '科目一';
	}
    $('.dt-btn a').click(function () {
        window.myJS.startTest(qids,recordid,'1',subjectType);
    });
    xx();tzym1();
    $.ajax({//获取自己的名字和头像
        type: 'post',
        contentType: "application/json;charset=utf-8",
        url: 'http://101.201.146.79:8088/dts/challenge/userInfo?userId='+window.myJS.getUserId(),
        //url: 'http://101.201.146.79:8088/dts/challenge/userInfo?userId=437800275063865344',
        cache: false,
        dataType: 'jsonp',
        jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback: "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data: {userId:window.myJS.getUserId()},
        success: function (msg) {
            $('.my-box .my-img img').attr('src',pdtp(msg.image));
            $('.my-box .my-name').html(msg.nickname);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus+' '+XMLHttpRequest.responseText);
        }
    });
    function xx(){
        $.ajax({//获取对方的名字和头像
            type: 'post',
            contentType: "application/json;charset=utf-8",
            url: 'http://101.201.146.79:8088/dts/challenge/userInfo?userId='+sideid,
            cache: false,
            dataType: 'jsonp',
            jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //jsonpCallback: "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data: {userId: sideid},
            success: function (msg) {
                 $('.side-box .my-img img').attr('src',pdtp(msg.image));
                 $('.side-box .my-name').html(msg.nickname);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        });
    }
    function tzym1(){
        $.ajax({
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/challenge/insertChallengeRecord?subjectType='+subject+'&userId='+window.myJS.getUserId()+'&pkUserId='+sideid+'&pkScore='+pkScore+'&pkTime='+pkTime+'&vehicleType='+vehicleType,
            //url : 'http://101.201.146.79:8088/dts/challenge/insertChallengeRecord?subjectType=科目一&userId=422294912088670208&pkUserId='+sideid+'&pkScore='+pkScore+'&pkTime='+pkTime,
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data : {userId:window.myJS.getUserId(),pkUserId:sideid}
            success : function(msg) {
                 qids=msg.qids;
                 recordid=msg.id;
                 subjectType = msg.subjectType;
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        });
    }
});
