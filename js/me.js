var  path ='http://wx.dingdongxueche.com';
var path1 ='http://dd.dingdongxueche.com';

$(function(){
	//我的订单
	//打开优惠券弹窗
	$(".paddmarg").click(function(){
		// $(".mask").css("display","flex");
		// setTimeout(function(){
		// 	$(".body").addClass("super_vague");
		// 	$(".tabx2_Content").removeClass("animation");
		// },20);
		//优惠券弹窗开关
		closeOrOpen_mask();
	});

	//结算
	$(document).on("click","#myOrder",function(){
	try{
		useCoupons();//使用优惠券
		var   select = $(".radios input:checked").parents(".shopList");
		//alert(undefined.length);
		//if(select.length>0&&select!=undefined&&select!="undefined"){
			var  totalFee=select.find(".syprice").text();
			var   classId=select.attr("classid");
			var drivingId=select.attr("drivingid");
			var    openId=localStorage.getItem("openId");
			var   orderId="ddxc"+Math.uuid(16);
			var    t_type="wk";
			var  v_couponsId='';
			if(!utils.isEmpty(couponsId)){
					v_couponsId=couponsId;
			}
			if(!utils.isEmpty(drivingId)&&!utils.isEmpty(classId)&&!utils.isEmpty(openId)&&!utils.isEmpty(totalFee)){
		        var param="?t_type=wk&drivingId="+drivingId+"&classId="+classId+"&openId="+openId+"&totalFee="+totalFee+"&couponsid="+v_couponsId+"&orderId="+orderId;
		        window.location.href = "http://wx.dingdongxueche.com/wx2pay/wx/toPay"+param;
		     }else{	    
		       alert("您没有选择未支付订单！");
		     }
		 // }else{	    
		//     alert("您没有未支付订单！");
		  // }
		}catch(e){
			alert("网络出错！");
		}

	});

	//我的订单,我的账户切换
	funs.tabs(".tabx2_parent",".tabx2_child","cur",".isContentTabBox")

	//点击关闭优惠券弹窗
	$(document).on("click",".mask",function(e){
		// $(".tabx2_Content").addClass("animation")
		// $(this).hide();
		// $(".body").removeClass("super_vague");
		//优惠券弹窗开关
		closeOrOpen_mask();
	});
	
	


	//关闭优惠券
	//优惠券
	$(".thisIsMore").each(function(){
		//优惠券详情开关
		showOrHide($(this))
	});

	
	//阻止事件冒泡
	$(document).on("click",".tabx2_Content",function(e){
		e.stopPropagation();
	});



	//我的账户
	if(document.title == "我的账户" || document.title == "我的订单"){
		readBydoAjax();//加载优惠券
	}
	
	//优惠券-关闭或打开详情
	$(document).on("click",".thisIsMore",function(){
		//优惠券详情开关
		showOrHide($(this))
	});

});



var funs = {
	// tab切换方法
	// 参数1：要点击的父标签；
	// 参数2：被点击的标签；
	// 参数3：要添加或者删除的class；
	// 参数4：要切换的内容的class；
	// 参数5：要执行的函数 function(x1,x2);x1代表按钮的下标，可有可无;x2代表this，可有可无，
	tabs : function(_parent, _children, _thisClass, _boxContent, _fun) {
		$("" + _boxContent + "").eq(0).show().siblings(_boxContent).hide();
		
		$("" + _parent + "").find("" + _children + "").click(
			function() {
				var index = $(this).index();
				$("" + _parent + "").find("" + _children + "").removeClass("" + _thisClass + "");
				$(this).addClass("" + _thisClass + "");
				$("" + _boxContent + "").eq(index).show().siblings(_boxContent).hide();
				if (_fun)
					_fun(index, $(this));
				});
	},

	//获取url参数
	getQueryString : function (name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}

};

//优惠券弹窗开关
function closeOrOpen_mask(){
	if($(".tabx2_Content").hasClass("animation")){
		$(".mask").css("display","flex");
		setTimeout(function(){
			$(".body").addClass("super_vague");
			$(".tabx2_Content").removeClass("animation");
		},20);
	}else{
		$(".tabx2_Content").addClass("animation")
		$(".mask").hide();
		$(".body").removeClass("super_vague");
	}
};

//优惠券详情开关
function showOrHide(_this){
	switch(_this.attr("attr")){
		case "show":
		_this.parents(".tabx2_Content").height("2.21rem");
		_this.attr("attr","hide");
		break;
		case "hide":
		_this.parents(".tabx2_Content").height("4rem");
		_this.attr("attr","show");
		break;
	}
};


//我的账户 ajax


var openId = localStorage.getItem("openId");
var param='?openId='+openId+'';
function readBydoAjax(){
    console.log('域名1:'+path);
    console.log('域名2:'+path1);
    
    console.log('链接:'+path+"/wx2pay/coupons/findCoupons"+param);
    $.ajaxDone(path+"/wx2pay/coupons/findCoupons"+param,call_fun);
}

