var data=null;
var str=``;
var news=document.getElementById("news");
var imgList=news.getElementsByTagName("img");
var wH=$.win("clientHeight");
var xhr=new XMLHttpRequest();
xhr.open("get","json/data.json",false);
xhr.onreadystatechange=function () {
    if (xhr.status==200&&xhr.readyState==4){
        data=$.toJSONObj(xhr.responseText)
    }
};
xhr.send(null)

function bindHTML(data) {
    data.forEach(function (item) {
        str+=`<li>
<div><img src="" photo="${item.src}"alt=""></div>
<div>
<h2>${item.title}</h2>
<p>${item.description}</p>
</div>
</li>`
    });
    news.innerHTML=str;
}
bindHTML(data);

function delayLoad() {
    for (var i=0;i<imgList.length;i++){
        var sH=$.win("scrollHeight");
        var boxH=imgList[i].parentNode.offsetHeight;
        var boxT=$.offset(imgList[i].parentNode).top;
        if (sH+wH>=boxH+boxT){
            imgLoad(imgList[i]);
            fadeIn(imgList[i])
        }
    }
}

function imgLoad(imgList) {
    var img=new Image;
    img.src=imgList.getAttribute("photo");
    img.onload=function () {
        imgList.src=this.src
    }
}
delayLoad();


function fadeIn(ele) {
    ele.timer=window.setInterval(function () {
        var opacity=$.css(ele,"opacity");
        opacity+=0.01;
        $.css(ele,"opacity",opacity);
        if (opacity>=1){
            window.clearInterval(ele.timer)
        }
    },30)
}

window.onscroll=delayLoad;