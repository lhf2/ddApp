//替换
//参数类型：string
//例：string.replacing(_a,_b)
//在string里，把_a替换成_b
String.prototype.replacing = function(_a,_b){
	var reg = new RegExp(_a,"g"); 
	var newstr = this.replace(reg,_b);
	return newstr
};


//不区分大小写
//参数类型：string
//例：string.disting(_a)
//在string里，_a不区分大小写
String.prototype.disting = function(_a){
	var str = this.match(new RegExp(_a, 'i'));
	return str
};

//获取或者更改文本颜色
$.prototype.color = function(_color){
	var c;
	if(_color){
		this.css("color",_color);
		c = this;
	}else{
		c = this.css("color");
	}
	return c
}

//基于屏幕居中
//参数1：设置宽度，并以这个宽度居中（可选）
//参数2：设置高度，并以这个高度居中（可选）
$.prototype.center = function(_w,_h){
	var w = $(window).width(),h = $(window).height()
	this.css({"position":"fixed"});
	var thisW = this.width(),thisH = this.height();
	if(_w){
		thisW = _w;
		this.width(_w)
	};
	if(_h){
		thisH = _h;
		this.height(_h)
	};
	this.css({"left":(w-thisW)/2,"top":(h-thisH)/2});
	return this
}

//拖拽
//参数1：id
//参数2：移动距离限制 {x:number,y:number,minx:,miny:}
$.prototype.mousePull = function(_click,_obj){
	var isDown = false;
	var box_X = 0;
	var box_Y = 0;
	var _this = this;
	var is = this;
	var thisIs;
	var transition;
	var obj = {};
	var xy = {};
	
	if(_click) is = _click;
	is.mousedown(function(e){
		thisIs = $(this);
		transition = thisIs.css("transition");
		thisIs.css("transition","position 0s")
		box_X = e.pageX - (thisIs.offset().left)+($("html").scrollLeft())
		box_Y = e.pageY - (thisIs.offset().top)+($("html").scrollTop())
		thisIs.css("opacity",".8");
		isDown = true;
		obj = {
			x:$(window).width(),
			y:$(window).height(),
			minx:0,
			miny:0,
			callback:null
		};
		$.extend(obj,_obj);

	});
	

	
	$(document).mousemove(function(e){
		if(isDown == true){
			
			if((e.clientY - box_Y) >= obj.y){
				thisIs.css("top", obj.y)
			}else if((e.clientY - box_Y) <= obj.miny){
				thisIs.css("top", 0);
			}else{
				thisIs.css({
					'top':(e.clientY - box_Y) + 'px',
				});
			}

			
			if((e.clientX - box_X) >= obj.x){
				thisIs.css("left", obj.x)
			}else if((e.clientX - box_X) <= obj.minx){
				thisIs.css("left", 0);
			}else{
				thisIs.css({
					'left':(e.clientX - box_X) + 'px',
				});
			}

			xy = {
				x:parseInt(thisIs.css("left")),
				y:parseInt(thisIs.css("top")),
			}

			obj.callback && obj.callback(xy)
		}


	});

	$(document).mouseup(function(e){
		if(isDown == true){
			thisIs.css("opacity","1");
			thisIs.css("transition",transition)
		}
		isDown = false;
	});
};


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
				$("" + _parent + "").find("" + _boxContent + "").eq(index).show().siblings(_boxContent).hide();
				if (_fun)
					_fun(index, $(this));
				});
	},

	//获取url参数
	getQueryString : function (name){
	     // var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     // var r = window.location.search.substr(1).match(reg);
	     // if(r!=null)return  unescape(r[2]); return null;
	     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
		    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
		    var context = "";  
		    if (r != null)  
		         context = r[2];  
		    reg = null;  
		    r = null;  
		    return decodeURI(context == null || context == "" || context == "undefined" ? "" : context);  
	},

	//计算时间之间差了多少小时
	//参数   "xx:xx","xx:xx"
	getH : function (_time1,_time2) {
		var time = this.getS(_time1) - this.getS(_time2);
		return Math.abs(time/60/60)
	},

	//将时间换算成秒
	//参数   "xx:xx"
	getS : function (_time) {
		var time = _time.split(":");
		var HS = parseInt(time[0]*60*60);
		var MS = parseInt((time[1]*.6)*100);
		var isH = parseInt(HS + MS);
		return isH
	}


};




