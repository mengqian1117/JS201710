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
    }
    return {
        win:win
    }
})();