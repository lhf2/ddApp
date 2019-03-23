$(document).ready(function() {
    var dataFlag = 0,drivingId='123',area=null;
    IntList(0,drivingId,area);
    /*var cityindex=window.myJS.getZone();
    $('.title-city a').html(cityindex);*/
    //点上方
    $('.main-title-list').click(function () {
        $('.main-title-list').removeClass('cur');
        $(this).addClass('cur');
        var index1=$(this).index('.main-title-list');
        if (index1 == 0) {
            drivingId='123';
            area=null;
        } else if (index1 == 1) {
            drivingId=null;
            area='北京';
        } else if (index1 == 2){
            drivingId=null;
            area=null;
        }
        IntList(0,drivingId,area);
    });
    //点下方
    $(".battle-top-list").click(function() {
        var index = $(this).index(".battle-top-list");
        if (index == 0) {
            dataFlag = 0;
        } else if (index == 1) {
            dataFlag = 1;
        } else {
            dataFlag = 2;
        }
        IntList(index,drivingId,area);
    });
});
function IntList(num,drivingid,area) {
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/examRecord/recordTop?subjectType=科目一&drivingId='+drivingid+'&area='+area+'&dateFlag='+num,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        success : function(msg) {
            var header = 'http://101.201.146.79:8088/dts/image/';
            $('.battel-center').html('').css('border','none');
            $('.battel-bot').html('');
            for ( var i = 0; i < msg.length; i++) {
                msg[i].index = i;
                var divhtml = '<li class="battel-num battel-list"> <a href="javascript:;"> <div class="num-left"> <span class="battel-number">' + (i + 1) + '</span> <span class="num-img"> <img src="" alt=""/> </span> <span class="num-name"></span> </div> <div class="num-right"> <span class="num-score"><span></span>分</span> <span class="num-time"><span>3</span>分<i></i>秒</span> </div> </a> </li>';
                var goodhtml='<li class="battle-cen-list win-one battel-list"> <a href="javascript:;"> <div class="battle-win">冠军 </div> <div class="battle-text"> <div class="battle-name num-name"></div> <div class="battle-score num-score">考分<span></span>分</div> <div class="battle-time num-time"><span></span>分<i></i>秒</div> <div class="num-img" style="display: none"><img src="" alt=""/></div> </div> </a> </li>';
                var goodhtml1='<li class="battle-cen-list win-two battel-list"> <a href="javascript:;"> <div class="battle-win">亚军 </div> <div class="battle-text"> <div class="battle-name num-name"></div> <div class="battle-score num-score">考分<span>1</span>分</div> <div class="battle-time num-time"><span></span>分<i></i>秒</div> <div class="num-img" style="display: none"><img src="" alt=""/></div> </div> </a> </li>';
                var goodhtml2='<li class="battle-cen-list win-three battel-list"> <a href="javascript:;"> <div class="battle-win">季军 </div> <div class="battle-text"> <div class="battle-name num-name"></div> <div class="battle-score num-score">考分<span></span>分</div> <div class="battle-time num-time"><span></span>分<i></i>秒</div> <div class="num-img" style="display: none"><img src="" alt=""/></div> </div> </a> </li>';
                if(i==0){
                    $('.battel-center').append(goodhtml).css('border-bottom','1px solid #C6C6C6');
                }
                if(i==1){
                    $('.battel-center').append(goodhtml1).css('border-bottom','1px solid #C6C6C6');
                }
                if(i==2){
                    $('.battel-center').append(goodhtml2).css('border-bottom','1px solid #C6C6C6');
                }
                if (i >= 3) {
                    $('.battel-bot').append(divhtml);
                }
                $('.battel-list a').each(
                    function(index, element) {
                        if(index<=2){
                            $(this).attr(
                                'href',
                                'grzy.html?userid='
                                + msg[index].userId+'&score='+msg[index].score+'&time='+msg[index].timeConsuming+'&pushid='+msg[index].pushId)
                        }else{
                            $(this).attr(
                                'href',
                                'grzy.html?userid='
                                + msg[index].userId+'&pushid='+msg[index].pushId)
                        }
                    });
                //图片
                if(msg[i].image!='undefined'){
                    $('.num-img').eq(i).children('img').attr('src',pdtp(msg[i].image));
                }
                //昵称
                $('.num-name').eq(i).html(msg[i].nickname);
                $('.num-score').eq(i).children('span').html(
                    msg[i].score);
                //时间
                var time = msg[i].timeConsuming;
                var time1 = time.split(':');
                $('.num-time').eq(i).children('span').html(time1[0]);
                $('.num-time').eq(i).children('i').html(time1[1]);
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
