var PJAX = function(_obj){
	this.default = {
		selector:"", //要把请求来的DOM添加到哪个容器里
		config:{
			timeout:5000 //超时时间
		},
		callback:{
			send:null, //开始请求
			complete:null, //请求完成
			start:null, //准备替换结构
			end:null, //结构替换完毕
			popstate:null, //监听浏览器是前进还是后退
			timeout:null, //超时
		}
		
	}
	_obj && $.extend(this.default,_obj);
	this.init();
};

PJAX.prototype = {
	init:function(){
		var doc = $(document);
		var _this = this;
		var callObj = _this.default.callback;
		for(is in callObj){
			if(callObj[is]){
				doc.pjax(_this.default.selector || 'a.pjax',_this.default.dom, _this.default.config).on('pjax:'+is,function(e){
					var evType = e.type;
					var type = evType.indexOf("pjax:") != -1 ? evType.split(":")[1] : "";
					var func = "_this.default.callback."+type;
					var evalFunc = eval(func);
					evalFunc && evalFunc(e);
				});
			}
		}
	}
};