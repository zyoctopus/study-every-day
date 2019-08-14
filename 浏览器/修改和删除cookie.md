JavaScript通过 document.cookie 来修改和删除 cookie；

1. 修改和删除cookie时，需要做到名称、路径和域名必须相同；
2. 修改和删除cookie时，要给对应的cookie设置expires；

设置cookie
```
/**
 * 设置cookie
 * @param {string} name  键名
 * @param {string} value 键值
 * @param {integer} days cookie周期
 */
function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }else{
        var expires = "";
    }
    document.cookie = name+"=" + escape(value) + expires + "; path=/";
}
// 获取cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
// 删除cookie
function deleteCookie(name) {
    setCookie(name,"",-1);
}
```

删除cookie，没办法通过设置空字符串之类删除，可以给cookie设置其过期时间为一个过去的时间，时间过期，cookie会被浏览器自动删除，通过这种方式达到删除cookie的目的；  
注意：在本地静态html是不能正常删除的，需要加上完整的domain和path；
```
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1); // 设置时间为过去的时间
    var cval=getCookie(name); // 这个可以不需要
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        // 也可以写成以下这样
        // document.cookie= name + "=;expires="+exp.toGMTString();

        // 本地静态html
        // document.cookie = cookieName + "=; expires="+ex.toGMTString() + ";path=/;domain=（对应的domain）";
}
```