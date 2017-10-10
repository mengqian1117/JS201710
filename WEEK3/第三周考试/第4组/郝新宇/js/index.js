var data=null;
var strHTML=``;
var news=document.getElementById("news");
var xhr=new XMLHttpRequest();

xhr.open("GET","json/data.json",false);
xhr.onreadystatechange=function () {
    if(xhr.status==200&&xhr.readyState==4){
        data=$.toJSONObj(xhr.responseText);
    }
};
xhr.send(null);
function bindData(data) {
    data.forEach(function (item) {
        strHTML+=`
              <li>
              <div>
              <img src="" photo="${item.src}" alt="">
</div>
                 <div>
                 <h2>${item.title}</h2>
</div>
                    <p>${item.description}</p>
              </li>
        `
    })
   news.innerHTML=strHTML;
}
bindData(data);
var imgList=document.getElementsByTagName("img");
var wH=$.win("clientHeight");
function delayLoad() {
    for (var i=0;i<imgList.length;i++){
        var sT=$.win("scrollTop");
        var boxH=imgList[i].parentNode.offsetHeight;
        var boxT=$.offset(imgList[i].parentNode).top;
        if(sT+wH>=boxH+boxT){
            imgLoad(imgList[i]);
            fadeIn(imgList[i]);
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
        if(opacity>=1){
            window.clearInterval(ele.timer);
        }
    },30)
};

window.onscroll=delayLoad;