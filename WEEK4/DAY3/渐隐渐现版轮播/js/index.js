var banner=document.getElementById("banner");
var bannerInner=banner.getElementsByClassName("bannerInner")[0];
var focusList=banner.getElementsByClassName("focusList")[0];
var leftBtn=banner.getElementsByTagName("a")[0];
var rightBtn=banner.getElementsByTagName("a")[1];
var imgList=bannerInner.getElementsByTagName("img");
var list=focusList.getElementsByTagName("li");
var data=null,timer=null,step=0,isClick=true;
//1.获取数据
;(function () {
    var xhr=new XMLHttpRequest();
    xhr.open("GET","json/data.json",false);
    xhr.onreadystatechange=function () {
        if(xhr.status==200&&xhr.readyState==4){
            data=$.toJSONObj(xhr.responseText);
        }
    };
    xhr.send(null);
})();
//2.绑定数据
;(function (data) {
    if(data){
        var str1=``,str2=``;
        for(var i=0;i<data.length;i++){
            str1+=`<div><img src="" photo="${data[i].src}"></div>`;
            str2+=i==0?`<li class="selected"></li>`:`<li></li>`
        }
        bannerInner.innerHTML=str1;
        focusList.innerHTML=str2;
    }
})(data);
//3.延迟加载
function delayLoad() {
    for(var i=0;i<imgList.length;i++){
        var curImg=new Image();
        curImg.src=imgList[i].getAttribute("photo");
        curImg.i=i;
        curImg.onload=function () {
            imgList[this.i].src=this.src;
            //将第一张图片的父亲div的层级关系zIndex变成1
            $.css(imgList[0].parentNode,"zIndex",1).animation({opacity:1},1000);
        }
    }
};
//4.自动轮播
function move() {
   if(isClick){
       isClick=false;
       step++;
       if(step==data.length){
           step=0;
       }
       //切换图片
       setImg()
   }
}
function setImg() {
    //循环所有的图片,判断图片的索引是否等于step,等于step那张图片,先把他的父亲的层级关系z-index变成1,再把透明度opacity不断增加到1,不能等于step的,他的父亲的层级关系z-index变成0
    for(var i=0;i<imgList.length;i++){
        if(i==step){
            $.css(imgList[i].parentNode,"zIndex",1).animation({opacity:1},1000,function () {
                // //获取当前元素所有的兄弟们得到一个数组,循环数组,将每一个兄弟元素的透明度变成0
                //为了防止背景图的外漏比较丑,我们把其他的透明改变放在动画完成之后
                var s=$.siblings(this);
                s.forEach(function (item) {
                    $.css(item,{opacity:0});
                });
                isClick=true;
            });
            //焦点同步
            list[i].className="selected";
        }else {
            //改变层级关系写在动画之前
            $.css(imgList[i].parentNode,{zIndex:0});
            list[i].className="";
        }
    }
}
//5.鼠标滑过事件
function mouseEvent() {
    banner.onmouseover=function () {
        //停止自动切换,清掉定时器
        window.clearInterval(timer);
        $.css(leftBtn,{display:"block"});
        $.css(rightBtn,{display:"block"});
    };
    banner.onmouseout=function () {
        //继续自动切换,开启定时器
        timer=window.setInterval(move,3000);
        $.css(leftBtn,{display:"none"});
        $.css(rightBtn,{display:"none"});
    }
}

//6.焦点点击事件
function focusClick() {
    for(var i=0;i<list.length;i++){
        list[i].onclick=function () {
            if(isClick){
                isClick=false;
                step=$.index(this);
                setImg();
            }
        }
    }
}
//7.左右按钮点击事件
function arrowClick() {
    rightBtn.onclick=move;
    leftBtn.onclick=function () {
        if(isClick){
            isClick=false;
            if(step==0){
                step=data.length;
            }
            step--;
            setImg();
        }
    }
}
delayLoad();
timer=window.setInterval(move,3000);
mouseEvent();
focusClick();
arrowClick();
