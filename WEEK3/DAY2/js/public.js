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
    }
    return{
        toArray:toArray,
        toJSONObj:toJSONObj,
        win:win,
        offset:offset,
    }
})();