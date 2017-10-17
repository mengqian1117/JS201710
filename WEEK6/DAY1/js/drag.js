function Callbacks() {
    this.CB = {};
}
Callbacks.prototype.add = function (type) {
    //1.根据type判断this.CB中有没有叫type的数组
    //2.如果没有就给this.CB增加一个叫type的属性,属性值是个数组
    if(!this.CB[type]){
        this.CB[type]=[];
    }
    //3.向数组type中添加函数(从第二个参数开始才是添加的函数)
    [...arguments].slice(1).forEach(function (item) {
        if(typeof item =="function"){
            if(!this.CB[type].includes(item)){
                this.CB[type].push(item);
            }
        }
    },this);
    return this;
};
Callbacks.prototype.has = function (type,fn) {
    //先判断有没有数组type,再判断type中有没有fn
    if(this.CB[type]){
        return this.CB[type].includes(fn);
    }else {
        return false;
    }
};
Callbacks.prototype.remove = function (type) {
    //首先数组得有,才能往下走
    if(this.CB[type]){
        //从第二个参数开始遍历的,判断每一个函数在不在数组type中,有的话才删除
        [...arguments].slice(1).forEach(function (item) {
            if(this.CB[type].includes(item)){
                this.CB[type].splice(this.CB[type].indexOf(item),1)
            }
        },this)
    };
    return this;
};
Callbacks.prototype.fire = function (type) {
    //给每一个函数item传的参数是type后面的,也就是arguments从索引1开始的
    var arg=[...arguments].slice(1);
    if(this.CB[type]){
        this.CB[type].forEach(function (item) {
            item.apply(this,arg);
            //item.call(this,...arg);
        },this)
    };
    return this;
};
//组合继承,call继承(拿到CB变成Drag实例的私有属性)+Object.assign拿到Callbacks的原型上的公有属性变成自己的公有属性;
Drag.prototype=Object.assign(Drag.prototype,Callbacks.prototype);
function Drag(ele) {
    //this.ele:当前被拖拽的元素
    this.ele=ele;
    var _this=this;
    this._down=function (e) {
        //this==当前被拖拽的元素ele
        _this.down(e);
    };
    this._move=function (e) {
        _this.move(e)
    };
    this._up=function (e) {
        _this.up(e);
    };
    Callbacks.call(this);
    //给当前被拖拽的元素绑定mousedown事件,this._down里面的this是this.ele;
    this.ele.addEventListener("mousedown",this._down);
}
Drag.prototype.down=function (e) {
    //this:当前实例
    //当按下盒子的一瞬间,记录当前鼠标距离盒子的距离,存在this实例上
    this.startX=e.clientX-this.ele.offsetLeft;
    this.startY=e.clientY-this.ele.offsetTop;
    //给this.ele绑定mousemove事件
    document.addEventListener("mousemove",this._move);
    document.addEventListener("mouseup",this._up);
    //执行down类型的数组中的函数
    this.fire("down");
};
Drag.prototype.move=function (e) {
    //根据鼠标的位置求出盒子的位置
    var l=e.clientX-this.startX;
    var t=e.clientY-this.startY;
    this.ele.style.left=l+"px";
    this.ele.style.top=t+"px";
    e.preventDefault();
};
Drag.prototype.up=function (e) {
    document.removeEventListener("mousemove",this._move);
    this.fire("up");
};
//Drag第一次扩展
//实现border问题
Drag.prototype.addBorder=function () {
    this.add("down",this.ab);
    this.add("up",this.rb);
};
Drag.prototype.ab=function (e) {
    this.ele.className="ab";
    this.ele.children[0].style.display="none";
};
Drag.prototype.rb=function (e) {
    this.ele.className="";
    this.ele.children[0].style.display="block";
};

//Drag的第二次扩展
//实现弹跳
Drag.prototype.jump=function () {
    this.add("up",drop)
};
function drop (e) {
    var _this=this;
    //每一次执行先把上一次执行的定时器清除掉,防止定时器的积累
    window.clearTimeout(this.dropTimer);
    //如果没有速度,先给他一个初始值
    if(!this.speedY){
        this.speedY=9.7;
    }else {
        //让速度每一次增加9.8
        this.speedY += 9.7;
    }
    //加点空气的摩擦阻力
    this.speedY*=0.93;
    //临界值判断
    var t=this.ele.offsetTop+this.speedY;
    var maxT=(document.documentElement.clientHeight||document.body.clientHeight)-this.ele.offsetHeight;
    if(t>=maxT){
        t=maxT;
        this.speedY*=-1;
        this.flag++;
    }else {
        this.flag=0;
    }
    console.log(this.flag);
    this.ele.style.top=t+"px";
    if(this.flag<2){
        this.dropTimer=window.setTimeout(function () {
            //this==>window
            drop.call(_this,e);
        },20);
    }
};