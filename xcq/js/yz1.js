$(document).ready(function(){
    var subjectType;
    if(getQueryString('subjectType')!='null'&&getQueryString('subjectType')!=''){
        subjectType=getQueryString('subjectType');
    }else{
        subjectType=window.myJS.getSubjectType();
    }
    $('.ui-link').click(function(){
        $(this).attr('href','ltb.html?subjectType='+subjectType)
    })
});