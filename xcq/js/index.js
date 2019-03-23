$(function(){
    //顺序练习 效果
    //设置
    $('.set-box').click(function(){
        $('.setting-box').show().css('z-index','300');
    })
    $('.set-close').click(function(){
        $('.setting-box').hide().css('z-index','100');
    })
    //夜间模式
    $('[id^="checkbox-10-"]').click(function(){
        if($('[id^="checkbox-10-"]').attr('checked')){
            //top开始
            $('.top-box').css('background','#1A303C');
            $('.top-box span').css('color','#D6D8D9');
            var id=$('.top-box .top-detail .rtn-box img').attr('id');
            var id1=id+'1';
            $('.top-box .top-detail .rtn-box img').attr('src','../images/'+id1+'.png');
            var k=$('.top-box .top-detail .set-box img').attr('id');
            var k1=k+'1';
            $('.top-box .top-detail .set-box img').attr('src','../images/'+k1+'.png');
            //main开始
            $('.main-box').css({background:'#294A5D',color:'#D7DBDE'});
            $('.main-box .answer-box .answer-list a').css('color','#D7DBDE')
            //底部开始
            $('.set-bottom').css('background','#1C323F');
            $('.set-bottom .set-botnum span').css('color','#fff');
            $('.set-botlists .set-botlist a .set-text').css('color','#626262')
        }else{
            //top开始
            $('.top-box').css('background','linear-gradient(#FBFBFB 0%,#F7F7F7 50%,#F4F4F4 100%)');
            $('.top-box span').css('color','#434343');
            var id=$('.top-box .top-detail .rtn-box img').attr('id');
            $('.top-box .top-detail .rtn-box img').attr('src','../images/'+id+'.png');
            var k=$('.top-box .top-detail .set-box img').attr('id');
            $('.top-box .top-detail .set-box img').attr('src','../images/'+k+'.png');
            //main开始
            $('.main-box').css({background:'#fff',color:'#434343'});
            $('.main-box .answer-box .answer-list a').css('color','#434343')
            //底部开始
            $('.set-bottom').css('background','linear-gradient(#FEFEFE 0%,#F9F9F9 50%,#F5F5F5 100%)');
            $('.set-bottom .set-botnum span').css('color','#313131');
            $('.set-botlists .set-botlist a .set-text').css('color','#434343')
        }
    })
    //判断题
        $('.main-box .main-inner-box .answer-box .right-box a .right-btn').click(function(){
            $(this).html('<img class="right-erorr" src="../images/r.png">');
            $(this).parent('a').parent('.answer-list').siblings('.right-box').children('a').children('.right-btn').html('<img class="right-erorr" src="../images/r.png">');
            $(this).parent('a').parent('.answer-list').siblings('.error-box').children('a').children('.error-btn').html('<img class="right-erorr" src="../images/x1.png">');
        })
        $('.main-box .main-inner-box .answer-box .error-box a .error-btn').click(function(){
            $(this).html('<img class="right-erorr" src="../images/x.png">');
            $(this).parent('a').parent('.answer-list').siblings('.right-box').children('a').children('.right-btn').html('<img class="right-erorr" src="../images/r1.png">');
        })
    //正确
    $('.right-btn').click(function(){
        $(this).css({background:'#1EA68C'});
        $(this).parent().parent('.right-box').siblings('.right-box').children().children('.right-btn').css({background:'#1EA68C'});
        $(this).parent().parent('.right-box').siblings('.error-box').children().children('.error-btn').css({background:'linear-gradient(#FEFEFE 0%,#F9F9F9 50%,#F5F5F5 100%)',color:'#434343'});
        $('.line').hide();
    })
    //错题
    $('.error-btn').click(function(){
        $(this).css({background:'#FC2C2C'});
        $(this).parent().parent('.error-box').siblings('.right-box').children().children('.right-btn').css({background:'linear-gradient(#FEFEFE 0%,#F9F9F9 50%,#F5F5F5 100%)',color:'#434343'});
        $(this).parent().parent('.error-box').parent('.answer-box').next('.analyze-box').children('.analyze-list').children('.line').show();
    })
    //最底部list列表
    $('.set-botlist').click(function(){
        reloadimg();
        var id=$(this).children('a').children('.set-img').children('img').attr('id');
        var id1=id+'1';
        $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id1+'.png');
    })
    var flag1=true;
    //背题跟练习之间切换
    var w=document.documentElement.clientWidth;
    $('.set-botlist:nth-last-child(1)').click(function(index){
        var a=$(this).parent('.set-botlists').parent('.set-bottom').siblings('.main-out').children('.main-out-box').children('.main-box').children('.main-inner-box').children('.answer-box').children('.right-box').children('a').children('.right-btn');
        var b=$(this).parent('.set-botlists').parent('.set-bottom').siblings('.main-out').children('.main-out-box').children('.main-box').children('.main-inner-box').children('.answer-box').children('.error-box').children('a').children('.error-btn');
        var id=$(this).children('a').children('.set-img').children('img').attr('id');
        var id1=id+'1';
        if(flag1){
            $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id1+'.png');
            $(this).children('a').children('.set-text').html('背题');
            flag1=false;
            $('.line').show();
            $('.ans').show();
            a.html('<img class="right-erorr" src="../images/r.png">').css({background:'#1EA68C'})
            b.html('<img class="right-erorr" src="../images/x.png">').css({background:'#FC2C2C'})
        }else{
            $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id+'.png');
            $(this).children('a').children('.set-text').html('练习');
            flag1=true;
            $('.line').hide();
            $('.ans').hide();
            refresh();
            index=parseInt($('.main-out-box').css('margin-left'))/-w;
            var x=$('.main-box')[index];
            var url = "";
            var data = {type:1};
           /* $.ajax({
                type : "get",
                async : false,  //同步请求
                url : url,
                data : data,
                timeout:1000,
                success:function(dates){
                    //alert(dates);
                    $(x).html(dates);//要刷新的div
                },
                error: function() {
                    // alert("失败，请稍后再试！");
                }
            });*/
        }
    })
    /*$("#waitWork").click(function(){
        var url = "请求地址";
        var data = {type:1};
        $.ajax({
            type : "get",
            async : false,  //同步请求
            url : url,
            data : data,
            timeout:1000,
            success:function(dates){
                //alert(dates);
                $("#mainContent").html(dates);//要刷新的div
            },
            error: function() {
                // alert("失败，请稍后再试！");
            }
        });
    });*/
    function refresh(){
        parent.location.reload();
    }
    //收藏 取消收藏
    var flag2=true;
    $('.sc-btn').click(function(){
        var id=$(this).children('a').children('.set-img').children('img').attr('id');
        var id1=id+'1';
        if(flag2){
            $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id1+'.png');
            $('.sc-box').show();
            $('.sc-box .sc-text').html('收藏成功');
            $('.sc-img img').attr('src','../images/like1.png');
            flag2=false;
        }else{
            $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id+'.png');
            $('.sc-box').show();
            $('.sc-box .sc-text').html('取消收藏');
            $('.sc-img img').attr('src','../images/like.png');
            flag2=true;
        }
        var t=setTimeout(function(){
            $('.sc-box').hide();
        },3000)
    })
    //屏蔽
    var flag3=true;
    $('.set-botlist:nth-child(1)').click(function(){
        var id=$(this).children('a').children('.set-img').children('img').attr('id');
        var id1=id+'1';
        if(flag3){
            $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id1+'.png');
            $('.sc-box').show();
            $('.sc-box .sc-text').html('屏蔽成功');
            $('.sc-img img').attr('src','../images/pb1.png');
            flag3=false;
        }else{
            $(this).children('a').children('.set-img').children('img').attr('src','../images/'+id+'.png');
            $('.sc-box').show();
            $('.sc-box .sc-text').html('取消屏蔽');
            $('.sc-img img').attr('src','../images/pb.png');
            flag3=true;
        }
        var t=setTimeout(function(){
            $('.sc-box').hide();
        },3000)
    })
    //考你
    $('.kn-btn').click(function () {
        $('.share-out').show().css('z-index','300');
    })
    $('.share-close').click(function(){
        $('.share-out').hide().css('z-index','100');
    })
    //我来解析
    $('.ling-line').click(function () {
        $('.commit-box').show();
        $('.set-bottom').hide();
    })
    //评论
    $('.commit-btn').click(function(){
        $('.commit-box').hide();
        $('.set-bottom').show();
    })
    //显示解析
    var flag=[];
    for(var i=0;i<2;i++){
        flag[i]=true;
    }
    $('.show-btn').click(function () {
        var index=$(this).parent('.line').parent('.analyze-list').index();
        if(flag[index]){
            $(this).parent('.line').next('.ans').show();
            $(this).children().children('.jiantou').css('-webkit-transform','rotate(180deg)')
            flag[index]=false;
        }else{
            $(this).parent('.line').next('.ans').hide();
            $(this).children().children('.jiantou').css('-webkit-transform','rotate(0deg)');
            flag[index]=true;
        }
    })
    //选择驾考类型
    $('.option-detail').each(function(){
        $(this).click(function(){
            reloadimg()
            $('.option-detail').removeClass('cur');
            $(this).addClass('cur');
            var j=$(this).children('img').attr('id');
            var j1=j+'1';
            $(this).children('img').attr('src','../images/'+j1+'.png');
        })
    })
    //重制图片
    function reloadimg(){
        $('.option-detail img').each(function(index){
            var vid = $(this).attr('id');
            $(this).attr('src','../images/'+  vid +'.png')
        })
        $('.set-botlist a .set-ling-img img').each(function(index){
            var vid = $(this).attr('id');
            $(this).attr('src','../images/'+  vid +'.png')
        })
        $('.bottom-lists a img').each(function(index){
            var vid = $(this).attr('id');
            $(this).attr('src','../images/'+  vid +'.png')
        })
    }
    //选项卡
    $('.item-list').click(function(){
        $('.item-list').removeClass('cur');
        $(this).addClass('cur');
    })
    $('.link-list').click(function(){
        $('.link-list').removeClass('cur');
        $(this).addClass('cur');
    })
    //性别框
    $('.sex').click(function(){
        $('.sex').removeClass('cur');
        $(this).addClass('cur');
    })
    //星星评分
    $('.score').click(function(){
        var num = $(this).attr('value');
        $(this).parent('.star_bg').next('.review-star').html(''+num+'星')
    })
    //返回
    $('.top-return').click(function () {
        history.back();
        //location.href=document.referrer;
    })
    //返回键 交卷 弹窗
    $('.alert-show').click(function(){
        $('.mask-box').show();
        $('.alert-box1').show();
    })
    $('.jj-btn').click(function(){
        $('.mask-box').show();
        $('.alert-box1').show();
    })
    $('.jj-btn1').click(function(){
        //$('.alert-box1').hide();
        //$('.mask-box').hide();
        /*location.href='jj.html';
        location.reload('jj.html');*/
        window.location.href="jj.html";
    })
    //闹钟
    $('.clock-box').click(function () {
        $('.mask-box').show();
        $('.alert-box').show();
    })
    $('.mask-box').click(function () {
        $(this).hide();
        $('.alert-box1').hide();
        $('.alert-box').hide();
        $('.topic-alert').hide();
        $('.hide-box').hide();
        $('.ksjl-box').hide();
        $('.update-box').hide();
    })
    $('.clear-box').click(function () {
        $('.alert-box').show();
        $('.mask-box').show();
    })
    $('.qx-btn').click(function () {
        $('.alert-box').hide();
        $('.mask-box').hide();
    })
    $('.jxks-btn').click(function () {
        $('.alert-box1').hide();
        $('.alert-box').hide();
        $('.mask-box').hide();
    })
    $('.zj-list').click(function(){
        $('.topic-alert').show();
        $('.mask-box').show();
    })
    $('.begin-btn').click(function(){
        $('.topic-alert').hide();
        $('.mask-box').hide();
    })
    $('#rtn1').click(function () {
        location.href='kmy.html'
    })
    $('.kcsl-btn').click(function(){
        $('.hide-box').show();
        $('.mask-box').show();
    })
    $('.qx-hide').click(function(){
        $('.ksjl-box').hide();
        $('.hide-box').hide();
        $('.mask-box').hide();
    })
    $('.clear-btn').click(function(){
        $('.ksjl-box').show();
        $('.mask-box').show();
    })
    //检查更新
    $('.update-show').click(function(){
        $('.mask-box').show();
        $('.update-box').show();
    })
    $('.close-update').click(function(){
        $('.mask-box').hide();
        $('.update-box').hide();
    })
    $('.update-confirm').click(function(){
        $('.mask-box').hide();
        $('.update-box1').hide();
    })
    //全部清空
    $('.all-clear').click(function(){
        $('.ksjl-box').hide();
        $('.mask-box').hide();
        $('.ksjl-detail').hide();
    })
    //加减
    var anum=parseInt($('.error-num a .num-right .num-show').html());
    $('.add-btn').click(function () {
        if(anum>=1&&anum<5){
            anum=anum+1;
            $('.error-num a .num-right .num-show').html(anum);
        }
        if(anum>=5){
            $('.error-num a .num-right .num-show').html(5);
        }
    })
    $('.down-btn').click(function () {
        if(anum>1&&anum<=5){
            anum=anum-1;
            $('.error-num a .num-right .num-show').html(anum);
        }
        if(anum<=1){
            $('.error-num a .num-right .num-show').html(1);
        }
    })
    //登陆注册
    $('.login-list').click(function () {
        $('.login-list').removeClass('cur');
        $(this).addClass('cur');
        $('.login-show').hide();
        $($('.login-show')[$(this).index('.login-list')]).show();
    })
    $('.dl-btn').click(function () {
        var a=$('.phone-box').children('input').val().replace(/^\s+|\s+$/g,"");
        var b=$('.pass-box').children('input').val().replace(/^\s+|\s+$/g,"");
        if(a==''){
            $('.mask-box').show();
            $('.yz-hide').show();
        }
        if(b==''){
            $('.mask-box').show();
            $('.yz-hide').show().html('请输入密码');
        }
        if(a==""&&b==""){
            $('.mask-box').show();
            $('.yz-hide').show().html('请输入用户名和密码');
        }
    })
    $('.complete-btn').click(function () {
        var a=$('.phone-box').children('input').val().replace(/^\s+|\s+$/g,"");
        var b=$('.mm-box').children('input').val().replace(/^\s+|\s+$/g,"");
        var c=$('.mm-box1').children('input').val().replace(/^\s+|\s+$/g,"");
        var d=$('.mm-box2').children('input').val().replace(/^\s+|\s+$/g,"");
        if(a==''){
            $('.mask-box').show();
            $('.yz-hide').show().html('请输入手机号');
        }
        if(b==''){
            $('.mask-box').show();
            $('.yz-hide').show().html('请输入密码');
        }
        if(a==""&&b==""){
            $('.mask-box').show();
            $('.yz-hide').show().html('请输入手机号和密码');
        }
        if(c!=d){
            $('.mask-box').show();
            $('.yz-hide').show().html('两次输入的密码不一致');
        }
    })
    $('.mask-box').click(function () {
        $(this).hide();
        $('.yz-hide').hide();
    })
    //注册账号获取验证码
    $('.yzm-btn').click(function () {
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
    })
    //支付
    $('.pay-detail').click(function(){
        $('.pay-detail').children('.num-img').html('');
        $(this).children('.num-img').html('<img src="../images/yes.png" alt="">')
    })
    //滑动题库
    //var w=document.documentElement.clientWidth;
    var h=document.documentElement.clientHeight;
    var len1=$('.main-out-box .main-box').length;
    $('.main-out').css({width:w+'px',maxHeight:h+'px'});
    $('.main-out .main-out-box').css({width:len1*w+'px'});
    $('.main-out-box .main-box').css({width:w+'px',maxHeight:h+'px'});
    //滑动效果
    var wi = 0;
    var page=1;
    var isSwipe  = 0;
    function sl(){
        isSwipe=1;
        if (isSwipe == 1 && page<len1) {
            wi += w;
            $('.main-out-box').css('margin-left', -wi + 'px');
            if(page<=len1){
                page++;
                $('.set-bottom .set-botnum .num-ling').html(page+'/');
            }
            else{
                page=len1;
                $('.set-bottom .set-botnum .num-ling').html(len1+'/');
            }
        }
    }
    function sr(){
        isSwipe=2;
        if (isSwipe == 2 && page>1) {
            wi -= w;
            $('.main-out-box').css('margin-left', -wi + 'px');
            if(page>=1){
                page--;
                $('.set-bottom .set-botnum .num-ling').html(page+'/')
            }
            else{
                page=1;
                $('.set-bottom .set-botnum .num-ling').html(1+'/')
            }
        }
    }
    $(".main-out-box .main-box").on("swipeleft",function(){sl()});
    $(".main-out-box .main-box").on("swiperight",function(){sr()});
    //数字键盘
    $('.set-botnum a img').click(function(){
        $('.topic-num').show().css('z-index','300');
    })
    $('.topic-close a img').click(function(){
        $('.topic-num').hide().css('z-index','100');
    })
    //点击数字键盘
    $('.num-list a').click(function(){
        var j=parseInt($(this).html());
        $('.set-bottom .set-botnum .num-ling').html(j+'/');
        $('.main-out-box').css('margin-left', -w*(j-1) + 'px');
    })
    $('.topic-num').scroll(function (e) {
        //event.stopPropagation();
        window.event? window.event.cancelBubble = true : e.stopPropagation();
    })
    //最底部导航
    $('.bottom-lists').click(function(){
        $('.bottom-lists').children('a').children('span').removeClass('cur');
        $(this).children('a').children('span').addClass('cur');
        var bo_id=$(this).children('a').children('img').attr('id');
        var bo_id1=bo_id+'1';
        reloadimg();
        $(this).children('a').children('img').attr('src','../images/'+bo_id1+'.png');
        var index=$(this).index('.bottom-lists');
        $($('.alert-hide')[index]).show();
    });
    $('.close-btn').click(function(){
        $('.alert-hide').hide();
    })
    //视频详情
    $('.xiazai-btn a').click(function () {
        $(this).html('<span class="download-btn">下载中...</span>');
    })
    //定位
    //each
    $('.alert-main-list').click(function(){
        $('.alert-main-list').removeClass('cur');
        $(this).addClass('cur');
    })
    $('.ensure-btn a').click(function(){
        $(this).css({'background':'linear-gradient(#10AC58 0%,#1AB56B 50%,#24BE7E 100%)','border':'1px solid #D0D0D0','color':"#fff"})
    })
    //交通
    $('.title-box li').click(function () {
        var index=$('.title-box li').index(this);
        $('.icon-box').hide();
        $($('.icon-box')[index]).show();
    })
})



