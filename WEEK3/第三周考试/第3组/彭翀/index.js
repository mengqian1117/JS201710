/**
 * Created by pengchong on 17/9/23.
 */
var data = null;
var strHtml = ``;
var box = document.getElementById("box");
var oImgs = document.getElementsByTagName("img");
var wH = $.win("clientHeight");
var wH = $.win("scrollHeight");
var xhr = new XMLHttpRequest();
xhr.open("GET", "json/data.json", false);
xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
        data = $.toJSONObj(xhr.responseText);
    }
};
xhr.send(null);

function getHtml(data) {
    strHtml = ``;
    data.forEach(function (item) {
        strHtml += `<li>
        <div><img src="" pic="${item.src}" alt=""></div>
        <div>
            <h2>${item.title}</h2>
            <p>${item.description}</p>
        </div>
    </li>`
    });

    box.innerHTML = strHtml;
}
getHtml(data);

function delayLoad() {
    for (var i = 0; i < oImgs.length; i++) {
        var sT = $.win("scrollTop");
        var boxH = oImgs[i].parentNode.offsetHeight;
        var boxT = $.offset(oImgs[i].parentNode).top;
        if (sT + wH >= boxH + boxT) {
            imgLoad(oImgs[i]);
            fadeIn(oImgs[i]);
        }
    }
}
delayLoad();

function imgLoad(pic) {
    var img = new Image;
    img.src = pic.getAttribute("pic");
    img.onload = function () {
        pic.src = this.src;
    };
}

function fadeIn(curEle) {
    curEle.timer = window.setInterval(function () {
        var opacity = $.css(curEle,"opacity");
        opacity+=0.01;
        $.css(curEle,{opacity:opacity});
        if(opacity>=1){
            window.clearInterval(curEle.timer);
        }
    },30)
}
window.onscroll=delayLoad;


