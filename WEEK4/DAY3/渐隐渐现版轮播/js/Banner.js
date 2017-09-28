function Banner(id, url, duration, interval) {
    //this:实例
    //将一些变量放在this实例的私有属性上
    //var banner=document.getElementById(id)
    this.banner = document.getElementById(id);
    this.bannerInner = this.banner.getElementsByClassName("bannerInner")[0];
    this.focusList = this.banner.getElementsByClassName("focusList")[0];
    this.leftBtn = this.banner.getElementsByClassName("left")[0];
    this.rightBtn = this.banner.getElementsByClassName("right")[0];
    this.imgList = this.bannerInner.getElementsByTagName("img");
    this.list = this.focusList.getElementsByTagName("li");
    this.url = url;
    this.data = null;
    this.step = 0;
    this.timer = null;
    this.isClick = true;
    this.duration = duration || 1000;
    this.interval = interval || 2000;
    if (this.duration > this.interval) {
        this.duration = this.duration + this.interval;
        this.interval = this.duration - this.interval;
        this.duration = this.duration - this.interval;
    }
    this.name = "孟倩";
}

//写在Banner的prototype原型上的公有的方法
//1.获取数据
Banner.prototype.getData = function () {
    //this->当前实例
    var _this = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.url, false);
    xhr.onreadystatechange = function () {
        //this ->xhr
        if (xhr.status === 200 && xhr.readyState === 4) {
            _this.data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);
    return this;
};

//2.绑定数据
Banner.prototype.bindData=function () {
    if (this.data) {
        var str1 = ``, str2 = ``;
        this.data.forEach(function (item, index) {
            str1 += `<div><img src="" photo="${item.src}"></div>`;
            str2 += index == 0 ? `<li class="selected"></li>` : `<li></li>`;
        });
        this.bannerInner.innerHTML = str1;
        this.focusList.innerHTML = str2;
    }
    return this;
};

//3.延迟加载
Banner.prototype.delayLoad=function () {
    var _this=this;
    for (var i=0;i<this.imgList.length;i++){
        var curImg=new Image();
        curImg.src=this.imgList[i].getAttribute("photo");
        curImg.i=i;
        curImg.onload=function () {
            _this.imgList[this.i].src=this.src;
            if(this.i==0){
                $.css(_this.imgList[0].parentNode,{zIndex:1}).animation({opacity:1},1000);
            }
        }
    }
    return this;
};

//4.公有方法move
Banner.prototype.move=function () {
    if(this.isClick){
        this.isClick=false;
        this.step++;
        if(this.step==this.data.length){
            this.step=0;
        }
        this.setImg();
    }
};

//5.公有方法setImg
Banner.prototype.setImg=function () {
    var _this=this;
    for (var i=0;i<this.imgList.length;i++){
        if(i==this.step){
            $.css(this.imgList[i].parentNode,{zIndex:1}).animation({opacity:1},this.duration,function () {
                //this:当前执行动画的元素
                var sib=$.siblings(this);
                sib.forEach(function (item) {
                    $.css(item,{opacity:0});
                });
                _this.isClick=true;
            });
            this.list[i].className="selected";
        }else {
            $.css(this.imgList[i].parentNode,{zIndex:0});
            this.list[i].className="";
        }
    }
};

//6.自动轮播autoMove
Banner.prototype.autoMove=function () {
    var _this=this;
    //一旦执行autoMove,实例就会增加一个属性auto值为true;
    this.auto=true;
    this.timer=window.setInterval(function () {
        //this==window
        _this.move();
    },this.interval);
    return this;
};

//7.鼠标滑过事件
Banner.prototype.mouseEvent=function () {
    //this:实例
    var _this=this;
    this.banner.onmouseover=function () {
        //this->banner
        window.clearInterval(_this.timer);
        _this.leftBtn.style.display="block";
        _this.rightBtn.style.display="block";
    };
    this.banner.onmouseout=function () {
        //先判断有没有auto属性,只有有这个属性才会继续自动轮播
        if(_this.auto){
            _this.timer=window.setInterval(function () {
                //this==window
                _this.move();
            },_this.interval);
        }
        _this.leftBtn.style.display="none";
        _this.rightBtn.style.display="none";
    };
    return this;
};

//8.焦点点击事件
Banner.prototype.focusClick=function () {
    var _this=this;
    for(var i=0;i<this.list.length;i++){
        this.list[i].i=i;
        this.list[i].onclick=function () {
            //this:点击的元素
            if (_this.isClick){
                _this.isClick=false;
                _this.step=this.i;
                _this.setImg();
            }
        }
    };
    return this;
};

//9.左右按钮点击
Banner.prototype.arrowClick=function () {
    var _this=this;
    this.rightBtn.onclick=function () {
        //this==rightBtn
        _this.move();
    };
    this.leftBtn.onclick=function () {
        //this==leftBtn
        if(_this.isClick){
            _this.isClick=false;
            if(_this.step==0){
                _this.step=_this.data.length;
            }
            _this.step--;
            _this.setImg();
        }
    };
    return this;
};

//10.初始化轮播
Banner.prototype.init=function () {
    this.getData();
    this.bindData();
    this.delayLoad();
    return this;
};