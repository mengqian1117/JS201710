//谁写的方法写上名字
//组长李唐菲,组员:王雪超,余敏,左钊,高雅薇
//1.JSON字符串转JSON对象
//2.浏览器盒子模型
//3.元素距离body的偏移量
//4.获取css样式
//5.设置css样式
//6.批量设置css样式
//7.设置/获取css样式
$ = (function () {
    var flag = "getComputedStyle" in window;
    //李唐菲
    function setCss(curEle, attr, val) {
        if (attr == "opacity") {
            curEle.style.opacity = val;
            curEle.style.filter = `alpha(opacity=${val * 100})`;
            return;
        }
        if (attr == "float") {
            curEle.style.cssFloat = val;
            curEle.style.styleFloat = val;
            return;
        }
        var reg = /^(width|height|top|left|right|bottom|(?:margin|padding)(?:Top|Left|Right|Bottom))$/;
        if (reg.test(attr) && !isNaN(val)) {
            val += "px";
        }
        curEle.style[attr] = val;
    }

    //余敏
    function offset(ele) {
        var p = ele.offsetParent;
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        while (p) {
            if (!window.navigator.userAgent.includes("MSIE 8.0")) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {left: l, top: t};
    };

    //王雪超
    function win(attr, val) {
        if (typeof val == "undefined") {
            return document.documentElement[attr] || document.body[attr];
        } else {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
    }

    function toJSONObj(JSONStr) {
        try {
            return JSON.parse(JSONStr);
        } catch (e) {
            return eval("(" + JSONStr + ")");
        }
    }

    //高雅薇
    function getCss(ele, attr) {
        var val = null;
        if (flag) {
            val = window.getComputedStyle(ele)[attr];
        } else {
            if (attr == "opacity") {
                val = ele.currentStyle["filter"];
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/g;
                val = reg.test(val) ? RegExp.$1 / 100 : 1;
            } else {
                val = ele.currentStyle[attr];
            }
        }
        var reg = /^-?\d+(?:\.\d+)?(?:px|pp|pt|rem|em|deg)?$/g;
        val = reg.test(val) ? parseFloat(val) : val;
        return val;
    }

    //左钊
    function setGroupCss(curEle, cssObj) {
        cssObj = cssObj || 1;
        if (cssObj.toString() === "[object Object]") {
            for (var key in cssObj) {
                this.setCss(curEle, key, cssObj[key]);
            }
        }
    }

    function css() {
        if (arguments.length === 3) {
            this.setCss.apply(this, arguments);
            return;
        }
        if (arguments.length === 2) {
            if (arguments[1].toString() === "[object Object]") {
                this.setGroupCss.apply(this, arguments);
            } else {
                return this.getCss.apply(this, arguments);
            }
        }
    }

    return {
        setCss: setCss,
        offset: offset,
        win: win,
        toJSONObj: toJSONObj,
        getCss: getCss,
        setGroupCss: setGroupCss,
        css: css
    }
})();