var $=(function(){
    //toJSONObj:王敬娜
    function toJSONObj(JSONStr) {
        try {
            return JSON.parse(JSONStr)
        } catch (e) {
            return eval("(" + JSONStr + ")")
        }
    }
    //win：梁泉
    function win(attr, val) {
        if (typeof val == "undefined") {
            return document.documentElement[attr] || document.body[attr]
        } else {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
    }
    //offset:郭磊
    function offset(curEle) {
        var p = curEle.offsetParent;
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        while (p) {
            if (window.navigator.userAgent.includes("MSIE 8")) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {Left: l, top: t}
    }
    //getCss：梁泉
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
                val = curEle.currentStyle[attr]
            }
        }
        var reg = /^-?\d+(?:\.\d+)?(?:px|pp|pt|rem|em|deg)?$/;
        val = reg.test(val) ? parseFloat(val) : val;
        return val
    }
    //setCss：郭磊
    function setCss(curEle, attr, val) {
        if (attr == "opacity") {
            curEle.style.opacity = val;
            curEle.style.filter = "alpha(opacity=" + val * 100 + ")";
            return;
        }
        if (attr == "float") {
            curEle.style.styleFloat = val;
            curEle.style.cssFloat = val;
            return;
        }
        var reg = /^(width|height|top|right|left|bottom|(margin|padding)(Right|Top|Left|Bottom))$/g;
        if (reg.test(attr) && !isNaN(val)) {
            val += "px";
        }
        curEle.style[attr] = val
    }

    //setGroupCss：李敏
    function setGroupCss(curEle, cssObj) {
        cssObj = cssObj || [];
        if (cssObj.toString() === "[object Object]") {
            for (var key in cssObj) {
                this.setCss(curEle, key, cssObj[key])
            }
        }
    }
    //css：李敏
    function css() {
        if (arguments.length === 3) {
            this.setCss.apply(this, arguments);
            return;
        }
        if (arguments.length === 2) {
            if (arguments[1].toString() == "[object Object]") {
                this.setGroupCss.apply(this, arguments);
                return;
            } else {
                return this.getCss.apply(this, arguments);

            }

        }
    }
    return {
        toJSONObj:toJSONObj,
        win:win,
        offset:offset,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,
    }
})();

