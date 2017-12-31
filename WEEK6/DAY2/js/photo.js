//1.因为我们需要让每一个li实现拖拽,就必须让所以的li定位,这样left和top才会起作用,但是css样式书写的时候计算定位的位置比较麻烦,只能浮动,所以我们需要使用JS操作将li变成定位元素,每一个li的left和top正好对应他自己的offsetLeft和offsetTop
//实现布局浮动变定位
//注意:定位时候顺序从后往前
var oLis=document.getElementById("list").getElementsByTagName("li");
for (var i=oLis.length-1;i>=0;i--){
    //顺便把每一个元素的left值和top,存在自己的自定义属性l和t上
    oLis[i].style.left=(oLis[i].l=oLis[i].offsetLeft)+"px";
    oLis[i].style.top=(oLis[i].t=oLis[i].offsetTop)+"px";
    oLis[i].style.position="absolute";
    oLis[i].style.margin=0;
    new Drag(oLis[i]).add("Down",addZIndex).add("Move",touchChange).add("Up",changePosition);
}
//1.被拖拽的元素 层级关系提高,addZIndex这个函数发生在鼠标按下的时候,也就是down函数中,我们把addZIndex函数加载Down这个数组中
var zIndex=0;
function addZIndex() {
    //this 当前实例
    //this.ele  当前被拖拽的元素
    this.ele.style.zIndex=++zIndex;
};

//2.拖动的时候判断其他的li是否跟当前被拖拽的li元素发生碰撞
function isTouch(cur,other) {
    //cur:当前被拖拽的元素
    //other:其他元素

    // if(cur.offsetLeft+cur.offsetWidth<other.offsetLeft||cur.offsetTop+cur.offsetHeight<other.offsetTop||cur.offsetLeft>other.offsetLeft+other.offsetWidth||cur.offsetTop>other.offsetTop+other.offsetHeight){
    //    return false;
    // }else {
    //     return true;
    // }
    if ((cur.offsetLeft > other.offsetLeft - cur.offsetWidth && cur.offsetLeft < other.offsetWidth + other.offsetLeft) && (cur.offsetTop > other.offsetTop - cur.offsetHeight && cur.offsetTop < other.offsetHeight + other.offsetTop)){
        return true;
    }else {
        return false;
    }
}

function touchChange() {
    //创建一个数组,用来存储发生碰撞的元素,方便后面选择出距离最近的元素
    //将这个数组用自定义属性存在当前实例上
    this.touchAry=[];
    //循环序所有的li;去跟当前被拖拽的元素比较,看看是否发生碰撞
    for(var i=0;i<oLis.length;i++){
        //因为oLis中包含被拖拽的元素,不需要跟自己去比较,所以遇到自己了,跳过去
        if(oLis[i]==this.ele){
            continue;
        }
        //如果发生碰撞就存起来,只要是通过isTouch判断结果是true,就push到数组 this.touchAry中
        if(isTouch(this.ele,oLis[i])){
            this.touchAry.push(oLis[i]);
            oLis[i].style.backgroundColor="orange";
        }else {
            oLis[i].style.backgroundColor=null;
        }
    }
};

//交换位置,发生在鼠标松开,mouseup事件下,将它add到"Up"这个数组中

function changePosition() {
    //获取出存在实例this中那个存放碰撞元素的数组,this.touchAry
    var ary=this.touchAry;
    //然后循环这个数组ary,分别求出每一项距离当前被拖拽元素this.ele的距离,然后将求出的这个距离存到每一个元素的自定义属性distance上
    if(ary.length){
        //只有数组中有值的时候进行的操作
        ary.forEach((item)=>{
            item.distance=Math.sqrt(Math.pow(this.ele.offsetLeft-item.offsetLeft,2)+Math.pow(this.ele.offsetTop-item.offsetTop,2));
            //将所有的li的背景颜色都去掉
            item.style.backgroundColor=null;
        });
        //根据每一个li中的distance进行从小到大排序
        ary.sort((a,b)=>{
            return a.distance-b.distance;
        });
        //ary[0]就是距离当前拖拽元素this.ele最近的元素了
        this.ele.style.backgroundColor="yellow";
        ary[0].style.backgroundColor="yellow";
        //让this.ele和ary[0]以动画的形式交换位置
        ary[0].animation({left:this.ele.l,top:this.ele.t},700,17,2,function () {
            //将自定义熟悉l和t的值变成现在的left和top
            this.l=this.offsetLeft;
            this.t=this.offsetTop;
        });
        this.ele.animation({left:ary[0].l,top:ary[0].t},700,17,2,function () {
            //将自定义熟悉l和t的值变成现在的left和top
            this.l=this.offsetLeft;
            this.t=this.offsetTop;
        });
    }else {
        //如果没有跟任何元素发生碰撞,此时this.touchAry的length是0
        //让当前被拖拽的元素this.ele回到自己的位置上即可
        this.ele.animation({left:this.ele.l,top:this.ele.t},700,17,2);
    }


}