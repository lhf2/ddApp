

if(typeof $ === "function"){
	var DDPOP = function(){
		var loadingIconStyle = "<style>.gauge-loader:not(:required){background:#6ca;-moz-border-radius-topleft:32px;-webkit-border-top-left-radius:32px;border-top-left-radius:32px;-moz-border-radius-topright:32px;-webkit-border-top-right-radius:32px;border-top-right-radius:32px;display:inline-block;width:64px;height:32px;overflow:hidden;position:relative;text-indent:-9999px}.gauge-loader:not(:required)::before{-moz-animation:gauge-loader 4s infinite ease;-webkit-animation:gauge-loader 4s infinite ease;animation:gauge-loader 4s infinite ease;background:#fff;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;content:'';position:absolute;left:30px;top:5.33px;width:4px;height:26.67px;-moz-transform-origin:50% 100%;-ms-transform-origin:50% 100%;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.gauge-loader:not(:required)::after{content:'';background:#fff;-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px;position:absolute;left:25.6px;top:25.6px;width:12.8px;height:12.8px}@-moz-keyframes gauge-loader{0%{-moz-transform:rotate(-50deg);transform:rotate(-50deg)}10%{-moz-transform:rotate(20deg);transform:rotate(20deg)}20%{-moz-transform:rotate(60deg);transform:rotate(60deg)}24%{-moz-transform:rotate(60deg);transform:rotate(60deg)}40%{-moz-transform:rotate(-20deg);transform:rotate(-20deg)}54%{-moz-transform:rotate(70deg);transform:rotate(70deg)}56%{-moz-transform:rotate(78deg);transform:rotate(78deg)}58%{-moz-transform:rotate(73deg);transform:rotate(73deg)}60%{-moz-transform:rotate(75deg);transform:rotate(75deg)}62%{-moz-transform:rotate(70deg);transform:rotate(70deg)}70%{-moz-transform:rotate(-20deg);transform:rotate(-20deg)}80%{-moz-transform:rotate(20deg);transform:rotate(20deg)}83%{-moz-transform:rotate(25deg);transform:rotate(25deg)}86%{-moz-transform:rotate(20deg);transform:rotate(20deg)}89%{-moz-transform:rotate(25deg);transform:rotate(25deg)}100%{-moz-transform:rotate(-50deg);transform:rotate(-50deg)}}@-webkit-keyframes gauge-loader{0%{-webkit-transform:rotate(-50deg);transform:rotate(-50deg)}10%{-webkit-transform:rotate(20deg);transform:rotate(20deg)}20%{-webkit-transform:rotate(60deg);transform:rotate(60deg)}24%{-webkit-transform:rotate(60deg);transform:rotate(60deg)}40%{-webkit-transform:rotate(-20deg);transform:rotate(-20deg)}54%{-webkit-transform:rotate(70deg);transform:rotate(70deg)}56%{-webkit-transform:rotate(78deg);transform:rotate(78deg)}58%{-webkit-transform:rotate(73deg);transform:rotate(73deg)}60%{-webkit-transform:rotate(75deg);transform:rotate(75deg)}62%{-webkit-transform:rotate(70deg);transform:rotate(70deg)}70%{-webkit-transform:rotate(-20deg);transform:rotate(-20deg)}80%{-webkit-transform:rotate(20deg);transform:rotate(20deg)}83%{-webkit-transform:rotate(25deg);transform:rotate(25deg)}86%{-webkit-transform:rotate(20deg);transform:rotate(20deg)}89%{-webkit-transform:rotate(25deg);transform:rotate(25deg)}100%{-webkit-transform:rotate(-50deg);transform:rotate(-50deg)}}@keyframes gauge-loader{0%{-moz-transform:rotate(-50deg);-ms-transform:rotate(-50deg);-webkit-transform:rotate(-50deg);transform:rotate(-50deg)}10%{-moz-transform:rotate(20deg);-ms-transform:rotate(20deg);-webkit-transform:rotate(20deg);transform:rotate(20deg)}20%{-moz-transform:rotate(60deg);-ms-transform:rotate(60deg);-webkit-transform:rotate(60deg);transform:rotate(60deg)}24%{-moz-transform:rotate(60deg);-ms-transform:rotate(60deg);-webkit-transform:rotate(60deg);transform:rotate(60deg)}40%{-moz-transform:rotate(-20deg);-ms-transform:rotate(-20deg);-webkit-transform:rotate(-20deg);transform:rotate(-20deg)}54%{-moz-transform:rotate(70deg);-ms-transform:rotate(70deg);-webkit-transform:rotate(70deg);transform:rotate(70deg)}56%{-moz-transform:rotate(78deg);-ms-transform:rotate(78deg);-webkit-transform:rotate(78deg);transform:rotate(78deg)}58%{-moz-transform:rotate(73deg);-ms-transform:rotate(73deg);-webkit-transform:rotate(73deg);transform:rotate(73deg)}60%{-moz-transform:rotate(75deg);-ms-transform:rotate(75deg);-webkit-transform:rotate(75deg);transform:rotate(75deg)}62%{-moz-transform:rotate(70deg);-ms-transform:rotate(70deg);-webkit-transform:rotate(70deg);transform:rotate(70deg)}70%{-moz-transform:rotate(-20deg);-ms-transform:rotate(-20deg);-webkit-transform:rotate(-20deg);transform:rotate(-20deg)}80%{-moz-transform:rotate(20deg);-ms-transform:rotate(20deg);-webkit-transform:rotate(20deg);transform:rotate(20deg)}83%{-moz-transform:rotate(25deg);-ms-transform:rotate(25deg);-webkit-transform:rotate(25deg);transform:rotate(25deg)}86%{-moz-transform:rotate(20deg);-ms-transform:rotate(20deg);-webkit-transform:rotate(20deg);transform:rotate(20deg)}89%{-moz-transform:rotate(25deg);-ms-transform:rotate(25deg);-webkit-transform:rotate(25deg);transform:rotate(25deg)}100%{-moz-transform:rotate(-50deg);-ms-transform:rotate(-50deg);-webkit-transform:rotate(-50deg);transform:rotate(-50deg)}}</style>";
		var loadingIcon = '<div class="cell"><div class="card"><span class="gauge-loader"></span></div></div>';

	    this.icon = {
	    	loading:loadingIconStyle+loadingIcon,
	    	// error:,
	    	// success:""
	    }

	    this.value = [""]

		//默认配置
		this.defaultConfig = {
			// btn1:"确定",//第一个按钮的text
			// btn2:"取消",//第二个按钮的text
			button:[],
			//这是格式
			// button:[{
			// 	text:"确定",
			// 	type:"1"   1 或者 2   1为绿色背景按钮 2为白色背景按钮
			// 	callback:null
			// }],
			input:[],
			//这是格式
			// input:[{
			// 	text:"",
			// 	value:"",
			// 	placeholder:"",
			// 	maxlength:""
			// }],
			contenteditable:[],//可编辑的DIV
			//这是格式
			// contenteditable:[{
			// 	text:"",
			// 	value:"",
			// }],
			icontype:"", // || error || success
			dom:"",
			buttonStr:"",
			inputStr:"",
			contenteditableStr:"",
			title:document.title,//设置title
			themeColor:"#2DA94B",
			content:"",//
			width:"auto",//
			height:"auto",//
			maxWidth:$(window).width() *.9+"px",//
			maxHeight:$(window).height()*.6+"px",//
			animatetime:500,//动画速度
			autoClose:null,
			//回调函数
			callback:{
				// btn1:null,//点击第一个按钮执行的方法
				// btn2:null,//点击第二个按钮执行的方法
				close:null,//窗口关闭后执行的方法
				open:null,//窗口打开后执行的方法 及 初始化完成
			},
		},

		this.arrRomId = []//检测是否上一个窗口存在
	};

	DDPOP.prototype = {
		init : function(_content,_title,_options){
			this.id = this.randomNum(10);
			$.extend(this.defaultConfig,_options);
			this.defaultConfig.title = _title || this.defaultConfig.title;
			this.defaultConfig.content = _content || this.defaultConfig.content;
			this.open();
			var _this = this;
			var dd_pop_box = $("#dd"+this.id);
			var dd_pop_btn = dd_pop_box.find(".dd_pop_btn");
			var len = dd_pop_box.find(dd_pop_btn).length;
			this.defaultConfig.dom = dd_pop_box;
			$("#dd"+this.id).find(".dd_btn").click(function(){
				var index = parseInt($(this).attr("index"));
				var ang = {
					text:_this.defaultConfig.content,
					title:_this.defaultConfig.title,
					that:_this,
					btn:$(this)
				}
				if(_this.defaultConfig.input.length > 0){
					var inputArr = [];
					for(var i = 0; i < _this.defaultConfig.input.length; i++){
						var val = dd_pop_box.find(".promptVal").eq(i).val();
						inputArr.push(val);
					}
					$.extend(ang,{
						value:inputArr
					});

					_this.value = contenteditableArr;
				}

				if(_this.defaultConfig.contenteditable.length > 0){
					var contenteditableArr = [];
					for(var i = 0; i < _this.defaultConfig.contenteditable.length; i++){
						var val = dd_pop_box.find(".contenteditableVal").eq(i).html();
						contenteditableArr.push(val);
					}
					$.extend(ang,{
						value:contenteditableArr
					});
					_this.value = contenteditableArr;
				}

				

				_this.defaultConfig.button[index].callback &&
				_this.defaultConfig.button[index].callback(ang);
			});

			// $("#dd"+this.id).find(".dd_btn").eq(0).click(function(){
			// 	if(_this.defaultConfig.state) {
			// 		_this.close();
			// 	}
			// 	if(_this.defaultConfig.callback.btn1){
					
			// 		if(_this.defaultConfig.type == "prompt"){
			// 			$.extend(ang,{
			// 				value:$("#dd"+_this.id+" .promptVal").val(),
			// 			})
			// 		}
			// 		_this.defaultConfig.callback.btn1(ang);
			// 	}else{
			// 		return true
			// 	}
			// });



			// if(this.defaultConfig.type == "confirm" || this.defaultConfig.type == "prompt"){
			// 	dd_pop_btn.append("<div class='dd_btn'>"+this.defaultConfig.btn2+"</div>");
			// }

			
			// $("#dd"+this.id).find(".dd_btn").eq(1).click(function(){
			// 	_this.close();
			// 	if(_this.defaultConfig.callback.btn2){
			// 		_this.defaultConfig.callback.btn2();
			// 	}else{
			// 		return false
			// 	}
			// });

		},
		//打开窗口
		open : function(){

			this.defaultConfig.buttonStr = "";
			this.defaultConfig.inputStr = "";
			this.defaultConfig.contenteditableStr = "";
			for(var i = 0; i < this.defaultConfig.button.length; i++){
				this.defaultConfig.buttonStr += '<div class="dd_btn '+(this.defaultConfig.button[i].type == "1" ? "" : "cur")+'" index="'+i+'">'+this.defaultConfig.button[i].text+'</div>'
			}
			for(var i = 0; i < this.defaultConfig.input.length; i++){
				this.defaultConfig.inputStr += "<div class='inputBox'><span class='text'>"+(this.defaultConfig.input[i].text || "")+"</span><input class='promptVal' maxlength='"+(this.defaultConfig.input[i].maxlength || "")+"' placeholder='"+(this.defaultConfig.input[i].placeholder || "")+"' type='text' value='"+(this.defaultConfig.input[i].value || "")+"' /></div>"
			}
			for(var i = 0; i < this.defaultConfig.contenteditable.length; i++){
				this.defaultConfig.contenteditableStr += "<div class='contenteditableBox'><span class='text'>"+(this.defaultConfig.contenteditable[i].text || "")+"</span><div class='contenteditableVal'  contenteditable='true'>"+(this.value?this.value[i]:"")+"</div></div>"
			}



			
			this.creatHtml();
			var dd_pop_box = $("#dd"+this.id);
			this.defaultConfig.dom = dd_pop_box;

			this.option = {
				contenteditable:{
					append:function(_str){
						dd_pop_box.find(".contenteditableVal").append(_str);
					},
					html:function(_str){
						dd_pop_box.find(".contenteditableVal").html(_str);
					}
				},
				input:{
					val:function(_str){
						dd_pop_box.find(".promptVal").val(_str);
					}
				}
			}

			var _this = this;
				//当有新的弹窗出现时，删除旧的。始终保持一个。
				//if(_this.defaultConfig.state){
				//	console.log(_this.defaultConfig);
				//	_this.arrRomId.push(_this.id);
				//	_this.close($("#dd"+_this.arrRomId[1]),true);
				//	_this.arrRomId.splice(1,2);
				//	_this.arrRomId.push(_this.id);
				//}
				if(this.defaultConfig.input){
					dd_pop_box.find(".dd_pop_content").append(this.defaultConfig.inputStr);
					dd_pop_box.find(".promptVal").eq(0).focus();
				};

				if(this.defaultConfig.contenteditable){

					dd_pop_box.find(".dd_pop_content").append(this.defaultConfig.contenteditableStr);
					dd_pop_box.find(".contenteditableVal").eq(0).focus();
				};

				dd_pop_box.css({
					"transform":"translate(0,1rem)",
					"opacity":"1"
				});


				dd_pop_box.parent().css("background","rgba(0,0,0,.5)");
				var ang = {
					text:_this.defaultConfig.content,
					title:_this.defaultConfig.title,
					that:_this
				}
				setTimeout(function(){
					_this.defaultConfig.callback.open && _this.defaultConfig.callback.open(ang);
				},_this.defaultConfig.animatetime);

				if(_this.defaultConfig.autoClose){
					var autoCloseTimeout = setTimeout(function(){
						_this.close();
					},_this.defaultConfig.autoClose);
				}
				
		},
		//关闭窗口
		close : function(_ele,_false){
			var _this = this;
			var isbox = $("#dd"+this.id);
			if(_ele){
				isbox = _ele;
			}
			isbox.css({
				"transform":"translate(0,0)",
				"opacity":"0"
			}).parent().css("background", "rgba(0,0,0,0)");
			setTimeout(function () {
				isbox.parent().remove();
				if (!_false) {
					_this.defaultConfig.callback.close && _this.defaultConfig.callback.close()
				}
			}, _this.defaultConfig.animatetime);
		},
		//创建节点
		creatHtml : function(){
			var css = 	'<style>'+
							'.dd_pop_msk{position:fixed; z-index:9999; left:0; right:0; top:0; bottom:0; background:rgba(0,0,0,0); transition:'+this.defaultConfig.animatetime/1000+'s;}'+
							'.dd_pop_box{ width:'+this.defaultConfig.width+'; height: '+this.defaultConfig.height+';overflow:hidden; border:.01rem solid #ccc; position: relative; z-index: 9999; background-color: #fff; transform: translate(0,0); opacity:0; transition: '+this.defaultConfig.animatetime/1000+'s;border-radius: .06rem;margin:0 .2rem;max-width:'+this.defaultConfig.maxWidth+'; margin:0 auto;}'+
						    '.dd_pop_title{font-size: .32rem; position: relative; line-height: .6rem;padding-left: .1rem; padding-right: .6rem; box-shadow:0 .01rem .05rem .01rem '+this.defaultConfig.themeColor+'; }'+
						    '.dd_pop_content{ height:100%;max-height:'+this.defaultConfig.maxHeight+'; overflow:auto;background-color: #fff; font-size: .32rem; color: #333;min-width:2rem; padding:.2rem .2rem 0;text-align: center; margin:0 auto;}'+
						    '.dd_pop_content .inputBox,.dd_pop_content .contenteditableBox{display: flex;-webkit-display: flex;line-height:.5rem; margin:.2rem 0 0; -webkit-justify-content: space-between;justify-content: center;}'+
						    '.dd_pop_content .inputBox .text{maxWidth:3rem; text-align:right; margin-right:.2rem;}'+
						    '.dd_pop_content .promptVal{border:1px solid; color:'+this.defaultConfig.themeColor+'; border-radius:.1rem; padding: 0 .2rem; box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;line-height:.5rem; font-size:.3rem;}'+
							'.dd_pop_content .contenteditableVal{border:1px solid; color:'+this.defaultConfig.themeColor+'; border-radius:.1rem; padding: 0 .2rem; box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box; font-size:.3rem; text-align:left; margin-left:.2rem; max-height:5rem; overflow:auto; width:100%}'+
						    '.dd_pop_content .contenteditableVal img{width:.4rem; height:.4rem; display:inline;}'+
						    '.dd_pop_btn{display: flex;-webkit-display: flex; flex-wrap:wrap; -webkit-justify-content: center;justify-content: center; font-size: .32rem; padding:.2rem .1rem .2rem; margin:0 .5rem; max-height:8rem; overflow:auto; }'+
						    '.dd_pop_btn .dd_btn{margin: .1rem; border:1px solid;border-radius:.15rem; color:'+this.defaultConfig.themeColor+';padding: .1rem 0; width:2rem; text-align:center; font-size: .32rem;}'+
						    '.dd_pop_btn .dd_btn.cur{background-color: '+this.defaultConfig.themeColor+'; color: #fff; border-color: '+this.defaultConfig.themeColor+';}'+
						    '#addface img{width:11%; float:left;}'+
					    '</style>';
			var html = 	'<div class="dd_pop_msk">'+
							css+
							'<div class="dd_pop_box" id="dd'+this.id+'">'+
							    '<div class="dd_pop_title">'+this.defaultConfig.title+'</div>'+
							    '<div class="dd_pop_content">'+(this.defaultConfig.icontype?this.icon[this.defaultConfig.icontype]:"")+this.defaultConfig.content+'</div>'+
							    '<div class="dd_pop_btn">'+
							    	this.defaultConfig.buttonStr
							    	// '<div class="dd_btn cur">确定</div>'+
							    '</div>'+
							 '</div>'+
						'</div>';
			$("body").append(html);
			var box = $('#dd'+this.id+'');
			this.center(box);
			var _this = this;
			/*box.find(".dd_pop_btn .dd_btn").eq(0).text(this.defaultConfig.btn1);
			box.find(".dd_pop_btn .dd_btn").eq(1).text(this.defaultConfig.btn2);*/
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

	//普通弹窗
	window.alert = function(_content,_title,_options){
		var a = new DDPOP();
		var obj = {
				button:[{
					text:"确定",
					callback:function(){
						a.close();
					}
				}]
			}

		$.extend(obj,_options);
		a.init(_content,_title,obj);
	};

	//无按钮自动关闭弹窗
	window.autoClose = function(_content,_title,_options){
		var a = new DDPOP();
		var obj = {
				autoClose:1000
			}
		$.extend(obj,_options);
		a.init(_content,_title,obj);
	};

	//快捷实例方式
	window.ddpop = function(_content,_title,_options){
		var a = new DDPOP();
		a.init(_content,_title,_options);
	};

	//评论专用
	window.faceComment = function(_callback){
  			var a = new DDPOP();
			(function faceAlert(){
	  			var emoji = {
		          f001 : "[大笑]",
		          f002 : "[满足]",
		          f003 : "[挤眼]",
		          f004 : "[吐舌头]",
		          f005 : "[亲亲]",
		          f006 : "[飞吻]",
		          f007 : "[憨笑]",
		          f008 : "[狡猾]",
		          f009 : "[害羞]",
		          f010 : "[哭笑]",
		          f011 : "[痛哭]",
		          f012 : "[傻眼]",
		          f013 : "[无奈]",
		          f014 : "[囧]",
		          f015 : "[惊呼]",
		          f016 : "[生气]",
		          f017 : "[愤怒]",
		          f018 : "[开心]",
		          f019 : "[微笑]",
		          f020 : "[鬼脸]",
		          f021 : "[色]",
		          f022 : "[汗]",
		          f023 : "[尴尬]",
		          f024 : "[苦逼]",
		          f025 : "[咖啡]",
		          f026 : "[感冒]",
		          f027 : "[鄙视]",
		          f028 : "[甜蜜]",
		          f029 : "[胜利]",
		          f030 : "[赞]",
		          f031 : "[心碎]",
		          f032 : "[玫瑰]",
		          f033 : "[大便]",
		          f034 : "[猪]",
		          f035 : "[爱情]",
		          f036 : "[西瓜]"
		        };

		        a.init("<div id=\"addface\" style=\"display:none; overflow:hidden;\"></div>","评论",{
		  			contenteditable:[{
		  				text:"<img style=\" width:.6rem; height:.6rem; \" src=\" ../images/huaji.jpg\" id=\"comface\" />",
		  				maxlength:2,
		  			}],
		  			button:[{
		  				text:"发送",
		  				callback:function(obj){
		  					content=obj.value[0];
						    for(var i = 0; i < 36; i++){
						        var n = "0";
						        if(i < 9){
						            n = "00";
						        }else{
						            n = "0";
						        }
						        var patt1 = new RegExp('<img src="http://101.201.146.79:8088/emoji/f'+n+(i+1)+'.png">',"g");
						        content = content.replace(patt1,emoji["f"+n+(i+1)]);
						    }
		  					obj.that.close();
		  					if($.trim(content) == ""){
		  						autoClose("请输入内容","",{
		  							callback:{
		  								close:faceAlert
		  							}
		  						})
		  					}else if(content.length > 200){
		  						autoClose("内容不能大于200字，请重试！","",{
		  							callback:{
		  								close:faceAlert
		  							}
		  						})
		  					}else{
		  						_callback && _callback(obj.value[0]);
		  					}
		  				}
		  			},{
		  				text:"取消",
		  				type:"1",
		  				callback:function(obj){
		  					obj.that.close();
		  				}
		  			},],
		  			callback:{
		  				open:function(obj){
		  					$("#addface").html(faceStr());
		  					$("#comface").click(function(){
		  						$("#addface").toggle();
		  					});

		  					$("#addface").on("click","img",function(){
		  						var str = $(this)[0].outerHTML;
		  						obj.that.option.contenteditable.append(str);
		  					})
		  				}
		  			}
		  		});

		         function faceStr(_dom){
		        	var str = "";
			        for(var i = 0; i < 36; i++){
			            var n = "0";
			            if(i < 9){
			                n = "00";
			            }else{
			                n = "0";
			            }
			            str += '<img src="http://101.201.146.79:8088/emoji/f'+n+(i+1)+'.png">'; 
			        }

			        return str
		        }
	  		})();
  		}
};