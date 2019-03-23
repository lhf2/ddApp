function pdtp(img){
    var tmpimg;
    var header = 'http://101.201.146.79:8088/dts/image/';
    if (img == '') {
        tmpimg= header+'default_head.png';
    }else if(img.substr(0,4)=='http'){
        tmpimg=img;
    }else{
        tmpimg=header+img;
    }
    return tmpimg;
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
function  getQueryString (name) {
    // �������û�в�����������в���������Ҫ��ȡ�Ĳ���ֱ�ӷ��ؿ�
    if (location.href.indexOf("?") == -1 || location.href.indexOf(name + '=') == -1) {
        return '';
    }
    // ��ȡ�����в����
    var queryString = location.href.substring(location.href.indexOf("?") + 1);
    queryString = decodeURI(queryString);

    // �������� ?key=value&key2=value2
    var parameters = queryString.split("&");
    var pos, paraName, paraValue;
    for (var i = 0; i < parameters.length; i++) {
        // ��ȡ�Ⱥ�λ��
        pos = parameters[i].indexOf('=');
        if (pos == -1) { continue; }

        // ��ȡname �� value
        paraName = parameters[i].substring(0, pos);
        paraValue = parameters[i].substring(pos + 1);

        // ����ѯ��name���ڵ�ǰname���ͷ��ص�ǰֵ��ͬʱ���������е�+�Ż�ԭ�ɿո�
        if (paraName == name) {
            return unescape(paraValue.replace(/\+/g, " "));
        }
    }
    return '';
}