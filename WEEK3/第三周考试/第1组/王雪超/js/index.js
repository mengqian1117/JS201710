var data=null;
var strHTML=``;
var list=document.getElementById("list");
var imgOl=list.getElementsByTagName("img");

var xhr=new XMLHttpRequest();
xhr.open("GET","json/data.json",false);
xhr.onreadystatechange=function () {
    if(xhr.status===200&&xhr.readyState===4){
        data=JSON.parse(xhr.responseText);
    }
};
xhr.send(null);


function bindData(data) {
    strHTML=``;
    data.forEach(function (item) {
        strHTML+=`<li>
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
    list.innerHTML=strHTML;
}
bindData(data);

var wH=$.win("clientHeight");
function delayLoad() {
    for (var i=0;i<imgOl.length;i++){
        var sT=$.win("scrollTop");
        var imgH=imgOl[i].parentNode.offsetHeight;
        var imgT=$.offset(imgOl[i].parentNode).top;
        if(sT+wH>=imgH+imgT){
            imgLoad(imgOl[i]);//加载图
            fadeIn(imgOl[i]);//渐变
        }
    }
}
//加载函数
function imgLoad(imgOl) {
    var img=new Image;
    img.src=imgOl.getAttribute("photo");
    img.onload=function () {
        imgOl.src=this.src;
    }
}
delayLoad();


//渐变函数方法
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


