//谁写的方法写上名字
//组长孙晓丹,组员:杜毅,冯鹏飞,李美臣,周英浩,郝新宇
//1.JSON字符串转JSON对象
//2.浏览器盒子模型
//3.元素距离body的偏移量
//4.获取css样式
//5.设置css样式
//6.批量设置css样式
//7.设置/获取css样式


//2.周英浩
//  function win(attr,val){
//      if(typeof val=="undefined"){
//          return document.documentElement[attr]||document.body[attr];
//      }else{
//          document.documentElement[attr]=val;
//          document.body[attr]=val;
//      }
//  }
var $=(function () {
    function win(attr,val) {
        if(typeof val=="undefined"){
            return document.documentElement[attr]||document.body[attr]
        }else {
            document.documentElement[attr]=val;
            document.body[attr]=val;
        }
    };


    function toJSONObj(JSONStr) {
        try {
            return JSON.parse(JSONStr);
        }catch (e){
            return eval("("+JSONStr+")");
        }
    }

    function getCss(curEle,attr) {
        var val=null;
        if("getComputedStyle" in window){
            val=window.getComputedStyle(curEle)[attr];
        }else {
            if(attr=="opacity"){
                val=curEle.currentStyle["filter"]
                var reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/g;
                val=reg.test(val)?RegExp.$1/100:1
            }else{
                val=curEle.currentStyle[attr]
            }
        }
        var reg=/^-?\d+(?:\.\d+)?(?:px|pt|pp|rem|em|deg)?$/
        val=reg.test(val)?parseFloat(val):val
        return val
    }


    function setCss(curEle,attr,val) {
        if (attr === "opacity") {
            curEle.style.opacity=val;
            curEle.style.filter="alpha(opacity="+val*100+")";
            return;
        }
        if (attr==="float"){
            curEle.style.cssFloat=val;
            curEle.style.styleFloat=val;
            return;
        }
        var reg=/^(width|height|top|left|right|bottom|(margin|padding)(Right|Left|Top|Bottom))$/g;
        if(reg.test(attr)&&!isNaN(val)){
            val+="px";
        }
        curEle.style[attr]=val;
    }

    function setGroupCss(curEle,cssObj) {
        cssObj=cssObj||[];
        if (cssObj.toString()==="[object Object]"){
            for (var key in cssObj){
                this.setCss(curEle,key,cssObj[key]);
            }
        }
    }
    function css() {
        if(arguments.length==3){
            this.setCss.apply(this,arguments)
        }
        if(arguments.length==2){
            if(typeof  arguments[1]=="[onject,Object]"){
                this.setGroupCss.apply(this,arguments)
            }else {
                return this.getCss.apply(this,arguments)
            }
        }
    }
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
    return {
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        toJSONObj:toJSONObj,
        win:win,
        css:css,
        offset:offset
    }
})();