//谁写的方法写上名字
//组长徐万林,组员:王天舒,吴甜甜,邹琳,代博,刘璇
//1.JSON字符串转JSON对象
//2.浏览器盒子模型
//3.元素距离body的偏移量
//4.获取css样式
//5.设置css样式
//6.批量设置css样式
//7.设置/获取css样式

var $ = (function () {

    //检验浏览器的低版本和高版本 true是高版本 false是低版本
    var flag = "getComputedStyle" in window;

    //王天舒  09:51:02
    function win (attr,val) {
        if (typeof val == "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }else{
            document.documentElement[attr] = val;
            document.body[attr] = val;

        }

    }
    //吴甜甜  10:14:15
    function toJSONObj(JSONStr) {
        try {
            return JSON.parse(JSONStr)
        }catch (e){
            return eval("("+JSONStr+")");
        }
    }
    //邹林  09:51:30
    function offset(curEle) {
        var p=curEle.offsetParent;
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        while (p){
            if(!window.navigator.userAgent.includes("MSIE 8")){
                l+=p.clientLeft;
                t+=p.clientTop;
            }
            l+=p.offsetLeft;
            t+=p.offsetTop;
            p=p.offsetParent;
        }
        return {left:l,top:t}
    }
    //代博
    //getCss:获取属性值样式
    function getCss(curEle, attr) {
        var val = null;
        if (flag) {
            val = window.getComputedStyle(curEle)[attr];
        } else {
            if (attr == "opacity") {
                val = curEle.currentStyle["filter"];
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/g;
                val = reg.test(val) ? RegExp.$1 / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        var reg = /^-?\d+(?:\.\d+)?(?:px|pt|pp|rem|em|deg)?$/;
        val = reg.test(val) ? parseFloat(val) : val;
        return val;
    }
    //刘璇  09:55:
    function setCss(curEle, attr, val) {
        if (attr === "opacity") {
            curEle.style.opacity = val;
            curEle.style.filter = "alpha(opacity=" + val * 100 + ")"
            return
        }
        if (attr === "float") {
            curEle.style.cssFloat = val;  // 标准浏览器
            curEle.style.styleFloat = val;
            return;
        }
        var reg = /^(width|height|top|left|right|bottom|(margin|padding)(Top|Right|Bottom|Left)?)$/g;
        if (reg.test(attr) && !isNaN(val) && val !== 0) {
            val += "px";
        }
        curEle.style[attr] = val;
    }
    //王天舒  09:51:02
    function geyGroupCss(curEle,cssObj){
        cssObj= cssObj || [];
        if(cssObj.toString() === "[object Object]"){
            for(var key in cssObj){
                this.setCss(curEle,key,cssObj[key])
            }
        }
    }
    //徐万林
    function css() {
        if (arguments.length == 3) {
            this.setCss.apply(this, arguments);
            return;

        }
        if (arguments.length == 2) {
            if (Object.prototype.toString.call(arguments[1]) === "[object Object]") {
                 this.setGroupCss.apply(this, arguments);
                return;
            } else {
                return this.getCss.apply(this, arguments);
            }
        }

    }

    return {
        win:win,
        toJSONObj:toJSONObj,
        offset:offset,
        getCss:getCss,
        setCss:setCss,
        geyGroupCss:geyGroupCss,
        css: css
    }
})()