$(document).ready(function () {
    zpytc();
    $('.same-city').click(function () {
        var index=$(this).index('.main-top-list');
        $('.main-lists').hide();
        $($('.main-lists')[index]).show();
        $('.main-top-list').removeClass('cur');
        $(this).addClass('cur');
        zpytc();
    });
    $('.same-jx').click(function () {
        var index=$(this).index('.main-top-list');
        $('.main-lists').hide();
        $($('.main-lists')[index]).show();
        $('.main-top-list').removeClass('cur');
        $(this).addClass('cur');
        zpytjx();
    });
});
var jsonStrUser = localStorage.getItem("wx_user")
var jsonUser = JSON.parse(jsonStrUser);
var tcarr=[],tjxarr=[],myownid=localStorage.getItem("openId");
var vehicleType=localStorage.getItem("vtype");
function zpytc(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/publish/getUserByArea?area='+jsonUser.area+'&vehicleType='+vehicleType,
        //url : 'http://101.201.146.79:8088/dts/publish/getUserByArea?area=西安',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {area:'西安'},
        success : function(msg){
            tcarr=[];
            for(var j=0;j<msg.length;j++){
                msg[j].index=j;
                if(msg[j].id!=myownid){
                    tcarr.push(msg[j]);
                }
            }
            $('.main-city').html('');
            var html = '<li class="main-list"> <a href="javascript:;"> <span class="main-list-img"> <img src="" alt=""/> </span> <span class="main-list-text"></span> </a> </li>';
            for (var i = 0; i < tcarr.length; i++) {
                $('.main-city').append(html);
                tcarr[i].index = i;
                $('.main-list').eq(i).children('a').children('.main-list-img').children('img').attr('src',pdtp(tcarr[i].image));
                $('.main-list').eq(i).children('a').children('.main-list-text').html(tcarr[i].nickname);
            }
            $('.main-list').click(function () {
                var index1=$(this).index('.main-list');
                location.href='../ltb/grzy.html?userid=' + tcarr[index1].id+'&pushid='+tcarr[index1].pushId+'&source=xcq';
            })
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function zpytjx(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/publish/getUserByDriving?drivingId='+localStorage.getItem("mydrivingid")+'&vehicleType='+vehicleType,
        //url : 'http://101.201.146.79:8088/dts/publish/getUserByDriving?drivingId=439616102331318272',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {drivingId:'426547247648342016'},
        success : function(msg) {
            console.log(msg)
            if(!msg) return
            tjxarr=[];
            for(var j=0;j<msg.length;j++){
                msg[j].index=j;
                if(msg[j].id!=myownid){
                    tjxarr.push(msg[j]);
                }
            }
            $('.main-jx').html('');
            var html1='<li class="main-list main-list1"> <a href="javascript:;"> <span class="main-list-img"> <img src="" alt=""/> </span> <span class="main-list-text"></span> </a> </li>';
            for(var i=0;i<tjxarr.length;i++){
                tjxarr[i].index=i;
                $('.main-jx').append(html1);
                $('.main-jx .main-list1').eq(i).children('a').children('.main-list-img').children('img').attr('src',pdtp(tjxarr[i].image));
                $('.main-jx .main-list1').eq(i).children('a').children('.main-list-text').html(tjxarr[i].nickname);
            }
            $('.main-list1').click(function (){
                var index2=$(this).index('.main-list1');
                location.href='../ltb/grzy.html?userid=' + tjxarr[index2].id+'&pushid='+tjxarr[index2].pushId+'&source=xcq';
            })
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}