var data=null;
var strHTML=``;
var news=document.getElementById("news");
var xhr=new XMLHttpRequest();
xhr.open("get","json/data.json",false);
xhr.onreadystatechange=function () {
    if(xhr.status===200&&xhr.readyState===4){
        data=$.toJSONObj(xhr.responseText)
    }
}
xhr.send(null);

function bindHTML(data) {
    data.forEach(function (item) {
        strHTML+=`
            <li>
                <div><img src="" photo="${item.src}" alt=""></div>
                <div>
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
</div>
</li>
`
    });news.innerHTML=strHTML
}
bindHTML(data);
var imgList=news.getElementsByTagName("img")
var wh=$.win("clientHeight");
function delayLoad() {
   for(var i=0;i<imgList.length;i++){
       var st=$.win("scrollTop")
       var boxH=imgList[i].parentNode.offsetHeight;
       var boxT=$.offset(imgList[i].parentNode).top
       if(wh+st>=boxH+boxT){
           imgLoad(imgList[i]);
            fadeIn(imgList[i])
       }
   }
}
delayLoad();
function imgLoad(imgList) {
    var img=new Image;
    img.src=imgList.getAttribute("photo");
    img.onload=function () {
        imgList.src=this.src
    }
}
function fadeIn(ele) {
    ele.trime=window.setInterval(function () {
        var opacity=$.css(ele,"opacity");
        opacity+=0.01;
        $.css(ele,"opacity",opacity);
        if (opacity>=1){
            window.clearInterval(ele.trime)
        }
    },30)
}

window.onscroll=delayLoad