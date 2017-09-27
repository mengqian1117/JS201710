var banner = document.getElementById("banner");
var bannerInner = banner.getElementsByClassName("bannerInner")[0];
var focusList = banner.getElementsByClassName("focusList")[0];
var leftBtn = banner.getElementsByClassName("left")[0];
var rightBtn = banner.getElementsByClassName("right")[0];
var imgList = bannerInner.getElementsByTagName("img");
var list = focusList.getElementsByTagName("li");
var data = null,timer=null,step=0,isClick=true;
//获取一下可视窗口banner的宽
var w = banner.offsetWidth;
//step:记录当前是第几张图片

//1.获取数据
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "json/data.json", false);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            data = $.toJSONObj(xhr.responseText)
        }
    };
    xhr.send(null);
};

//2.绑定数据
function bindData() {
    if (data) {
        //str1:放轮播区域,str2:焦点区域
        var str1 = ``, str2 = ``;
        for (var i = 0; i < data.length; i++) {
            str1 += `<div><img src="" photo="${data[i].src}"></div>`;
            //默认第一个li有选中样式
            str2 += i == 0 ? `<li class="selected"></li>` : `<li></li>`;
        }
        //为了实现无缝滚动在最后面多拼接一张图片,拼接第一张即可
        str1 += `<div><img src="" photo="${data[0].src}"></div>`;
        //根据数据绑定后的内容给bannerInner设置宽
        $.css(bannerInner, "width", (data.length + 1) * w);
        //将str1放到页面上的bannerInner中
        bannerInner.innerHTML = str1;
        //将str2放到focusList中
        focusList.innerHTML = str2;
    }
};

//3.图片的延迟加载
function delayLoad() {
    for(var i=0;i<imgList.length;i++){
        var img=document.createElement("img");
        img.src=imgList[i].getAttribute("photo");
        img.index=i;
        img.onload=function () {
            imgList[this.index].src=this.src;
            imgList[this.index].animation({opacity:1},1500)
        }
    }
};

//4.自动轮播
function move() {
    //临界值判断
    if(step==data.length){
        step=0;
        //此时让bannerInner回到最初的位置,让其left=0即可
        $.css(bannerInner,"left",0);
    }
    step++;
    //每一次运动left都正好是变成-step*w
    //注意:运动的总时间一定小于运动的频率(定时器的第二个参数)
    bannerInner.animation({left:-step*w},1000,function () {
        isClick=true;
    });
    focusAlign();
}

//5.焦点对齐
function focusAlign() {
    for (var i=0;i<list.length;i++){
        if(step==4){
            list[0].className="selected";
        }
        list[i].className=i===step?"selected":'';
    }
}

//6.鼠标滑过事件
function mouseEvent() {
    //鼠标放上停止轮播,显示左右箭头按钮
    banner.onmouseover=function () {
        window.clearInterval(timer);
        $.css(leftBtn,"display","block");
        $.css(rightBtn,"display","block");
    };
//鼠标移开继续轮播,隐藏左右箭头按钮
    banner.onmouseout=function () {
        timer=window.setInterval(move,2000);
        $.css(leftBtn,"display","none");
        $.css(rightBtn,"display","none");
    };
}

//7.左右切换事件
function arrowChange() {
    rightBtn.onclick=function () {
        if(isClick){
            isClick=false;
            move();
        }
    };
    leftBtn.onclick=function () {
       if(isClick){
           isClick=false;
           if(step==0){
               step=data.length;
               $.css(bannerInner,{left:-step*w});
           }
           step--;
           bannerInner.animation({left:-step*w},1000,function () {
               isClick=true;
           });
           focusAlign();
       }
    };
}

//8.焦点点击事件
function focusChange() {
    for (var i=0;i<list.length;i++){
        list[i].i=i;
        list[i].onclick=function () {
            if(isClick){
                isClick=false;
                step=this.i;
                bannerInner.animation({left:-step*w},1000,function () {
                  isClick=true;
                });
                focusAlign();
            }
        }
    }
}
getData();
bindData();
delayLoad();
timer=window.setInterval(move,2000);
mouseEvent();
arrowChange();
focusChange();
