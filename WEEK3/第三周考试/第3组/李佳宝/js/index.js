var data=null;
var strHTML=``;
var news=document.getElementById("news");
var xhr=new XMLHttpRequest();
xhr.open("GET","json/data.json",false);
xhr.onreadystatechange=function () {
    if(xhr.status===200&&xhr.readyState===4){
        data=$.toJSONObj(xhr.responseText);
    }
}
xhr.send(null);

function bindData(data) {
    data.forEach(function (item) {
        strHTML+=`
        <li>
        <div><img src="" photo="${item.src}" alt=""></div>
        <div>
        <h2>${item.title}</h2>
        <p>${item.description}</p>
</div>
</li>
        `;
    })
  news.innerHTML=strHTML;

}
bindData(data);

var wH=$.win("clientHeight");
var imgList=news.getElementsByTagName("img");
function delayLoad() {
    for(var i=0;i<imgList.length;i++){
        var sT=$.win("scrollTop");
        var bH=imgList[i].parentNode.offsetHeight;
        var bT=$.offset(imgList[i].parentNode).top;
        if(wH+sT>=bT+bH){
            imgLoad(imgList[i]);
            fadeIn(imgList[i]);
        }
    }
}

function imgLoad(imgList) {
    var img=new Image;
    img.src=imgList.getAttribute("photo");
    img.onload=function () {
        imgList.src=this.src;
    }
}
delayLoad();
function fadeIn(ele) {
    ele.timer=window.setInterval(function () {
        var opacity=$.css(ele,"opacity");
        opacity+=0.01;
        $.css(ele,"opacity",opacity);
        if(opacity>=1){
            window.clearInterval(ele.timer);
        }
    },30)
}

window.onscroll=delayLoad;















