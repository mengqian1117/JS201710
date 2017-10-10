/**
 * Created by xiaomai530023744 on 2017/9/23.
 */
var $=(function () {
    var flag="getComputedStyle" in window;
    function toJSONObj(JSONStr) {
        try {
            return JSON.parse(JSONStr);
        }catch (e){
            return eval("("+JSONStr+")");
        }
    };

    function win(attr,val) {
        if(typeof val =="undefined"){
            return document.documentElement[attr]||document.body[attr]
        }else {
            document.documentElement[attr]=val;
            document.body[attr]=val;
        }
    };

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
        return{left:l,top:t};
    };

    function getCss(curEle,attr) {
        var val=null;
        if("getComputedStyle" in window){
            val=window.getComputedStyle(curEle)[attr];
        }else {
            if(attr=="opacity"){
                val=curEle.currentStyle["filter"];
                var reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/g;
                val=reg.test(val)?RegExp.$1/100:1;
            }else {
                val=curEle.currentStyle[attr];
            }
        }
        var reg=/^-?\d+(?:\.\d+)?(?:px|pt|pp|rem|em|deg)?$/;
        val=reg.test(val)?parseFloat(val):val;
        return val;
    };

    function setCss(curEle,attr,val) {
        if(attr==="opacity"){
            curEle.style.opacity=val;
            curEle.style.filter="alpha(opacity="+val*100+")";
            return;
        }
        if(attr==="float"){
            curEle.style.cssFloat=val;
            curEle.style.styleFloat=val;
            return;
        }
        var reg=/^(width|height|top|left|right|bottom|(margin|padding)(Right|Left|Top|Bootom))$/g;
        if(reg.test(attr)&&!isNaN(val)){
            val+="px";
        }
        curEle.style[attr]=val;
    };

    function setGroupCss(curEle,cssObj) {
        cssObj=cssObj||[];
        if(cssObj.toString()==="[object Object]"){
            for(var key in cssObj){
                this.setCss(curEle,key,cssObj[key]);
            }
        }


    };

    function css() {
        if(arguments.length===3){
            //apply不仅可以传数组还可以传类数组,比如:arguments
            this.setCss.apply(this,arguments);
            return;
        }
        if(arguments.length===2){
            if(arguments[1].toString()==="[object Object]"){
                this.setGroupCss.apply(this,arguments);
                return;
            }else {
                return this.getCss.apply(this,arguments);
            }
        }
    };

    return{

        toJSONObj:toJSONObj,
        win:win,
        offset:offset,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,

    }
})();
