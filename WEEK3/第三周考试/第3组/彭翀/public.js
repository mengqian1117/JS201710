//谁写的方法写上名字
//组长李佳宝,组员:彭翀,刘迪,钟敏燕
//1.JSON字符串转JSON对象   彭翀
//2.浏览器盒子模型         彭翀
//3.元素距离body的偏移量    刘迪
//4.获取css样式          李佳宝
//5.设置css样式          李佳宝
//6.批量设置css样式    钟敏燕
//7.设置/获取css样式   钟敏燕

var $ = (function () {
    //刘迪
    function offset(curEle) {
        var p = curEle.offsetParent;
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        while (p) {
            if (!window.navigator.userAgent.includes("MSIE 8.0")) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent
        }
        return {left: l, top: t}
    }

    //钟敏燕
    function css() {
        if (arguments.length === 3) {
            this.setCss.apply(this, arguments);
            return;
        }
        if (arguments.length === 2) {
            if (arguments[1].toString() == '[object Object]') {
                this.setGroupCss.apply(this, arguments);
                return;
            } else {
                return this.getCss.apply(this, arguments);
            }
        }
    }

    function setGroupCss(curEle, cssObj) {
        cssObj = cssObj || [];
        if (cssObj.toString() === '[object Object]') {
            for (var key in cssObj) {
                this.setCss(curEle, key, cssObj[key]);
            }
        }
    }

    //彭翀
    function toJSONObj(JSONStr) {
        try {
            return JSON.parse(JSONStr);
        } catch (e) {
            return eval("(" + JSONStr + ")");
        }
    }

    function win(attr, val) {
        if (typeof val == "undefined") {
            return document.documentElement[attr] || document.body[attr];
        } else {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }

    }

    //李佳宝
    function getCss(curEle, attr) {
        var val = null;
        if ("getComputedStyle" in window) {
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
        var reg = /^-?\d+(?:\.\d+)?(?:px|pp|pt|em|rem|deg)?$/g;
        val = reg.test(val) ? parseFloat(val) : val;
        return val;

    }

    function setCss(curEle, attr, val) {
        if (attr == "opacity") {
            curEle.style.opacity = val;
            curEle.style.filter = "alpha(opacity=" + val * 100 + ")";
        }
        if (attr == "float") {
            curEle.style.cssFloat = val;
            curEle.style.styleFloat = val;
        }
        var reg = /^width|height|top|bottom|left|right|(margin|padding)(Top|Bottom|Left|Right)$/g;
        if (reg.test(attr) && !isNaN(val)) {
            val += "px";
        }
        curEle.style[attr] = val;
    }

    return {
        offset: offset,
        css: css,
        setGroupCss: setGroupCss,
        win: win,
        toJSONObj: toJSONObj,
        setCss: setCss,
        getCss: getCss,
    }
})();
