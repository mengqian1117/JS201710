var HtmlStr = ``;
var data = null;
var news = document.getElementById("news");
var imageList = news.getElementsByTagName("img");
var xhr = new XMLHttpRequest();
xhr.open("get", "json/data.json", false);
xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
        data = $.toJSONObj(xhr.responseText);
    }
}
xhr.send(null);
function bindHtml(data) {
    HtmlStr = ``;
    data.forEach(function (item) {
        HtmlStr += `
         <li>
            <div><img src="" alt="" photo="${item.src}"></div>
                <div>
                <h3>${item.title}</h3>
            <p>${item.description}</p>
            </div>
        </li>
       `;
    })
    news.innerHTML = HtmlStr;
}
bindHtml(data);
function delayLoad() {
    //一屏的高
    var cH = $.win("clientHeight");
    //屏幕滚上去的高度
    var sT = $.win("scrollTop");
    for (var i = 0; i < imageList.length; i++) {
        var bH = imageList[i].offsetHeight;
        var bT = $.offset(imageList[i]).top;
        var reg = /jpg|gif|png|jpeg$/
        var imgSrc = imageList[i].src;
        if (!reg.test(imgSrc)) {
            if (cH + sT > bH + bT) {
                loadImg(imageList[i]);
                fadeIn(imageList[i]);
            }
        }
    }
}
function loadImg(Img) {
    var img = new Image;
    img.src = Img.getAttribute("photo");
    img.onload = function () {
        Img.src = this.src;
    }
}
function fadeIn(Img) {
    Img.timer=window.setInterval(function () {
        var opacity=$.css(Img,"opacity");
        opacity+=0.01;
        $.setCss(Img,"opacity",opacity);
        if(opacity>=1){
            window.clearInterval(Img.timer);
        }
    },50);

}
delayLoad();
window.onscroll=delayLoad;