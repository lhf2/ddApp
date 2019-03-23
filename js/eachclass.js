$(document).ready(function () {
    var userId=localStorage.getItem('userid');

    //注册账号获取验证码
    $('.yzm-btn').click(function(){
        if($('#phone').val()==''){
            alert('手机号不能为空');
        }else{
            var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
            var phoneNum = $('#phone').val();//手机号码
            var flag = reg.test(phoneNum); //true
            if(flag){
                yzm(phoneNum);
                $(this).hide();
                $('.yzm-btn1').show();
                var a=parseInt($('.yzm-btn1 span').html());
                var t=setInterval(function(){
                    a--;
                    $('.yzm-btn1 span').html(a);
                    if(a<=0){
                        clearInterval(t);
                        $('.yzm-btn1').hide();
                        $('.yzm-btn').show();
                    }
                },1000)
            }else{
                alert('手机号不正确');
            }
        }
    })
    //验证信息
    $('.tj-btn').click(function(){
		var isPriceS=$('#isPriceS').attr('lang');
        var userName=$('#name').val();
        var phone=$('#phone').val();
        var drivingId=getQueryString('drivingId');
        var classId=getQueryString('classid');
        var classType=$('.summary-top').html();
        var content=$('#ly-con').val();
        var verification=$('#yzm').val();
        var sex1=$('.sex.cur').html(); var sex;
        var drivingtype1=$('.isTypeSel.cur').html(); var drivingtype;
        if(sex1=='女'){
            sex=0;
        }else{
            sex=1;
        }
        //驾照类型
        if(drivingtype1=='C1'){
            drivingtype="C1";
        }else{
            drivingtype="C2";
        }
        //姓名
        if($('#name').val()==''){
            alert('姓名不能为空');
            return false;
        }
        //手机号
        if($('#phone').val()==''){
            alert('手机号不能为空');
            return false;
        }
        if($('#name').val()&&$('#phone').val()&&$('#yzm').val()&&isPriceS!=''&&isPriceS!=undefined){
           // console.log(userName+'%'+phone+'%'+classType+'%'+content+'%'+verification)
            signup(userId,userName,sex,phone,drivingId,classId,classType,content,verification,drivingtype,isPriceS)
        }
        
    })

    //http://dd.dingdongxueche.com/
    function signup(userId,userName,sex,phone,drivingId,classId,classType,content,verification,drivingtype,isPriceS){
        $.ajax({
            // type : 'post',
            // contentType : "application/json;charset=utf-8",
            url : 'http://dd.dingdongxueche.com/DDWeb/signup/insertRegistration.htm?userId='+userId+'&userName='+userName+'&sex='+sex+'&phone='+phone+'&drivingId='+drivingId+'&classId='+classId+'&classType='+classType+'&content='+content+'&verification='+verification+'&licenseLevel='+drivingtype+'&area='+localStorage.getItem('city')+"&openId="+localStorage.getItem('openId'),
            cache : false,
            // dataType : 'jsonp',
            // jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //data : {id:recordid},//recordid
            success : function(msg) {
                console.log(msg)

                var titMsg = "";
                
                switch(msg){
                    case "fail":
                    alert("信息提交失败！");	
                    break;
                    case "timeout":
                     alert("验证码超时！");	
                    break;
                    case "error":
                     alert("验证码错误！");								
                    break;
                    case "phone":
                     alert("请输入手机号！");						
                    break;
                    case "fail":
                     alert("信息提交失败！");				
                    break;
                    case "sendcode":
                    alert("请先发送验证码！");					
                    break;
                    case "empty":
                    window.location.href = "http://wx.dingdongxueche.com";
                    break;
                    case "success" :
                    // 信息提交成功!;
                    window.location.href = "../zjx/qrzf.html?fistpay="+fistpay+"&isPriceS="+isPriceS+"&drivingId="+drivingId+"&classId="+classId+"";
                    break;
                }
 /*$('.alertxz-hide .alertxz-text').html(titMsg);
                $('.mask-box').show();
                $('.alertxz-hide').show();*/
                
                
                // $('.alertxz-btn').click(function () {
                //     if(titMsg == "信息提交成功！"){
                //         location.href='../zjx/bxxq.html?classid='+classid;
                //     }else{
                //         $('.mask-box').hide();
                //         $('.alertxz-hide').hide();
                //     }
                // });

               
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest.status + ' '
                + XMLHttpRequest.readyState + ' ' + textStatus);
            }
        })
    }
})

//验证码
function yzm(phoneNum){
    $.ajax({
        // type : 'post',
        // contentType : "application/json;charset=utf-8",
        url : 'http://dd.dingdongxueche.com/DDWeb/signup/sendVerifyCode.htm?phoneNum='+phoneNum,
        cache : false,
        // dataType : 'jsonp',
        // jsonp : "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        //data : {id:recordid},//recordid
        success : function(msg) {
            if(msg == "fail" || msg == ""){
                alert("发送失败！")
            }else{
                alert("发送成功！")
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    })
}

