var data = null;
var strHTML = ``;
var list = document.getElementById("list");
var imgList = document.getElementsByTagName("img");
var oLi=list.getElementsByTagName("li");

var xhr = new XMLHttpRequest;
xhr.open("GET", "json/data.json", false);
xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
        data = JSON.parse(xhr.responseText);
    }
};
xhr.send(null);

function bindData(data) {
    data.forEach(function (item) {
        strHTML += `<li>
                <div>
                    <img src=" " photo="${item.src}">
                </div>
                <div>
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                </div>
                </li>
`
    })
    list.innerHTML = strHTML;
}

bindData(data);

var winH = $.win("clientHeight");

function lazyLoad() {
    for (var i = 0; i < imgList.length; i++) {
        var boxH = imgList[i].parentNode.offsetHeight;
        var boxT = $.offset(imgList[i].parentNode).top;
        var sT = $.win("scrollTop");
        if (sT > boxT + boxH - winH) {
            imgLoad(imgList[i]);
            fadeIn(imgList[i]);


        }
    }
}

function imgLoad(imgList) {
    var img = new Image;
    img.src = imgList.getAttribute("photo");
    img.onload = function () {
        imgList.src = this.src;
    }
}

function fadeIn(ele) {
    ele.timer = window.setInterval(function () {
        var opacity = $.css(ele, "opacity");
        opacity += 0.005;
        $.css(ele, "opacity", opacity);
        if (opacity > 1) {
            window.clearInterval(ele.timer);
        }
    }, 30)
}

lazyLoad();

window.onscroll = lazyLoad;
