$(document).ready(function () {
    samearea();
    $('.samearea-btn').click(function () {
        var index=$(this).index('.main-top-list');
        $('.main-lists').hide();
        $($('.main-lists')[index]).show();
        $('.main-top-list').removeClass('cur');
        $(this).addClass('cur');
        samearea();
    });
    $('.samejx-btn').click(function () {
        var index=$(this).index('.main-top-list');
        $('.main-lists').hide();
        $($('.main-lists')[index]).show();
        $('.main-top-list').removeClass('cur');
        $(this).addClass('cur');
        samejx();
    })
});
var msgarr=[],msgarr1=[],myownid=window.myJS.getUserId();
var vehicleType=window.myJS.getQuestionType();
function samearea() {
    $.ajax({
        type: 'post',
        contentType: "application/json;charset=utf-8",
        url: 'http://101.201.146.79:8088/dts/challenge/users?area='+window.myJS.getZone()+'&latitude='+window.myJS.getLatitude()+'&longitude='+window.myJS.getLongitude()+'&vehicleType='+vehicleType,
        //url: 'http://101.201.146.79:8088/dts/challenge/users?area=西安&latitude='+111+'&longitude='+111,
        cache: false,
        dataType: 'jsonp',
        jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback: "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data: {area:window.myJS.getZone()},
        success: function (msg) {
        	msgarr=[];
            for(var i=0;i<msg.length;i++){
                msg[i].index = i;
                if(msg[i].id!=myownid){
                    msgarr.push(msg[i]);
                }
            }
            $('.main-samearea').html('');
            var html = '<li class="main-list"> <a href="javascript:;"> <span class="main-list-img"> <img src="" alt=""/> </span> <span class="main-list-text"></span> </a> </li>';
            for (var j = 0; j < msgarr.length; j++) {
                msgarr[j].index=j;
                $('.main-samearea').append(html);
                $('.main-list').eq(j).children('a').children('.main-list-img').children('img').attr('src',pdtp(msgarr[j].image));
                $('.main-list').eq(j).children('a').children('.main-list-text').html(msgarr[j].nickname);
            }
            $('.main-list').click(function () {
                var index1=$(this).index('.main-list');
                location.href='grzy.html?userid=' + msgarr[index1].id+'&pushid='+msgarr[index1].pushId;
            })
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function samejx(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/drivingUsers?drivingId='+window.myJS.getDrivingId()+'&vehicleType='+vehicleType,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {drivingId:window.myJS.getDrivingId()},
        success : function(msg){
        	msgarr1=[];
            for(var i=0;i<msg.length;i++){
                msg[i].index = i;
                if(msg[i].id!=myownid){
                    msgarr1.push(msg[i]);
                }
            }
            $('.main-samejx').html('');
            var html1='<li class="main-list1"> <a href="javascript:;"> <span class="main-list-img main-list1-img"> <img src="" alt=""/> </span> <span class="main-list-text"></span> </a> </li>';
            for(var j=0;j<msgarr1.length;j++){
                msgarr1[j].index=j;
                $('.main-samejx').append(html1);
                $('.main-list1').eq(j).children('a').children('.main-list-img').children('img').attr('src',pdtp(msgarr1[j].image));
                $('.main-list1').eq(j).children('a').children('.main-list-text').html(msgarr1[j].nickname);
                $('.main-list1').click(function () {
                    var index2=$(this).index('.main-list1');
                    location.href='grzy.html?userid=' + msgarr1[index2].id+'&pushid='+msgarr1[index2].pushId;
                })
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}