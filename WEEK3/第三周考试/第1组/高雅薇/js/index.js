var data=null;
var str=``;
var news=document.getElementById("news");
var wh=$.win("clientHeight");


var xhr=new XMLHttpRequest();
xhr.open("GET","json/data.json",false);
xhr.onreadystatechange=function () {
    if(xhr.status===200&&xhr.readyState===4){
        data=$.toJSONObj(xhr.responseText);
        console.log(data);
    }
};
xhr.send(null);

//循环绑定事件
function bindData(data) {
    data.forEach(function (item) {
        str+=`
          <li>
        <div>
            <img src=""  photo="${item.src}" alt="">
        </div>
        <div>
            <h2>${item.title}</h2>
            <p>${item.description}</p>
        </div>
    </li>
             `;
    })
    news.innerHTML=str;
}
bindData(data);

//图片延时加载
var imgList=document.getElementsByTagName("img");
function delayOnload() {
    for (var i=0;i<imgList.length;i++){
        var st=$.win("scrollTop");
        var boxH=imgList[i].parentNode.offsetHeight;
        var boxT=$.offset(imgList[i].parentNode).top;
        if(st+wh>=boxH+boxT){
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

delayOnload();

//让图片逐渐显示
function fadeIn(imgList) {
    imgList.timer=setInterval(function () {
        var opacity=$.css(imgList,"opacity");
        opacity+=0.01;
        $.css(imgList,"opacity",opacity);
        if(opacity>=1){
            window.clearInterval(imgList.timer);
        }
    },50)
}

//页面滚动绑定事件
window.onscroll=delayOnload;