$(document).ready(function(){
	$('.load-img').hide();
	//var dataFlag = 0,drivingId=window.myJS.getDrivingId(),area=null;
	var dataFlag = 0,drivingId="",area="北京";
	// IntList(0,drivingId,area);
	// var cityindex=window.myJS.getZone();
	// var pduserid=window.myJS.getIsGuest();
	var cityindex="北京";
	var pduserid="475522859838472192";
	$('.title-city a').html(cityindex);
	//点上方
	$('.main-title-list').click(function(){
		$('.main-title-list').removeClass('cur');
		$(this).addClass('cur');
		var index1=$(this).index('.main-title-list');
		if (index1 == 0) {
			//drivingId=window.myJS.getDrivingId();
			drivingId="";
			area=null;
		} else if (index1 == 1) {
			drivingId=null;
			//area=window.myJS.getZone();
			area="北京";
		} else if (index1 == 2){
			drivingId=null;
			area=null;
		}
		if($('.curlist')){
			var curindex=$('.curlist').index();
			// IntList(curindex,drivingId,area);
		}
	});
	//点下方
	$(".battle-top-list").click(function() {
		$('.battle-top-list').removeClass('curlist');
		$(this).addClass('curlist');
		var index = $(this).index(".battle-top-list");
		if (index == 0) {
			dataFlag = 0;
		} else if (index == 1) {
			dataFlag = 1;
		} else {
			dataFlag = 2;
		}
		// IntList(index,drivingId,area);
	});
	//点击个人约战榜
	var subjectType;
	var type = getQueryString('subjectType');
	if(type!='null'&&type!=''){
		subjectType=type;
	}else{
		//subjectType=window.myJS.getSubjectType();
		subjectType="科目一"
	}
	// $('.battle-inner').click(function () {
	// 	if(pduserid==1){
	// 		window.myJS.openLogin('ltb');
	// 	}else{
	// 		$(this).children('a').attr('href','../ltb/gryzb1.html?subjectType='+subjectType);
	// 	}
	// });
	//马上考试
	$('.battel-tip-btn').click(function () {
		var a = localStorage.getItem("kemu") || "科目二";
		if(a == "科目二" || a == "科目三"){
			a = "科目一"
		}
		window.location.href="../../index-topic/topic.html?stype="+a+"&testtype=4&city=北京";
	});
	// var strurl=encodeURI('../ltb/gryzb1.html?subjectType='+subjectType)
});
var subjectType;
// var userid=window.myJS.getUserId();
// var vehicleType=window.myJS.getQuestionType();
var userid="475522859838472192"
var vehicleType="小车"
var type = getQueryString('subjectType');
if(type!='null'&&type!=''){
	subjectType=type;
}else{
	//subjectType=window.myJS.getSubjectType();
	
	subjectType="科目一"
}

