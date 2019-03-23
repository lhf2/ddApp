$(document).ready(function(){
    // var pduserid=window.myJS.getIsGuest();
    // var dlimg=window.myJS.getUserHead();
    // var dlname=window.myJS.getNickName();
    var pduserid="475522859838472192";
    var dlimg="";
    var dlname="";
    var header = 'http://101.201.146.79:8088/dts/image/';
    if(pduserid==1){
        $('.bottom-fix-ydl').hide();
        $('.bottom-right').click(function(){
            window.myJS.openLogin('ltb');
        });
    }else{
        $('.bottom-fix-wdl').hide();
        if(dlimg){
            $('.dl-img img').attr('src',dlimg);
        }else{
            $('.dl-img img').attr('src',header+'default_head.png');
        }
        $('.dl-name').html(dlname);
    }
});