function call_fun(data){
    var json=JSON.parse(data);
    var str = "";//不可用的优惠券结构
    var str1 = "";//可用的优惠券结构
    var str2="";//待使用的优惠券结构
    var flag = 0;//看是否使用了优惠券的状态 1：已使用 2：未使用
    for(var i=0;i<json.length;i++){
        // console.log(json[i].couponsId+'|'+json[i].name+'|'+json[i].moneny+'|'+json[i].startdate+'|'+json[i].enddate+'|'+json[i].content+'|'+(json[i].status>1?'已使用':'未使用'));
        str+=coupons_or(json[i].couponsId,json[i].name,json[i].moneny,json[i].startdate,json[i].enddate,json[i].content,json[i].status,false,json[i].id);
        str1+=coupons_or(json[i].couponsId,json[i].name,json[i].moneny,json[i].startdate,json[i].enddate,json[i].content,json[i].status,true,json[i].id);
    };

    //我的账户显示优惠券
    $("#wdzh").append(str);
    

    if($("#wdzh").html()){
	    if($("#wdzh").html().length == 0){
		  $("#wdzh").append("<p style='color:#333; font-size:.42rem; text-align:center; margin-top:2rem;'>您当前没有优惠券！</p>");
		}
	}

    //我的订单显示优惠券
   if(document.title == "我的订单"){
   	$.ajaxDone(path+"/wx2pay/coupons/queryCoupons"+param,isLen);
   }
    
     
    function isLen(len){
    	//console.log(len+"----------")
		if(len != null){
			var json = JSON.parse(len);
	    	if(json.length>0){
	    		for(var i=0;i<json.length;i++){
	    			if(json[i].status == 1){
	    			str2+=coupons_or(json[i].couponsId,json[i].name,json[i].moneny,json[i].startdate,json[i].enddate,json[i].content,json[i].status,true,json[i].id);
	    			}
	    		}
	    		$("#wddd-mask").append(str2);
	    		if(document.title == "我的订单"){
	    			alert("温馨提示：您有可用优惠券！");
	    		}
	    		
	    		
	    	}else{
				$("#wddd-mask").html("<div class='tabx2_Content animation' style='background:none; border:0; text-align:center; color:#fff; font-size:.46rem;' >您没有可用的优惠券！</div>")
			}
		}else{
			$("#wddd-mask").html("<div class='tabx2_Content animation' style='background:none; border:0; text-align:center; color:#fff; font-size:.46rem;' >您没有可用的优惠券！</div>")
		}
	};
};

//返回优惠券结构；
//参数1：如果_true = true 则返回正常优惠券，否则返回过期优惠券结构
var coupons_or = function(_couponsId,_name,_moneny,_startdate,_enddate,_content,_status,_str,_id){
	var strYes = "";
	var invalid = "";
	var inva = "";
	var status = "";
	if(_status == 1){
		invalid = "";
		inva = "";
		// status = "未使用";

		status = _str?"立即使用":"未使用";

	}else{
		invalid = "invalid";
		inva = '<img src="../images/inva.png" class="inva">';
		status = "已使用";
	}
	
		
	strYes = '<div class="tabx2_Content animation '+invalid+'" id="'+_id+'" couponsId="'+_couponsId+'">'+inva+
					'<div class="thisIsQuan">'+
						'<div class="lf">'+
							'<p class="p1">'+_name+'<span class="erweima"></span></p>'+
							'<p class="p2">使用期限：'+_startdate+'至'+_enddate+'</p>'+
						'</div>'+
						'<div class="rt">'+
							'<p class="p1">￥<span class="ismoney">'+_moneny+'</span>元</p>'+
							'<p class="p2">'+status+'</p>'+
						'</div>'+
					'</div>'+
					'<div class="thisIsMore" attr="hide">查看详细规则</div>'+
					'<div class="thisIsContent">'+
						_content+
					'</div>'+
				'</div>';
	return strYes;
};


/*我的订单-未完成订单*/

var noOrders = function(data){
	var json = JSON.parse(data)
	console.log(json);
	var str = "";
	for(var i = 0; i < json.length; i++){
		 str += '<div class="shopList" classid="'+json[i].classid+'" drivingid="'+json[i].drivingid+'" flag="0">'+
		 		'<div class="radios"><input type="radio" name="ra" /></div>'+
				'<div class="leftContnt">'+
					'<div class="left">'+
						'<img src="http://jx.dingdongxueche.com/JXWeb/editContent/logoupload'+json[i].schoolimg+'" width="100%" height="100%">'+
					'</div>'+
					'<div class="right">'+
						'<p class="p1">'+json[i].name+'--'+json[i].classname+'/'+json[i].licenseLevel+'</p>'+
						'<p class="p2">微信首付款：￥'+json[i].moneny+'（已付）</p>'+
						'<p class="p2">剩余款项：￥<span  class="syprice">'+parseFloat(json[i].surplusmoney).toFixed(2)+'</span></p>'+
					'</div>'+
				'</div>'+
				// '<div class="rightBtn">'+
				// 	'结算'+
				// '</div>'+
			'</div>';
	};
	$("#wwcdd").append(str);
	$(".shopList").eq(0).find("input").attr("checked",true)

	//选择与订单绑定的优惠券
	$(document).on("change",".radios",function(){
		for(var i = 0; i < json.length; i++){
			$(".syprice").eq(i).html(parseFloat(json[i].surplusmoney).toFixed(2))
		}
		$(".thisIsQuan .rt").attr("isTrue","true");
		$(".shopList").attr("flag","0");
		$(".yyhPrice").remove();
		$(this).parents(".shopList").attr("flag","1");
		couponsId = "";
	});
}