function IntList(num,drivingid,area) {

	$.ajax({
				type : 'post',
				contentType : "application/json;charset=utf-8",
				url : 'http://dd.dingdongxueche.com/DDWeb/examRecord/recordTop.htm?subjectType=科目一&area=北京&vehicleType=小车&dateFlag=0',
				cache : false,
				// dataType : 'jsonp',
				// jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
				// jsonpCallback : "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				/*data : {
					subjectType:window.myJS.getSubjectType(),
					drivingId : drivingid,
					area :area,
					dateFlag : num
				},*/
				success : function(msg) {
					if(msg==''||msg=='null'){
						$(".battel-center").css("cssText","heigth:0!important");
						//$(".battel-center").css("cssText","padding-bottom:0!important");
						$('.city-detail-hide').show();
					}else{
						$('.city-detail-hide').hide();
					}
					var header = 'http://dd.dingdongxueche.com/DDWeb/image/';
					$('.battel-center').html('').css('border','none');
					$('.battel-bot').html('');
					var goodhtml='<li class="battle-cen-list win-one battel-list"> <a href="javascript:;"> <div class="battle-win">冠军 </div> <div class="battle-text"> <div class="battle-name num-name"></div> <div class="battle-score num-score">考分<span></span>分</div> <div class="battle-time num-time"><span></span>分<i></i>秒</div> <div class="num-img" style="display: none"><img src="" alt=""/></div> </div> </a> </li>';
					var goodhtml1='<li class="battle-cen-list win-two battel-list"> <a href="javascript:;"> <div class="battle-win">亚军 </div> <div class="battle-text"> <div class="battle-name num-name"></div> <div class="battle-score num-score">考分<span>1</span>分</div> <div class="battle-time num-time"><span></span>分<i></i>秒</div> <div class="num-img" style="display: none"><img src="" alt=""/></div> </div> </a> </li>';
					var goodhtml2='<li class="battle-cen-list win-three battel-list"> <a href="javascript:;"> <div class="battle-win">季军 </div> <div class="battle-text"> <div class="battle-name num-name"></div> <div class="battle-score num-score">考分<span></span>分</div> <div class="battle-time num-time"><span></span>分<i></i>秒</div> <div class="num-img" style="display: none"><img src="" alt=""/></div> </div> </a> </li>';
					var goodhtml1hide='<li class="battle-cen-list win-two win-two-hide"> <a href="javascript:;"> <div class="battle-win">亚军 </div> <div class="battle-text">谁是亚军？</div> </a> </li>';
					var goodhtml2hide='<li class="battle-cen-list win-three win-three-hide"> <a href="javascript:;"> <div class="battle-win">季军 </div> <div class="battle-text">季军在哪里？</div> </a> </li>';
					var divhtmlhide='<div class="battel-tip"><div class="battel-tip-title">既然到此一游，何不上台一战!</div> <div class="battel-tip-btn">马上考试 </div></div>';
					if(msg.length==1){
						$('.battel-center').css({'height':'5rem','padding':'0.97rem .25rem'});
						$('.battel-center').append(goodhtml1hide).css('border-bottom','1px solid #C6C6C6');
						$('.battel-center').append(goodhtml2hide).css('border-bottom','1px solid #C6C6C6');
						$('.battel-bot').append(divhtmlhide).css('margin-top','.3rem');
					}else if(msg.length==2){
						$('.battel-center').css({'height':'5rem','padding':'0.97rem .25rem'});
						$('.battel-center').append(goodhtml2hide).css('border-bottom','1px solid #C6C6C6');
						$('.battel-bot').append(divhtmlhide).css('margin-top','.3rem');
					}else if(msg.length==3){
						$('.battel-center').css({'height':'5rem','padding':'0.97rem .25rem'});
						$('.battel-bot').append(divhtmlhide).css('margin-top','.3rem');
					}
					//点击马上考试
					$('.battel-tip-btn').click(function () {
						console.log("window.myJS.openPracticeTest(subjectType);")
					});
					for ( var i = 0; i < msg.length; i++) {
						msg[i].index = i;
						var divhtml = '<li class="battel-num battel-list"> <a href="javascript:;"> <div class="num-left"> <span class="battel-number">' + (i + 1) + '</span> <span class="num-img"> <img src="" alt=""/> </span> <span class="num-name"></span> </div> <div class="num-right"> <span class="num-score"><span></span>分</span> <span class="num-time"><span>3</span>分<i></i>秒</span> </div> </a> </li>';
						if(i==0){
							$('.battel-center').css({'height':'5rem','padding':'0.97rem .25rem'});
							$('.battel-center').append(goodhtml).css('border-bottom','1px solid #C6C6C6');
						}
						if(i==1){
							$('.battel-center').css({'height':'5rem','padding':'0.97rem .25rem'});
							$('.battel-center').append(goodhtml1).css('border-bottom','1px solid #C6C6C6');
						}
						if(i==2){
							$('.battel-center').css({'height':'5rem','padding':'0.97rem .25rem'});
							$('.battel-center').append(goodhtml2).css('border-bottom','1px solid #C6C6C6');
						}
						if (i >= 3) {
							$('.battel-bot').append(divhtml);
						}
						$('.battel-list a').each(
								function(index, element) {
									if(msg[index].userId!=userid){
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
									}
						});
						//图片
						if(msg[i].image!='undefined'){
							$('.num-img').eq(i).children('img').attr('src',pdtp(msg[i].image));
						}
						//昵称
						$('.num-name').eq(i).html(msg[i].nickname);
						//分数
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
