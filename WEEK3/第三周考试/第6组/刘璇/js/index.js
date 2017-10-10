var news = document.getElementById("news");
var wH = $.win("clientHeight");

//  获取json数据
function getData() {
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "json/data.json", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304)) {
            data = $.toJSONObj(xhr.responseText);
        }
    }
    xhr.send(null);
    return data;
}

var dataObj = getData();

//  绑定数据
function bindHTML(strObj) {
    var strHTML = ``;
    strObj.forEach(function (item) {
        strHTML += `<li>
            <div class="photo"><img src="" data-photo ="${item.src}"/></div>
            <div class="text">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
            </div>
        </li>`;
    });
    news.innerHTML = strHTML;
    strHTML = null;
}

bindHTML(dataObj);


//  延迟加载
function delayLoad() {
    var imgList = news.getElementsByTagName("img");
    for (var i = 0; i < imgList.length; i++) {
        var sT = $.win("scrollTop");
        var imgH = imgList[i].parentNode.offsetHeight;
        var imgT = $.offset(imgList[i].parentNode).top;
        if (sT + wH >= imgH + imgT) {
            imgLoad(imgList[i]);
            fadeIn(imgList[i]);
        }
    }
}

delayLoad();

//  加载图片
function imgLoad(photo) {
    var img = new Image;
    img.src = photo.getAttribute("data-photo");
    img.onload = function () {
        photo.src = this.src;
        img = null;
    };
    img.onerror = function () {
        photo.src = "img/error.jpg";
    };
}

// 图片加载样式
function fadeIn(ele) {
    ele.timer = setInterval(function () {
        var opacity = $.css(ele, "opacity")
        opacity += 0.01;
        $.css(ele,"opacity", opacity);
        if (opacity >= 1) {
            clearInterval(ele.timer);
            //opacity = 1;
        }
    }, 50);
}

window.onscroll = delayLoad;



