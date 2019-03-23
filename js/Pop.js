			//需要new一个Pop对象：var xx = new Pop();
			//xx.init("内容"，"标题"，"点击确定后执行的方法")
			//标题留空则默认显示"标题"
			var strCss = '<style type="text/css">'+
						'.alertMask{z-index:999; position:fixed; left:0;bottom:0;top:0;right:0;}'+
						'.alert_box{z-index:999;font-family:"微软雅黑"; overflow: hidden; border-radius:10px; border: 1px solid #dfdfdf; border-top: 0; position: fixed; left: 50%; top: 50%; box-shadow: 0px 0px 10px 0px #000; background-color: #f1f1f1;}'+
						'.rightTopClose{transition:.3s; cursor:pointer; box-shadow:0px 0px 2px 1px red; position:absolute; right:10px; top:10px;display:inline-block;background:red;width:20px;height:20px;border-radius:50%;opacity:.8;}'+
						'.rightTopClose:hover{transform:scale(1.2,1.2);}'+
						'.alert_title{white-space:nowrap;transition:.3s;-webkit-user-select: none; -ms-user-select: none; -moz-user-select: non-khtml-user-select: none; user-select: none; display: block; width: 100%; line-height: 40px; padding: 0px 20px;border-bottom:1px solid; background:rgba(53,53,53,1); color: #fff; font-size: 18px;cursor:pointer;}'+
						'.alert_title:hover{background:rgba(53,53,53,.8)}'+
						'.alert_content{ margin:20px auto; line-height: 24px;padding:0 20px;overflow: auto;}'+
						'.typeButton { overflow: hidden; text-align: center; height: 30px; margin:10px auto;}'+
						'.typeButton .button_click{ min-width:50px;padding:0 7px; border-radius: 5px; text-align: center;height: 30px; line-height: 30px; background-color: #01A5A6; color: #fff; display: inline-block; cursor: pointer; margin-left: 20px;}'+
						'.typeButton .button_click:nth-child(1){margin-left: 0;}'+
						'.outTime{font-size:14px;margin-left:10px;}'+
						'</style>'
			
			$("head").append(strCss);
			
				//var arrRomId = [];用来检测当前是否有弹窗存在；

			//方法
			var otherFun = {
				//随机数
				//len：随机几位数字
				randomNum:function(len){
					var m = "";
					for(var i = 0; i < len; i++){
						m+=Math.floor(Math.random()*10);
					}
					return m;
				},
			};

			//默认配置
			var Pop = function(){
				//配置
				this.arrRomId = [];//检测是否上一个窗口存在
				this.height_Max = "auto";//最大高度
				this.width_Max = "auto";//最大宽度
				this.animate_range = 0.6;//过渡动画幅度 0-2之间
				this.animate_speed = 200;//过渡动画速度,0为关闭
				this.title = "提示";//默认标题
				this.content = null;//内容
				this.type = false;//false为一个确定按钮，true为一个取消一个确定按钮
				this.btn1 = "确定";//第一个按钮的文字
				this.btn2 = "取消";//第二个按钮的文字
				this.btn3 = "关闭";//第二个按钮的文字
				this.state = true;//点击确定后，是否让当前窗口消失；默认为消失(true)
				this.state2 = true;//点击取消后，是否让当前窗口消失；默认为消失(true)
				this.states = true;//点击任何按钮后，是否让当前窗口消失；默认为消失(true)
				this.close_fun = false;//只要窗口关闭就执行的代码
				this.open_fun = false;//窗口加载完毕时执行的代码；
				this.mousePull = true;//默认开启拖拽;
				this.autoClose = false;//窗口默认不自动关闭，参数为x秒;
				this.prohibit = false;//禁止弹窗 设置为true，则不会弹出窗口;
			};


			//参数1：内容
			//参数2：标题
			//参数3：点击第一个按钮执行的方法
			//参数4：点击第二个按钮执行的方法
			//参数5：点击第三个按钮执行的方法

			Pop.prototype.init = function(_content,_title,_fun,_fun2,_fun3){
				if(this.prohibit == false){
					//随机ID,不产生重复ID
					this.id = "alert_box_"+otherFun.randomNum(10);
					this.maskId = "alertMask"+otherFun.randomNum(10);
					this.htmlStr = '<div class="alertMask" id="'+this.maskId+'"></div><div class="alert_box" id="'+this.id+'"><span class="rightTopClose"></span><span class="alert_title">这是标题</span>'+
							 	  '<div class="alert_content"></div><div class="typeButton"></div></div>';
					$(this.htmlStr).appendTo("body");
					//弹窗的ID
					var alert_box = $("#"+this.id+"");
					var alert_content = alert_box.find(".alert_content");
					this.alert_title = alert_box.find(".alert_title");
					this.alert_content = alert_box.find(".alert_content");
					this.typeButton = alert_box.find(".typeButton");
					this.button = $("<div class='button_click'></div>");
					
					//如果title不存在，则使用默认value
					_title?(this.title = _title):"";
					_fun?(this.type = true):this.type = false;
					this.content = _content;
					this.button.appendTo(this.typeButton)
					this.alert_title.text(this.title);
					this.alert_content.html(""+this.content);
					var _this = this;
					
					//拖拽
					if(this.mousePull) mousePull(alert_box.find(".alert_title"),alert_box);
					
					//遮罩
					$(".alertMask").click(function(){
						alert_box.stop(false,true).animate({
							"opacity":".5"
						},100).animate({
							"opacity":"1"
						})
					});
					
					//如果存在函数，则显示两个按钮（确定和取消）
					if(this.type == true){
						//两个按钮的时候
						this.button.text(this.btn1).on("click",function(){
							_fun();
							if(_this.state && _this.states){
								animate_close(alert_box);
							}else{
								alert_box.stop().animate({
									"opacity":".5"
								},100).animate({
									"opacity":"1"
								})
							}
						});
						this.button.clone().text(this.btn2).appendTo(this.typeButton).on("click",function(){
							if (_fun2) _fun2();
							if(_this.state2 && _this.states){
								animate_close(alert_box);
							}else{
								alert_box.stop().animate({
									"opacity":".5"
								},100).animate({
									"opacity":"1"
								})
							}
						});
						if(_fun3){
							this.button.clone().text(this.btn3).appendTo(this.typeButton).on("click",function(){
								if (_fun3) _fun3();
							});
						};
					}else{
						//一个按钮的时候
						this.button.text(this.btn1).on("click",function(){
							animate_close(alert_box);
						})
					};
					//点击红点关闭
					alert_box.find(".rightTopClose").on("click",function(){
							animate_close(alert_box);
					});

					

					//窗口的最大宽高
					alert_box.find(".alert_content").css({
						"max-height":this.height_Max,
						"max-width":this.width_Max
					});
					//--------弹窗过度动画--------
					//窗口实际宽高
					var alert_box_h = alert_box.height(),
						alert_box_w = alert_box.width()+5,
						alert_content_w = alert_box.find(".alert_content").width()+5;
						alert_title_w = alert_box.find(".alert_title").width()+40;
//						alert_content_h = alert_box.find(".alert_content").height()+40;
						if(alert_title_w>alert_box_h){
							alert_content_w = alert_title_w;
						};
						alert_box.find(".alert_content").width(alert_content_w);
						alert_box.find(".alert_title").width(alert_title_w);
						if(alert_box_h > $(window).height()){
							alert_box_h = $(window).height();
						};
					//窗口打开
					var animate_open = function(){
						
							alert_box.height(alert_box_h*_this.animate_range).width(alert_box_w*_this.animate_range).css({
								"opacity":0.5,
								"margin-left":-alert_box.width()/2,
								"margin-top":-alert_box.height()/2
							});
							alert_box.animate({
								"height":alert_box_h+"px",
								"width":alert_box_w+"px",
								"margin-left":-alert_box_w/2+"px",
								"margin-top":-alert_box_h/2+"px",
								"opacity":1
							},_this.animate_speed,function(){
								if(_this.open_fun) _this.open_fun(alert_box);
							});
					};
					//弹窗关闭。
					//参数1：要关闭的窗口【必须】；
					//参数2：窗口关闭后要执行的方法；
					var animate_close = function(id,_fun){
						$("#"+_this.maskId+"").remove();
						if(_fun) _fun();
						id.animate({
							// "height":_this.animate_range,
							// "width":_this.animate_range,
							// "margin-left":-_this.animate_range/2+"px",
							// "margin-top":-_this.animate_range/2+"px",

							"height":alert_box_h*_this.animate_range,
							"width":alert_box_w*_this.animate_range,
							"margin-left":-alert_box_w*_this.animate_range/2+"px",
							"margin-top":-alert_box_h*_this.animate_range/2+"px",
							"opacity":0
						},_this.animate_speed,function(){
							if(_this.close_fun) _this.close_fun();
							id.remove();
						});
							
						}
					
					animate_open();


					//如果this.close_fun存在，则不让消失窗口
					if(_this.close_fun) _this.state = false;
					
					//当有新的弹窗出现时，删除旧的。始终保持一个。
					if(_this.state){
						animate_close($("#"+_this.arrRomId[0]));
						
						_this.arrRomId.splice(0,1);

						_this.arrRomId.push(_this.id);
					};
					//窗口消失倒计时
					if(this.autoClose){
						var timer = null;
						var outTime = parseInt(this.autoClose);
						var $span = $("<span class='outTime'></span>")
						alert_box.find(_this.alert_title).append($span.text("("+(outTime)+"秒后自动关闭。)"));
						timer = setInterval(function(){
							outTime--
							if(outTime <= 0){
								animate_close(alert_box);
								clearInterval(timer);
							}else{
								alert_box.find(_this.alert_title).append($span.text("("+(outTime)+"秒后自动关闭。)"));
							};
						},1000);
					};
					
					//拖拽
					function mousePull(click,move){//要点击的id，要拖动的id
							
							var isDown = false;
							var box_X = 0;
							var box_Y = 0;
							
							//按下后记录相对位置
							click.mousedown(function(e){
								box_X = e.pageX - (move.offset().left+move.width()/2)+($("html").scrollLeft())
								box_Y = e.pageY - (move.offset().top+move.height()/2)+($("html").scrollTop())
								move.css("opacity",".8");
								isDown = true;

							});

							$(document).mousemove(function(e){
								if(isDown == true){
									move.css('top',(e.clientY - box_Y) + 'px');
									move.css('left',(e.clientX - box_X) + 'px');
								};
							});

							$(document).mouseup(function(e){
								move.css("opacity","1");
								isDown = false;
							})

					};
				};
			};