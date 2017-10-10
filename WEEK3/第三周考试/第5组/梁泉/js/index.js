var data=null,strHTML=``,news=document.getElementById("news"),wH=$.win("clientHeight"),xhr=new XMLHttpRequest();
xhr.open("GET","json/data.json",false);
xhr.onreadystatechange=function () {
    xhr.status===200&&xhr.readyState===4?data=$.toJSONObj(xhr.responseText):null;
}
xhr.send(null);
function bindHtml(data) {
    data.forEach(function (t) {
        strHTML += `<li><div><img src="" poto="${t.src}"></div><div><h2>${t.title}</h2><p>${t.description}</p></div></li>`;
    });
    news.innerHTML = strHTML;
}
bindHtml(data);
var imgList = news.getElementsByTagName("img");
function inImg() {
    for(var i=0;i<imgList.length;i++){
        var sT = $.win("scrollTop"),boxH = imgList[i].parentNode.offsetHeight,boxT = $.offset(imgList[i].parentNode).top;
        if(sT+wH>=boxH+boxT){
            inImgSrc(imgList[i]);
            fadeIn(imgList[i]);
        }
    }
}
function inImgSrc(imgList){
    var img = new Image;
    img.src = imgList.getAttribute("poto");
    img.onload=function () {
        imgList.src = this.src
    }
}
inImg();
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
window.onscroll = inImg;



