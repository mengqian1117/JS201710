var main = document.getElementById("main");
var data = null;
var htmlStr = ``;
var wH = $.win("clientHeight");
var imgList = null;
var xhr = new XMLHttpRequest();
xhr.open("get", "json/data.json", false);
xhr.onreadystatechange = change;
xhr.send(null);
//加载图片
loadImg();
window.onscroll=loadImg;
//xhr事件
function change() {
    if (xhr.status == 200 && xhr.readyState == 4) {
        data = xhr.responseText;
        data = $.toJSONObj(data);
        if (data) {
            bindHtml(data);
        }
    }
}
//绑定html
function bindHtml(data) {
    data.forEach(function (item) {
        htmlStr += `<li><div><img src="" photo="${item.src}" alt=""></div><div><h3>${item.title}</h3><p>${item.description}</p></div></li>`
    })
    main.innerHTML = htmlStr;

}
//图片替换
function loadImg() {
    if (!imgList) {
        imgList = main.getElementsByTagName("img");
    }
        for (var i = 0; i < imgList.length; i++) {
            var parent = imgList[i].parentNode;
            var pT = $.offset(parent).top;
            var pH = parent.offsetHeight;
            var wT = $.win("scrollTop");
            // console.log("wH",wH);
            // console.log("ot",oT);
            // console.log("ow",oW);
            // console.log("wt",wT);

            if (wH + wT >= pT + pH) {
                var img = new Image;
                img.src = imgList[i].getAttribute("photo");
                img.item = imgList[i];
                img.onload = function () {
                    this.item.src = this.src;
                    fadeIn(this.item);
                }
            }
        }

}
//图片显示
function fadeIn(curImg) {
    var opacity = $.getCss(curImg, "opacity");

    curImg.timer = setInterval(function () {
        if (opacity >= 1) {
            clearInterval(curImg.timer);
            return
        } else {
            opacity += 0.01;
            $.css(curImg, "opacity", opacity);
        }
    }, 50)
}
