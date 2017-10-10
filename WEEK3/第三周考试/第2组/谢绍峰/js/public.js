
var $=(function () {
    var flag="getComputedStyle" in window;
    //1.JSON字符串转对象 toJSONStr
    function toJSONObj(JSONStr) {
        try {
            return JSON.parse(JSONStr);
        }catch (e){
            return eval("("+JSONStr+")");
        }
    }
    //2.浏览器盒子模型 win
    function win(attr,val) {
        if(typeof val==="undefined"){
            return   document.documentElement[attr]||document.body[attr]
        }else {
            document.documentElement[attr]=val;
            document.body[attr]=val;
        }
    }
    //3.元素距离body的偏移量 offset
    function offset(curEle) {
        var par=curEle.offsetParent;
        var left=curEle.offsetLeft;
        var top=curEle.offsetTop;
        while (par){
            if(!window.navigator.userAgent.includes("MSIE 8.0")){
                left+=par.clientLeft;
                top+=par.clientTop;
            }
            left+=par.offsetLeft;
            top+=par.offsetTop;
            par=par.offsetParent;
        }
        return{
            top:top,
            left:left
        }
    }
    //4.获取css样式 getCss
    function getCss(curEle,attr) {
        var val=null;
        if (flag){
            val=window.getComputedStyle(curEle)[attr];
        }else {
            if(attr==="opacity"){
                val=curEle.currentStyle["filter"];
                var reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/g;
                val=reg.test(val)?RegExp.$1/100:1;
            }else {
                val=curEle.currentStyle[attr];
            }
        }
        var reg=/^-?\d+(?:\.\d+)?(?:px|pt|pp|rem|em|deg)?$/;
        val=reg.test(val)?parseFloat(val):val;
        return val
    }
    //5.设置css样式  setCss
    function setCss(curEle,attr,val) {
        if(attr==="opacity"){
            curEle.style[attr]=val;
            curEle.style["filter"]="alpha(opacity="+val*100+")";
            return;
        }
        if(attr==="float"){
            curEle.style.styleFloat=val;
            curEle.style.cssFloat=val;
            return;
        }
        var reg=/^(width|height|top|left|right|bottom|(margin|padding)(Top|Bottom|Right|Left))$/g;
        if(reg.test(attr)&&!isNaN(val)){
            val+="px";
        }
        curEle.style[attr]=val;
    }
    //6.批量设置css样式 srtGroundCss
    function setGroupCss(curEle,cssObj) {
        cssObj=cssObj||[];
        if(cssObj.toString()==="[object Object]"){
            for(var key in cssObj){
                this.setCss(curEle,key,cssObj[key])
            }
        }
    }
     //7.设置/获取css样式 css
    function css() {
        if(arguments.length===3){
            this.setCss.apply(this,arguments);
            return;
        }
        if(arguments[1].toString()==="[object Object]"){
             this.setGroupCss.apply(this,arguments);
            }else {
                return this.getCss.apply(this,arguments)
            }

    }


    return{
        setCss:setCss,
        setGroupCss:setGroupCss,
        toJSONObj:toJSONObj,
        win:win,
        offset:offset,
        getCss:getCss,
        css:css
    }
})();
