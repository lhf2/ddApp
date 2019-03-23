$(document).ready(function(){
    yz();
    yzjg();
    var subjectType;
    if(getQueryString('subjectType')!='null'&&getQueryString('subjectType')!=''){
        subjectType=getQueryString('subjectType');
    }else{
        subjectType=window.myJS.getSubjectType();
    }
    $('.ui-link').click(function(){
        $(this).attr('href','ltb.html?subjectType='+subjectType)
    })
});
var subjectType;var myownid = window.myJS.getUserId();var vehicleType=window.myJS.getQuestionType();
if(getQueryString('subjectType')!='null'&&getQueryString('subjectType')!=''){
    subjectType=getQueryString('subjectType');
}else{
    subjectType=window.myJS.getSubjectType();
}
function yz(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/challengeCount?userId='+myownid+'&subjectType='+subjectType+'&vehicleType='+vehicleType,
        //url : 'http://101.201.146.79:8088/dts/challenge/challengeCount?userId=437861281928577024&subjectType=科目一',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        /*data : {userId:window.myJS.getUserId(),subjectType:window.myJS.getSubjectType()},*/
        success : function(msg) {
            if(msg==''||msg==null){
                location.href='gryzb.html?subjectType='+subjectType;
            }
            $('.battel-result:nth-child(1) span').html(msg.winCount);
            $('.battel-result:nth-child(2) span').html(msg.loseCount);
            $('.battel-result:nth-child(3) span').html(msg.drawCount);
            $('.battel-result:nth-child(4) span').html(msg.otherUnchCount);
            $('.battel-result:nth-last-child(1) span').html(msg.myselfUnchCount);
            //如果都是0
            if(msg.winCount==0&&msg.loseCount==0&&msg.drawCount==0&&msg.otherUnchCount==0&&msg.myselfUnchCount==0){
                $('.main-top-left').css('background','#DFDFDF');
            }
            if(msg.winCount!=0||msg.loseCount!=0||msg.drawCount!=0||msg.otherUnchCount!=0||msg.myselfUnchCount!=0){
                $('.main-top-left').css('background','none');
            }
            //展示饼图
            var v1=parseInt(msg.winCount);
            var v2=parseInt(msg.loseCount);
            var v3=parseInt(msg.drawCount);
            var v4=parseInt(msg.otherUnchCount);
            var v5=parseInt(msg.myselfUnchCount);
            var piedata = [
                {
                    value: v1,
                    color:"#29CC81"
                },
                {
                    value :v2,
                    color : "#F25665"
                },
                {
                    value : v3,
                    color : "#FCC859"
                },
                {
                    value :v4,
                    color : "#67B9FE"
                },
                {
                    value :v5,
                    color : "#BFBFBF"
                }
            ]
            var myPie = new Chart(document.getElementById("myChart").getContext("2d")).Pie(piedata,{segmentShowStroke:false});
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
var rid;var jlid;
function yzjg(){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/challengeRecord?userId='+myownid+'&subjectType='+subjectType+'&vehicleType='+vehicleType,
        //url : 'http://101.201.146.79:8088/dts/challenge/challengeRecord?userId=437861281928577024&subjectType=科目一',
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback : "success_jsonpCallback1",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        /*data : {userId:window.myJS.getUserId(),subjectType:window.myJS.getSubjectType()},*/
        success : function(msg) {
            var html='<li class="battel-result-list"> <div class="battel-my battel-left"> <div class="battel-my-left"> <img src="" alt=""/> </div> <div class="battel-mytext"> <div class="batt-myname"></div> <div class="batt-myscore"><span></span>分</div> <div class="batt-mytime"><span></span></div> </div> </div> <span class="vs-text">VS</span> <div class="battel-my battel-right"> <div class="battel-my-left"> <img src="" alt=""/> </div> <div class="battel-mytext"> <div class="batt-myname"></div> <div class="batt-myscore"><span></span>分</div> <div class="batt-mytime"><span></span></div> </div> </div></li>';
            var htmlsuccess='<div class="result-text success-box"><img src="../images/yz-success.png" alt=""/></div>';
            var htmlfail='<div class="result-text fail-box"><img src="../images/yz-fail.png" alt=""/></div>';
            var htmlpj='<div class="result-text pj-box"><img src="../images/yz-pj.png" alt=""/></div>';
            for(var i=0;i<msg.length;i++){
                msg[i].index=i;
                $('.battel-result-box').append(html);
                $('.batt-mytime').each(function(index){
                    if($(this).html()=='等对方交卷'){
                        $('.batt-myscore').eq(index).css('height','0.5rem').html('');
                    }
                })
                //自己的信息
                $('.battel-left').eq(i).children('.battel-my-left').children('img').attr('src',pdtp(msg[i].image));
                $('.battel-left .battel-mytext').eq(i).children('.batt-myname').html(msg[i].nickname);
                $('.battel-left .battel-mytext').eq(i).children('.batt-myscore').children('span').html(msg[i].score);
                //对方的信息
                $('.battel-right').eq(i).children('.battel-my-left').children('img').attr('src',pdtp(msg[i].pkimage));
                $('.battel-right .battel-mytext').eq(i).children('.batt-myname').html(msg[i].pknickname);
                $('.battel-right .battel-mytext').eq(i).children('.batt-myscore').children('span').html(msg[i].pkScore);
                //判断是成功 失败 还是平局
                //自己的
                if(msg[i].userId==myownid){
                    if(msg[i].result==0){
                        $('.battel-result-list').eq(i).append(htmlsuccess).addClass('have-result').click(function () {
                            var batindex=$(this).index('.battel-result-list');
                            rid=msg[batindex].id;
                            location.href='yzcj0.html?recordid='+rid;
                        });
                        $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].timeConsuming);
                        $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].pkTimeConsuming);
                        if(msg[i].pkResult==3){
                            $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html('未应战');
                        }
                        if(msg[i].pkResult==4){
                            $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html('等待对方交卷');
                        }
                    }
                    if(msg[i].result==1){
                        $('.battel-result-list').eq(i).append(htmlfail).addClass('have-result').click(function () {
                            var batindex=$(this).index('.battel-result-list');
                            rid=msg[batindex].id;
                            location.href='yzcj1.html?recordid='+rid;
                        })
                        $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].timeConsuming);
                        $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].pkTimeConsuming);
                        if(msg[i].pkResult==3){
                            $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html('未应战');
                        }
                        if(msg[i].pkResult==4){
                            $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html('等待对方交卷');
                        }
                    }
                    if(msg[i].result==2){
                        $('.battel-result-list').eq(i).append(htmlpj).addClass('have-result').click(function () {
                            var batindex=$(this).index('.battel-result-list');
                            rid=msg[batindex].id;
                            location.href='yzcj2.html?recordid='+rid;
                        })
                        $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].timeConsuming);
                        $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].pkTimeConsuming);
                        if(msg[i].pkResult==3){
                            $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html('未应战');
                        }
                        if(msg[i].pkResult==4){
                            $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html('等待对方交卷');
                        }
                    }
                    if(msg[i].result==3){
                        $('.battel-result-list').eq(i).append(htmlfail).addClass('have-result').click(function () {
                            var batindex=$(this).index('.battel-result-list');
                            rid=msg[batindex].id;
                            location.href='yzcj1.html?recordid='+rid;
                        })
                        $('.battel-left .batt-mytime').eq(i).html('未应战')
                        $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].pkTimeConsuming);
                        if(msg[i].pkResult==3){
                            $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html('未应战');
                        }
                        if(msg[i].pkResult==4){
                            $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html('等待对方交卷');
                        }
                    }
                }
                if(msg[i].result==4){
                    if(msg[i].timeConsuming){
                        $('.battel-left .batt-mytime').eq(i).html(msg[i].timeConsuming);
                    }else{
                        $('.battel-left .batt-mytime').eq(i).html('等对方交卷');
                    };
                    if(msg[i].userId==myownid){
                        if(msg[i].timeConsuming==''){
                            $('.battel-left').eq(i).click(function(){
                            var myindex=$(this).parent().index();
                            qids=msg[myindex].qids;
                            recordid=msg[myindex].id;
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
					            	if(msg.isinvalid==0){
                                    	window.myJS.startTest(qids,recordid,'1',subjectType);
                                	}
					            },
					            error : function(XMLHttpRequest, textStatus, errorThrown) {
					                console.log(XMLHttpRequest.status + ' '
					                + XMLHttpRequest.readyState + ' ' + textStatus);
					            }
        					})     
                        })
                    }
                        
                    }
                    if(msg[i].pkId==myownid){
                         if(msg[i].pkResult==4&&msg[i].pkTimeConsuming==''){
                             $('.battel-right').eq(i).click(function () {
                            var myindex=$(this).parent().index();
                            qids=msg[myindex].qids;
                            recordid=msg[myindex].id;
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
					            	if(msg.isinvalid==0){
                                    	window.myJS.startTest(qids,recordid,'0',subjectType);
                                	}
					            },
					            error : function(XMLHttpRequest, textStatus, errorThrown) {
					                console.log(XMLHttpRequest.status + ' '
					                + XMLHttpRequest.readyState + ' ' + textStatus);
					            }
        					})    
                        })
                         }
                    }
                }
                //对方的
                if(msg[i].userId!=myownid){
                    if(msg[i].pkResult==0) {
                        $('.battel-result-list').eq(i).append(htmlsuccess).addClass('have-result').click(function () {
                            var batindex=$(this).index('.battel-result-list');
                            rid=msg[batindex].id;
                            location.href='yzcj0.html?recordid='+rid;
                        });
                        $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].timeConsuming);
                        $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].pkTimeConsuming);
                        if(msg[i].result==3){
                            $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html('未应战')
                        }
                        if(msg[i].result==4){
                            $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html('等待对方交卷')
                        }
                    }
                    if(msg[i].pkResult==1){
                        $('.battel-result-list').eq(i).append(htmlfail).addClass('have-result').click(function () {
                            var batindex=$(this).index('.battel-result-list');
                            rid=msg[batindex].id;
                            location.href='yzcj1.html?recordid='+rid;
                        });
                        $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].timeConsuming);
                        $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].pkTimeConsuming);
                        if(msg[i].result==3){
                            $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html('未应战')
                        }
                        if(msg[i].result==4){
                            $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html('等待对方交卷')
                        }
                    }
                    if(msg[i].pkResult==2){
                        $('.battel-result-list').eq(i).append(htmlpj).addClass('have-result').click(function () {
                            var batindex=$(this).index('.battel-result-list');
                            rid=msg[batindex].id;
                            location.href='yzcj2.html?recordid='+rid;
                        });
                        $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].timeConsuming);
                        $('.battel-right .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].pkTimeConsuming);
                        if(msg[i].result==3){
                            $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html('未应战')
                        }
                        if(msg[i].result==4){
                            $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html('等待对方交卷')
                        }
                    }
                    if(msg[i].pkResult==3){
                        $('.battel-result-list').eq(i).append(htmlfail).addClass('have-result').click(function () {
                            var batindex=$(this).index('.battel-result-list');
                            rid=msg[batindex].id;
                            location.href='yzcj1.html?recordid='+rid;
                        })
                        $('.battel-right .batt-mytime').eq(i).html('未应战')
                        $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html(msg[i].timeConsuming)
                        if(msg[i].result==3){
                            $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html('未应战')
                        }
                        if(msg[i].result==4){
                            $('.battel-left .battel-mytext').eq(i).children('.batt-mytime').children('span').html('等待对方交卷')
                        }
                    }
                }
                if(msg[i].result==4){
                    if(msg[i].pkTimeConsuming){
                        $('.battel-right .batt-mytime').eq(i).html(msg[i].pkTimeConsuming);
                    }else{
                        $('.battel-right .batt-mytime').eq(i).html('等对方交卷');
                    }
                }
                //删除
                var index1;
                $('.have-result').on('taphold', function(){
                    $('.yzalert-hide').show();
                    $('.mask-hide').show();
                    index1=$(this).index('.battel-result-list');
                    jlid=msg[index1].id;
                });
                $('.yzalert-del').click(function () {
                    $($('.battel-result-list')[index1]).hide();
                    $('.yzalert-hide').hide();
                    $('.mask-hide').hide();
                    delrecord(jlid);
                });
                $('.yzalert-qx').click(function () {
                    $('.mask-hide').hide();
                    $('.yzalert-hide').hide();
                });
                $('.mask-hide').click(function () {
                    $(this).hide();
                    $('.yzalert-hide').hide();
                });
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
function delrecord(jlid){
    $.ajax({
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/challenge/deleteChallengeRecord?id='+jlid,
        cache : false,
        dataType : 'jsonp',
        jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        //data : {userId:'437800275063865344'},
        success : function(msg){},
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}
