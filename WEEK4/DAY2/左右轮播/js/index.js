var banner = document.getElementById("banner");
var bannerInner = banner.getElementsByClassName("bannerInner")[0];
var focusList = banner.getElementsByClassName("focusList")[0];
var leftBtn = banner.getElementsByClassName("left")[0];
var rightBtn = banner.getElementsByClassName("right")[0];
var imgList = bannerInner.getElementsByTagName("img");
var list = focusList.getElementsByTagName("li");
var data = null;

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
}

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
        //获取一下可视窗口banner的宽
        var w = banner.offsetWidth;
        $.css(bannerInner, "width", (data.length + 1) * w);
        //将str1放到页面上的bannerInner中
        bannerInner.innerHTML = str1;
        //将str2放到focusList中
        focusList.innerHTML = str2;
    }
}

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
}
getData();
bindData();
delayLoad();
