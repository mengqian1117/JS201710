var public=(function () {
    function toArray (likeArray) {
        return [...likeArray]
    };
    function children(ele,tag) {
        var kid=ele.children;
        var ary=[];
        for(var i=0;i<kid.length;i++){
            if(kid[i].tagName===tag.toUpperCase()){
                ary.push(kid[i])
            }
        }
        return ary;
    };
    function prevAll(ele) {
        var ary=[];
        var prev=ele.previousElementSibling;
        while (prev){
            ary.unshift(prev);
            prev=prev.previousElementSibling
        }
        return ary;
    }
    return{
        toArray:toArray,
        children:children,
        prevAll:prevAll
    }
})();