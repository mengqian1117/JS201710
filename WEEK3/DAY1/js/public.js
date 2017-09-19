var public=(function () {
    function win(attr,val) {
        if(typeof val=="undefined"){
            //只传一个参数是获取
            return document.documentElement[attr]||document.body[attr];
        }else {
            //传2个参数是修改值,只有scrollTop和scrollLeft起作用
            document.documentElement[attr]=val;
            document.body[attr]=val;
        }
    };
    function offset(curEle) {
        var p=curEle.offsetParent;
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        while (p){
            if(!window.navigator.userAgent.includes("MSIE 8.0")){
                l+=p.clientLeft;
                t+=p.clientTop;
            }
            l+=p.offsetLeft;
            t+=p.offsetTop;
            p=p.offsetParent;
        }
        return {left:l, top:t}
    };
    return {
        win:win,
        offset:offset
    }
})();