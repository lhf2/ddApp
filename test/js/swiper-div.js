//拖拽
$.prototype.mousePull = function(_w){//_w:滑动的宽度

		var _this = this;

		var isDown = false;

		var box_X = 0;

		var Max = 0;

		var isW; //父级的宽度

		var w = _this.width(); //拖拽的宽度

		_this.callback = {
			fail:false,
			success:false,
		};		

		//按下后记录相对位置
		_this.on("touchstart",function(e){
			if(!_w){
				isW = $(this).parent().width();
				
			}else{
				isW = _w.width();
			}

			Max = isW - _this.width();

			var touches = e.originalEvent.targetTouches[0];

			box_X = (touches.pageX - $(this).offset().left + ($(window).width() - isW)/2);

			$(this).css({

				"transition":"0s"
			});

			isDown = true;
		});

		$(window).on("touchmove",function(e){
			if(isDown == true){
				var touches = e.originalEvent.targetTouches[0];
				_this.css('left',(touches.pageX - box_X) + 'px');
				if(parseInt(_this.css("left"))<0){
					_this.css("left",0);
					//console.log("滑到原位");
				}else if(parseInt(_this.css("left"))>= Max){
					_this.css("left",Max)
					//console.log("滑到终点");
				}
			};
		}).on("touchend",function(){
			if(isDown == true){
				if(parseInt(_this.css("left"))>= Max){
					_this.css("left",Max);
					var $this = $(this);
					//console.log("验证通过！");
					if(_this.callback.success) _this.callback.success(_this);
				}else{
					_this.css({
						"transition":".3s",
						"left":0
					});
					//console.log("验证失败！");
					if(_this.callback.fail) _this.callback.fail(_this);
				}
			}
			isDown = false;
		});

	return this;
};