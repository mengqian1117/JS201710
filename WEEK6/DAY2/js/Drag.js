function Callbacks() {};
Callbacks.prototype.add=function (type) {
    if(!this[type]){
        this[type]=[];
    };
    [...arguments].slice(1).forEach((item)=>{
        if(!this[type].includes(item)){
            this[type].push(item)
        }
    });
    return this;
};
Callbacks.prototype.has=function(type,fn){
    //如果this下没有type这个数组,那就是undefined,而undisputed下没有includes方法,此时就会报错,所以说要先做一层判断  ,如果有这个数组才使用includes方法判断,没有数组直接return false;
    if(this[type]){
        return this[type].includes(fn);
    }else {
        return false;
    }
};
Callbacks.prototype.remove=function (type) {
    if(this[type]){
        [...arguments].slice(1).forEach((item)=>{
            if(this[type].includes(item)){
                this[type].splice(this[type].indexOf(item),1);
            }
        })
    };
    return this;
};
Callbacks.prototype.fire=function (type,e) {
    if(this[type]){
        this[type].forEach((item)=>{
            item.call(this,e);
        })
    }
    return this
};
function Drag(ele) {
    this.ele=ele;
    var _this=this;
    this._down=function (e) {
        _this.down(e);
    };
    this._move=function (e) {
        _this.move(e);
    };
    this._up=function (e) {
        _this.up(e);
    };
    this.ele.addEventListener("mousedown",this._down)
}
//原型继承
Drag.prototype=new Callbacks();
//解决constructor丢失问题
Drag.prototype.constructor=Drag;
Drag.prototype.down=function (e) {
    this.startX=e.clientX-this.ele.offsetLeft;
    this.startY=e.clientY-this.ele.offsetTop;
    document.addEventListener("mousemove",this._move);
    document.addEventListener("mouseup",this._up);
    this.fire("Down",e);
};
Drag.prototype.move=function (e) {
    this.ele.style.left=e.clientX-this.startX+"px";
    this.ele.style.top=e.clientY-this.startY+"px";
    //获取速度是在mousemove的过程获取的,所以让Move数组下的函数在这这里执行fire()
    this.fire("Move",e);
    e.preventDefault();
};
Drag.prototype.up=function (e) {
    document.removeEventListener("mousemove",this._move);
    document.removeEventListener("mouseup",this._up);
    this.fire("Up",e);
};
Drag.prototype.jump=function () {
    this.add("Up",drop,fly);
    this.add("Move",getSpeedX);
};
function getSpeedX(e) {
    //获取水平的速度:根据移动的快慢获取相邻两次的水平距离的差值
    //第一次时候没有差值,我们就把当时的鼠标位置e.clientX作为初始值
    if(!this.prevSpeedX){
        this.prevSpeedX=e.clientX;
    }else {
        //鼠标先在的位置-之前prevSpeedX
        this.speedX=e.clientX-this.prevSpeedX+10;
        this.prevSpeedX=e.clientX;
    }
}
function drop() {
    clearTimeout(this.dropTimer);
    var _this=this;
    if(!this.speedY){
        this.speedY=9.8;

    }else {
        this.speedY+=9.8;
    }
    this.speedY*=0.93;
    var t=this.ele.offsetTop+this.speedY;
    var maxT=(document.documentElement.clientHeight||document.body.clientHeight)-this.ele.offsetHeight;
    if(t>=maxT){
        t=maxT;
        this.speedY*=-1;
        this.flg++;
    }else {
        this.flg=0;
    }
    this.ele.style.top=t+"px";
    if(this.flg<2){
        this.dropTimer=setTimeout(function () {
            drop.call(_this);
        },20);
    }
};
function fly() {
    var _this=this;
    clearTimeout(this.flyTimer);
    //速度不断减小
    this.speedX*=0.93;
    //求出left值
    var l=this.ele.offsetLeft+this.speedX;
    //求出最大值
    var maxL=(document.documentElement.clientWidth||document.body.clientWidth)-this.ele.offsetWidth;
    //临界值判断
    if(l<=0){
        l=0;
        this.speedX*=-1;
    }else if(l>=maxL){
        l=maxL;
        this.speedX*=-1;
    }
    this.ele.style.left=l+"px";
    //速度一直在减小减小,我们使用的是this.ele.offsetLeft+this.speedX,因为this.ele.offsetLeft值浏览器默认是四舍五入的,所以所当|this.speedX|<0.5时候,直接没有作用了,这个时候就可以清掉定时器了
    if(Math.abs(this.speedX)>=0.5){
        this.flyTimer=setTimeout(function () {
            fly.call(_this);
        },20);
    }
}