$.ajaxDone(path1+"/DDWeb/personal/getUnfinishedOrders.htm"+param,noOrders);



var couponsId='',v_id='',openId='';
$(document).on("click",".thisIsQuan .rt",function(){
	var txt = parseFloat($(this).find(".ismoney").text());
	if($(this).attr("isTrue") != "false"){
		// $(".syprice").html(parseFloat(istext-txt)+"(<span style='color:#F46E2A'>已优惠："+txt+"元</span>)");
		var vobj_checked=$(".radios input:checked").parents(".shopList");
		var vobj=vobj_checked.find(".syprice");
		vobj.html((parseFloat(vobj.text())-txt).toFixed(2));
		vobj_checked.find(".right").append("<p class='yyhPrice' style='color:#F46E2A'>已优惠："+txt+"元</p>");
	}
	$(this).attr("isTrue","false");
	// var istext = $(".syprice").text();
	var   select = $(".radios input:checked").parents(".shopList");
	if(select!=null&&select.text()!=""){
      openId = localStorage.getItem("openId");
         v_id= $(this).parents('.tabx2_Content').attr('id');
    couponsId= $(this).parents('.tabx2_Content').attr('couponsId');
	}else{
		alert('您还没有订单！');
	}

   //var d=new Date().getTime();
   
});


//使用优惠券
function useCoupons(){
	if(!utils.isEmpty(couponsId)&&!utils.isEmpty(openId)&&!utils.isEmpty(v_id)){
  		 var param='?openId='+openId+'&couponsId='+couponsId+'&usercouponsid='+v_id;
		$.ajaxDone(path+"/wx2pay/coupons/useCoupons"+param,call_coupons);
	   var call_coupons=function(data){
	   		if('success'==data){
	   			closeOrOpen_mask();
	   		}else{
	   			alert('网络出错!');
	   		}
	   };
	}
}

/*我的订单-已完成订单*/

//orderstate 2：尾款    3：全款

var yesOrders = function(data){
	var json = JSON.parse(data)
	//console.log("++++++++++++++++++++");
	//console.log(json);
	var str = "";
	for(var i = 0; i < json.length; i++){
		//console.log(!$.isNullOrEmpty(json[i].price))
		//console.log(!$.isNullOrEmpty(json[i].totalprice))
		//console.log(!$.isNullOrEmpty(json[i].orderid))
		if(!$.isNullOrEmpty(json[i].price) && !$.isNullOrEmpty(json[i].totalprice) && !$.isNullOrEmpty(json[i].orderid)){
		 str += '<div class="shopList" classid="'+json[i].classid+'" drivingid="'+json[i].drivingid+'">'+
					'<p class="rightContnt">订单号：<span  class="syprice_orderid">'+json[i].orderid+'</span></p>'+
					'<div class="leftContnt">'+
						'<div class="left">'+
							'<img src="http://jx.dingdongxueche.com/JXWeb/editContent/logoupload'+json[i].schoolimg+'" width="100%" height="100%">'+
						'</div>'+
						'<div class="right">'+
							'<p class="p1">'+json[i].name+'--'+json[i].classname+'/'+json[i].licenseLevel+'</p>'+
							'<p class="p2">原价：￥<span  class="syprice">'+parseFloat(json[i].price).toFixed(2)+'</span></p>'+
							'<p class="p2">实际支付：￥'+parseFloat(json[i].totalprice).toFixed(2)+'（已付）</p>'+
						'</div>'+
					'</div>'+
					
				'</div>'

		}
	};
	$("#ywcdd").append(str);
	// if($("#ywcdd").html() == ){
	// 	alert("当前没有已完成订单！");
	// }
}




$.ajaxDone(path1+"/DDWeb/personal/getFinishedOrders.htm"+param,yesOrders);

$(document).on("click",".thisIsQuan .rt",function(){
	var txt = parseFloat($(this).find(".ismoney").text());
	// var istext = $(".syprice").text();
	if($(this).attr("isTrue") != "false"){
		var vobj_checked=$(".radios input:checked").parents(".shopList");
		var vobj=vobj_checked.find(".syprice");
		vobj_checked.find(".syprice").html((parseFloat(vobj.text())-txt).toFixed(2));
		vobj_checked.find(".right").append("<p class='yyhPrice' style='color:#F46E2A'>已优惠："+txt+"元</p>");
	}
	$(this).attr("isTrue","false");

	$(".tabx2_Content").addClass("animation");
	$(".mask").hide();
	$(".body").removeClass("super_vague");
});


