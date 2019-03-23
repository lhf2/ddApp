//API
//使用的时候默认属性会被继承，如不需要继承，将该属性重新赋值为flase
//.default{
// 	btn1:第一个按钮的value,
//  btn2:第二个按钮的value
// }


if(typeof $ === "function"){
	var DDPOP = function(){
		//默认配置
		this.defaultConfig = {
			btn1:"确定",//第一个按钮的text
			btn2:"取消",//第二个按钮的text
			title:document.title,//设置title
			content:"",//
			width:"auto",//
			height:"auto",//
			maxWidth:$(window).width() *.9+"px",//
			maxHeight:$(window).height() *.9+"px",//
			animatetime:300,//动画速度
			type:"alert",//；类型
			value:"",//如果是prompt类型的话，默认的input的value
			state:true,
			//回调函数
			callback:{
				btn1:null,//点击第一个按钮执行的方法
				btn2:null,//点击第二个按钮执行的方法
				close:null,//窗口关闭后执行的方法
				open:null,//窗口打开后执行的方法
			},
		},

		this.arrRomId = []//检测是否上一个窗口存在
	};

	DDPOP.prototype = {
		init : function(_content,_title,_options){
			this.id = this.randomNum(10);
			this.option = $.extend(this.defaultConfig,_options);
			this.defaultConfig.title = _title || this.defaultConfig.title;
			this.defaultConfig.content = _content || this.defaultConfig.content;
			this.open();
			var _this = this;
			var dd_pop_box = $("#dd"+this.id);
			var dd_pop_btn = dd_pop_box.find(".dd_pop_btn");
			var len = dd_pop_box.find(dd_pop_btn).length;
			var rtClose = dd_pop_box.find(".dd_close");
			rtClose.on("click",function(){
				_this.close();
			});
			$("#dd"+this.id).find(".dd_btn").eq(0).click(function(){
				if(_this.defaultConfig.state) {
					_this.close();
				}
				if(_this.defaultConfig.callback.btn1){
					var ang = {
						type:_this.defaultConfig.type,
						text:_this.defaultConfig.content,
						title:_this.defaultConfig.title
					}
					if(_this.defaultConfig.type == "prompt"){
						$.extend(ang,{
							value:$("#dd"+_this.id+" .promptVal").val(),
						})
					}
					_this.defaultConfig.callback.btn1(ang);
				}else{
					return true
				}
			});



			if(this.defaultConfig.type == "confirm" || this.defaultConfig.type == "prompt"){
				dd_pop_btn.append("<div class='dd_btn'>"+this.defaultConfig.btn2+"</div>");
			}

			
			$("#dd"+this.id).find(".dd_btn").eq(1).click(function(){
				_this.close();
				if(_this.defaultConfig.callback.btn2){
					_this.defaultConfig.callback.btn2();
				}else{
					return false
				}
			});

		},
		//打开窗口
		open : function(){

			this.creatHtml();
			var dd_pop_box = $("#dd"+this.id);
			var _this = this;
				//当有新的弹窗出现时，删除旧的。始终保持一个。
				//if(_this.defaultConfig.state){
				//	console.log(_this.defaultConfig);
				//	_this.arrRomId.push(_this.id);
				//	_this.close($("#dd"+_this.arrRomId[1]),true);
				//	_this.arrRomId.splice(1,2);
				//	_this.arrRomId.push(_this.id);
				//}
				if(this.defaultConfig.type == "prompt"){
					var inputStr = "<p><input class='promptVal' type='text' value='"+this.defaultConfig.value+"' /></p>";
					dd_pop_box.find(".dd_pop_content").append(inputStr);
					 dd_pop_box.find(".promptVal").focus();				};
				
				dd_pop_box.css({
					"transform":"scale(1)",
					"opacity":"1"
				});


				dd_pop_box.parent().css("background","rgba(0,0,0,.5)");
				setTimeout(function(){
					_this.defaultConfig.callback.open && _this.defaultConfig.callback.open();
				},_this.defaultConfig.animatetime);
		},
		//关闭窗口
		close : function(_ele,_false){
			var _this = this;
			var isbox = $("#dd"+this.id);
			if(_ele){
				isbox = _ele;
			}
			isbox.css({
				"transform":"scale(1.2) ",
				"opacity":"0"
			}).parent().css("background", "rgba(0,0,0,0)");
			setTimeout(function () {
				isbox.parent().remove();
				if (!_false) {
					_this.defaultConfig.callback.close && _this.defaultConfig.callback.close();
				}
			}, _this.defaultConfig.animatetime);
		},
		//创建节点
		creatHtml : function(){
			var css = 	'<style>'+
							'.dd_pop_msk{position:fixed; left:0; right:0; top:0; bottom:0;z-index:9999; background:rgba(0,0,0,0); transition:background '+this.defaultConfig.animatetime/1000+'s; display:flex; justify-content: center;align-items: center;}'+
							'.dd_pop_box{ width:'+this.defaultConfig.width+'; height: '+this.defaultConfig.height+';max-width:'+this.defaultConfig.maxWidth+';max-height:'+this.defaultConfig.maxHeight+';border:.01rem solid #ccc; position: relative; z-index: 9999; background-color: #fff; transform:scale(1.5); opacity:0; transition: '+this.defaultConfig.animatetime/1000+'s;border-radius: .06rem;}'+
						    '.dd_pop_title{font-size: .32rem; position: relative; line-height: .6rem;padding-left: .1rem; padding-right: .6rem; }'+
						    '.dd_pop_title .dd_close{ position: absolute; right: 0; top: 0;  height: 100%;min-width: .6rem; text-align: center; color: #888;}'+
						    '.dd_pop_content{ height:100%; overflow:auto;background-color: #fff; font-size: .32rem; color: #333;min-width:2rem; padding: .2rem;text-align: center;}'+
						    '.dd_pop_content .promptVal{border:1px solid; color:#2DA94B; border-radius:.1rem; padding: 0 .2rem; box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box; margin:.2rem 0; line-height:.5rem; font-size:.3rem; width:100%;}'+
						    '.dd_pop_btn{display: flex;-webkit-display: flex; -webkit-justify-content: center;justify-content: center; font-size: .32rem; padding:.1rem; margin:0 .5rem; }'+
						    '.dd_pop_btn .dd_btn:first-child{margin-left: 0;}'+
						    '.dd_pop_btn .dd_btn{margin-left: .5rem; border:1px solid;border-radius:.15rem; color:#2DA94B;padding: .1rem .4rem; font-size: .32rem;}'+
						    '.dd_pop_btn .dd_btn.cur{background-color: #2DA94B; color: #fff; border-color: #2DA94B;}'+
					    '</style>';
			var html = 	'<div class="dd_pop_msk">'+
							css+
							'<div class="dd_pop_box" id="dd'+this.id+'">'+
							    '<div class="dd_pop_title">'+this.defaultConfig.title+'<span class="dd_close">x</span></div>'+
							    '<div class="dd_pop_content">'+this.defaultConfig.content+'</div>'+
							    '<div class="dd_pop_btn">'+
							    	'<div class="dd_btn cur">确定</div>'+
							    '</div>'+
							 '</div>'+
						'</div>';
			$("body").append(html);
			var box = $('#dd'+this.id+'');
			this.center(box);
			var _this = this;
			box.find(".dd_pop_btn .dd_btn").eq(0).text(this.defaultConfig.btn1);
			box.find(".dd_pop_btn .dd_btn").eq(1).text(this.defaultConfig.btn2);
		},
		//基于屏幕居中
		//参数说明：
		//_e:要居中的ID（必须）
		//_w手动设置宽度并基于这个宽度居中
		//_h:手动设置高度并基于这个高度居中
		center : function(_e,_w,_h){
			var w = $(window).width(),h = $(window).height();
			var thisW = _e.width();
			var thisH = _e.height();
			if(_w){
				thisW = _w;
				_e.width(_w)
			}
			if(_h){
				thisH = _h;
				_e.height(_h)
			}

			return this
		},
		//随机数
		//len：随机几位数字
		randomNum : function(len){
			var m = "";
			for(var i = 0; i < len; i++){
				m+=Math.floor(Math.random()*10);
			}
			return m;
		}
	};
	window.alert = function(_content,_title,_options){
		var a = new DDPOP();
		a.init(_content,_title,_options)
	};
	window.confirm = function(_content,_title,_options){
		var c = new DDPOP();
		c.defaultConfig.type = "confirm";
		c.init(_content,_title,_options);
	};
	window.prompt = function(_content,_title,_options){
		var c = new DDPOP();
		c.defaultConfig.type = "prompt";
		c.init(_content,_title,_options);
	};
};