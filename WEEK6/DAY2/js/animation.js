Element.prototype.animation=function () {
    //this,当前执行动画的元素
    var _this=this;
    var target,begin={},duration,interval,time=0,timer=null,effect,cbAry=[],numAry=[];
    for (var i=0;i<arguments.length;i++){
        if (arguments[i].toString()=="[object Object]"){
            target=arguments[i];
        }else if(typeof arguments[i]=="function"){
            cbAry.push(arguments[i])
        }else if(typeof arguments[i]=="number"){
            numAry.push(arguments[i])
        }
    }
    target=target||{};
    for(var i=0;i<numAry.length;i++){
        if (numAry[i]>100){
            duration=numAry[i];
            numAry.splice(i,1);
            i--;
        }
    }
    duration=duration||2000;
    interval=numAry[0]||17;
    effect=(isNaN(numAry[1])||numAry[1]>24)?0:numAry[1];
    for (var key in target){
        begin[key]=$.css(this,key)
    }
    var Effect = {
        //匀速
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        //指数衰减的反弹缓动
        BounceEaseIn: function (t, b, c, d) {
            return c - Effect.BounceEaseOut(d - t, 0, c, d) + b;
        },
        BounceEaseOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        BounceEaseInOut: function (t, b, c, d) {
            if (t < d / 2) {
                return Effect.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
            }
            return Effect.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        },

        //二次方的缓动
        QuadEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        QuadEaseOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        QuadEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },

        //三次方的缓动
        CubicEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        CubicEaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        CubicEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },

        //四次方的缓动
        QuartEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        QuartEaseOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        QuartEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t + b;
            }
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },

        //五次方的缓动
        QuintEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        QuintEaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        QuintEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },

        //正弦曲线的缓动
        SineEaseIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        SineEaseOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        SineEaseInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },

        //指数曲线的缓动
        ExpoEaseIn: function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        ExpoEaseOut: function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        ExpoEaseInOut: function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },

        //圆形曲线的缓动
        CircEaseIn: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        CircEaseOut: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        CircEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },

    };
    var effectAry=[];
    for (var key in Effect ){
        effectAry.push(Effect[key])
    };
    timer=window.setInterval(function () {
        time+=interval;
        if(time>=duration){
            window.clearInterval(timer);
            for (var key in target){
                $.css(_this,key,target[key]);
            }
            cbAry.forEach(function (item) {
                item.call(this);
            },_this);
            return;
        }
        for(var key in target){
            $.css(_this,key,effectAry[effect](time,begin[key],target[key]-begin[key],duration));
        }
    },interval);
    return this;//链式写法原理 return this
};