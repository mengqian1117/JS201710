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

//add:订阅
//fire:发布