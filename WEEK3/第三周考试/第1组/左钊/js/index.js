
var data = null;
var str = ``;
var news = document.getElementById("news");
var imgList = news.getElementsByTagName("img");
var wH = $.win("clientHeight");

//先通过ajax向服务器请求数据
var xhr = new XMLHttpRequest();
xhr.open("GET", "json/data.json", false);
xhr.onreadystatechange=function () {
    if (xhr.status === 200 && xhr.readyState === 4){
        data = $.toJSONObj(xhr.responseText);
    }
};
xhr.send(null);

//循环绑定数据
function bindHTML(data) {
    data.forEach(function (item) {
        str += `
            <li>
                <div>
                    <img src="" photo="${item.src}" alt="">
                </div>
                <div>
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                </div>
            </li>
            `
    })
    news.innerHTML = str;
}
bindHTML(data);

//延迟加载
function delayLoad() {
    //一屏高 + 滚出的距离 >= 盒子的高 + 盒子顶部相对于body的偏移量
    var sT = $.win("scrollTop");
    for(var i=0; i<imgList.length; i++){
        var boxH = imgList[i].offsetHeight;
        var boxT = $.offset(imgList[i]).top;
        
        if (wH + sT >= boxH + boxT){
            imgJudge(imgList[i]);
            fadeIn(imgList[i]);
        }
    }
};
delayLoad();

//判断图片地址是否正确，如果正确将其赋值给src
function imgJudge(img) {
    var newImg = new Image;
    newImg.src = img.getAttribute("photo");
    newImg.onload=function () {
        img.src = this.src;
    }
}

//实现渐变效果
function fadeIn(ele) {
    ele.timer = window.setInterval(function () {
        //先获取opacity属性
        var opacity = $.css(ele, "opacity");
        opacity += 0.01;
        //修改opacity
        $.css(ele, "opacity", opacity);
        //如果opacity>=1清空定时器
        opacity>=1?window.clearInterval(ele.timer):null;
    }, 30)
}

//添加onscroll事件
window.onscroll=delayLoad;