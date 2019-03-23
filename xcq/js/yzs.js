$(document).ready(function () {
    //返回
    $('.page-return').click(function () {
        var pagenume=getQueryString('page');
        if(pagenume&&getQueryString('page')==pagenume){
            location.href='../xcq/ywxg.html?index='+pagenume;
        }else{
            history.back();
        }
    });
	var qids,subjectType;
    var userid=GetQueryString('userId');
    var recordid=GetQueryString('recordId');
    var pkuserid=GetQueryString('pkUserId');
    if(window.myJS.getUserId()!=pkuserid){
        uppk();
    }
    $('.ling-btn-list').click(function(){
        quit();
    });
    $('.yz-btn').click(function () {
        yzhan();
        window.myJS.startTest(qids,recordid,'0',subjectType);
    });
    qcts();
    $.ajax({//获取名字和头像
        type: 'post',
        contentType: "application/json;charset=utf-8",
        url: 'http://101.201.146.79:8088/dts/challenge/userInfo?userId='+userid,
        cache: false,
        dataType: 'jsonp',
        jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback: "success_jsonpCallback1",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data: {userId:userid},
        success: function (msg) {
            var sex;
            $('.main-my-img img').attr('src',pdtp(msg.image));
            $('.main-my-detail .main-my-list .my-name').html(msg.nickname);
            if(msg.sex==0){
                sex='女'
            }
            if(msg.sex==1){
                sex='男'
            }
            $('.main-my-detail .main-my-list .my-sex').html(sex);
            $('.main-my-detail .main-my-list .my-area').html(msg.area);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
    function quit(){
        $.ajax({
            async:false,
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/challenge/updateUnChallengeCount?recordId='+recordid,
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data : {recordId:recordid},
            success : function(msg) {
                location.href='../xcq/ywxg.html?index=3';
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
    function qcts(){
        $.ajax({
            async:false,
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/challenge/getIsInvalid?recordId='+recordid,
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data : {recordId:recordid},
            success : function(msg) {
                if(!msg || msg.isinvalid==1){
                    $('.main-bottom').html('<div class="sx-text">您未能及时约战</br>约战已失效</div>')
                }
                if(msg && msg.pkResult==4 && msg.pkTimeConsuming && msg.pkTimeConsuming != ''){
                    $('.main-bottom').html('<div class="sx-text">您已提交试卷</br>请在个人约战榜中查看结果</div>')
                }
                if(msg && msg.pkResult!=4){
                    $('.main-bottom').html('<div class="sx-text">您已操作过</br>请在个人约战榜中查看结果</div>')
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
    function yzhan(){
        $.ajax({
            async:false,
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/challenge/challengeRecordById?recordId='+recordid,
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data : {recordId:recordid},
            success : function(msg) {
            	qids = msg.qids;
            	subjectType = msg.subjectType;
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
    function uppk(){
        $.ajax({
            async:false,
            type : 'post',
            contentType : "application/json;charset=utf-8",
            url : 'http://101.201.146.79:8088/dts/challenge/updatePkUserId?userId='+window.myJS.getUserId()+'&recordId='+recordid,
            cache : false,
            dataType : 'jsonp',
            jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            //data : {recordId:recordid},
            success : function(msg) {
//                alert(2);//返回函数没qids
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
});

