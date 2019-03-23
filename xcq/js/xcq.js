$(document).ready(function () {
    //设置
    $('.set-btn').click(function(){
        $('.mask-hide').show();
        $('.set-box').show();
    });
    //举报
    $('.report-list').click(function(){
        $('.report-list').removeClass('cur');
        $(this).addClass('cur');
    });
    $('.report-btn').click(function(){
        $('.set-box').hide();
        $('.report-box').show();
        $('.share-box').hide();
    });
    $('.cancel-btn').click(function(){
        $('.mask-hide').hide();
        $('.report-box').hide();
    });
    //分享
    /*$('.share-btn').click(function () {
        $('.set-box').hide();
        $('.share-box').show();
        $('.report-box').hide();
    });*/
    $('.mask-hide').click(function () {
        $(this).hide();
        $('.set-box').hide();
        $('.report-box').hide();
        //$('.share-box').hide();
        $('.camera-box').hide();
    });
    //更换主题封面
    $('.title-list').click(function () {
        $('.title-list').removeClass('cur');
        $(this).addClass('cur');
        var index=$(this).index('.title-list');
        $('.photo-box').hide();
        $($('.photo-box')[index]).show();
    });
    //学车 与我相关
    /*$('.link-list-ling').click(function () {
        $('.link-list-ling').removeClass('cur');
        $(this).addClass('cur');
    });
    $('.link-list').click(function () {
        $('.link-list').removeClass('cur');
        $(this).addClass('cur');
        var index=$('.link-list').index(this);
        $('.main-box').hide();
        $($('.main-box')[index]).show();
    });*/
    //拍照
    $('.add-btn').click(function(){
        $('.mask-hide').show();
        $('.camera-box').show();
    });
    $('.camera-list').click(function () {
        $('.camera-list').removeClass('cur');
        $(this).addClass('cur');
    });
    $('.cancel-btn').click(function () {
        $('.camera-box').hide();
    });
    //返回
    $('.return-btn').click(function () {
        $('.quit-edit').show();
    });
    $('.cancel-quit').click(function () {
        $('.quit-edit').hide();
    });
    //找朋友
    $('.main-top-list').click(function () {
        /*$('.main-top-list').removeClass('cur');
        $(this).addClass('cur');
        var index=$(this).index('.main-top-list');
        $('.main-lists').hide();
        $($('.main-lists')[index]).show();*/
    });
    //发表话题
    $('#out').click(function () {
        $('.comment-bottom').css('width','100%');
        $('.emotion').val(' ');
    });
    $('.comment-btn').click(function(){
        $('.comment-bottom').css('width','0%');
    })
    //删除聊天
    /*var index1;
    $('.chat-list').on('taphold', function () {
        $('.mask-box1').show();
        $('.alert-del').show();
        index1=$(this).index();
    });
    $('.del-btn').click(function () {
        $($('.chat-list')[index1]).hide();
        $('.alert-del').hide();
        $('.mask-box1').hide();
    });
    $('.alert-top').click(function () {
        $($('.chat-list')[index1]).prependTo('.chat-detail');
        $('.alert-del').hide();
        $('.mask-box1').hide();
    });
    $('.mask-box1').click(function () {
        $(this).hide();
        $('.alert-del').hide();
    });*/
    //返回
    $('.top-return').click(function () {
        history.back();
    });
});
