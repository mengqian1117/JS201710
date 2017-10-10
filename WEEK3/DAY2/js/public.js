var $=(function () {
    //1.toArray:将类数组转数组
    //参数likeArray:类数组
    //返回值return:数组
    function toArray(likeArray) {
        try {
            return [].slice.call(likeArray);
        }catch (e){
            var ary=[];
            for(var i=0;i<likeArray.length;i++){
                ary.push(likeArray[i])
            }
            return ary;
        }
    };

    //2.toJSONObj:将JSON字符串变成JSON对象
    //参数JSONStr:JSON字符串
    //返回值return:JSON对象
    function toJSONObj(JSONStr) {
        try {
            return JSON.parse(JSONStr);
        }catch (e){
            return eval("("+JSONStr+")");
        }
    };

    //3.win:求浏览器的盒子模型
    //参数(attr):获取      有返回值
    //参数(attr,val):设置   没有返回值
    function win(attr,val) {
        if(typeof val =="undefined"){
            return document.documentElement[attr]||document.body[attr]
        }else {
            document.documentElement[attr]=val;
            document.body[attr]=val;
        }
    };

    //4.offset:获取元素距离body的偏移量
    //参数curEle:当前元素
    //返回值return:{left:值,top:值,}
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

    //5.getRandom:获取随机数
    //参数(n,m)
    //      n>m:获取m到n的随机数
    //      n,m:其中有一个不是一个数,返回0-1的随机小数
    function getRandom(n,m) {
        n=Number(n);
        m=Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        if(n>m){
            // var t=n;
            // n=m;
            // m=t;
            n=m+n;
            m=n-m;
            n=n-m;
        }
        return Math.round(Math.random()*(m-n)+n);
    };

    //6.getCss:获取样式属性值
    //参数(curEle,attr):curEle当前元素,attr样式属性
    //返回值:样式属性值
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

    //7.setCss:设置样式属性值
    //参数(curEle,attr,val):curEle当前元素,attr样式属性,val属性值
    //返回值:无
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

    //8.setGroupCss:批量设置CSS样式
    //参数(curEle,cssObj)
    //返回值:无
    function setGroupCss(curEle,cssObj) {
        cssObj=cssObj||[];
        if(cssObj.toString()==="[object Object]"){
            for(var key in cssObj){
                this.setCss(curEle,key,cssObj[key]);
            }
        }
    };

    //9.css:获取/设置css属性
    //三个参数:设置
    //俩个参数: 第二个参数是个对象   --> 批量设置
    //         第二个参数不是个对象 --> 获取 有返回值
    function css() {
        if(arguments.length===3){
            //apply不仅可以传数组还可以传类数组,比如:arguments
            this.setCss.apply(this,arguments);
            return;
        }
        if(arguments.length==2){
            if(arguments[1].toString()=="[object Object]"){
                this.setGroupCss.apply(this,arguments);
                return;
            }else {
                return this.getCss.apply(this,arguments);
            }
        }
    };
    return{
        toArray:toArray,
        toJSONObj:toJSONObj,
        win:win,
        offset:offset,
        getRandom:getRandom,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css
    }
})();