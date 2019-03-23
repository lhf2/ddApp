var myname,pushid;
function xx(myid){
    $.ajax({
        async:false,
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/publish/getUser?userId='+myid,
        dataType : 'jsonp',
        jsonp : "callbackparam",
        success : function(msg) {
            if(!msg){
                return
            }
            myname=msg.nickname;
            $('.icon-img a img').attr('src',pdtp(msg.image));
            $('.icon-img img').attr('src',pdtp(msg.image));
            $('.icon-name').html(myname);
            if(msg.area==''||msg.area=='null'){
                $('.icon-address p i').html('未定位');
            }else{
                $('.icon-address p i').html(msg.area);
            }
            $('#my-id').html(myname+',');
            if(msg.bgImage==''){
                $('.main-bg').children('img').hide();
            }else{
                $('.main-bg').children('img').attr('src','http://101.201.146.79:8088/dts/bgImage/'+msg.bgImage);
            }
            pushid=msg.pushId;
            $('#input_pushid').val(msg.pushId);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
}

function jxmc(myid){
    $.ajax({
        async:false,
        type : 'post',
        contentType : "application/json;charset=utf-8",
        url : 'http://101.201.146.79:8088/dts/user/getByUserId?userId='+myid,
        dataType : 'jsonp',
        jsonp : "callbackparam",
        success : function(msg) {
            if(!msg){
                return
            }
            $('.jx-name').html(msg.dname);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status + ' '
            + XMLHttpRequest.readyState + ' ' + textStatus);
        }
    });
}