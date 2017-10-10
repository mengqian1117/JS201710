var data=null;
var str=``;
var news=document.getElementById("news");


var xhr=new XMLHttpRequest();
xhr.open("GET","json/data.json",false);
xhr.onreadystatechange=function () {
    if(xhr.status===200&&xhr.readyState===4){
        data=$.toJSONObj(xhr.responseText);
        console.log(data);
    }
};
xhr.send(null);

function bindData(data) {
    data.forEach(function (item) {
        str+=`
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
    });
    news.innerHTML=str;
}
bindData(data);

var imgList=news.getElementsByTagName("img");
var wH=$.win("clientHeight");
console.log(wH);
function daleyLoad() {
    for(var i=0;i<imgList.length;i++){
        var boxT=$.offset(imgList[i].parentNode).top;
        var boxH=imgList[i].parentNode.offsetHeight;
        var sT=$.win("scrollTop");
        if(wH+sT>=boxH+boxT){
            imgLoad(imgList[i]);
            fadeIn(imgList[i])
        }
    }
}
daleyLoad();
function imgLoad(imgList) {
     var oImg=new Image;
     oImg.src=imgList.getAttribute("photo");
     oImg.onload=function () {
         imgList.src=this.src
     }
}
function fadeIn(ele) {
    ele.timer=window.setInterval(function () {
        var opacity=$.css(ele,"opacity");
        opacity+=0.01;
        $.css(ele,"opacity",opacity);
        if(opacity>=1){
            window.clearInterval(ele.timer)
        }
    },30)
}

window.onscroll=daleyLoad;