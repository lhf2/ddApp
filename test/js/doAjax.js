//json数组或json字符串形式发回后台，返回是文本
$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
        'type' : 'POST',
        'url' : url,
        'contentType' : 'application/json',
        'data' : JSON.stringify(data),
        //'dataType' : 'json',
        'success' : callback||default_callback
    });
};

//文本参数形式发回后台保存，
$.ajaxDone = function(url, callback) {
    return jQuery.ajax({
        'type' : 'get',
        'url' : url,
        'success' : callback||default_callback
    });
};

//系统默认回调函数信息处理
var default_callback=function(data){
	var jalert = new Pop();
	if(data!=''){jalert.init(data);}
};
$.isNullOrEmpty=function(strVal) {
	if (strVal == '' || strVal == null || strVal == undefined) {
		return true;
	} else {
		return false;
	}
}; 