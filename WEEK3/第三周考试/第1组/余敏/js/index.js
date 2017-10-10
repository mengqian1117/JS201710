var xhr=new XMLHttpRequest();
var data=null;
var strHTML=``;
var box=document.getElementById("box");
var imgs=box.getElementsByTagName("img");
var wH=$.win("clientHeight");

xhr.open("GET","json/data.json",false);
xhr.onreadystatechange=function(){
    if(xhr.status===200&&xhr.readyState===4){
        data=$.toJSONObj(xhr.responseText);
    }
}
xhr.send(null);

function bindData(data){
    data.forEach(function(item){
        strHTML+=`
        <li>
        <div><img src="" photo="${item.src}" alt=""></div>
        <div>
        <h2>${item.title}</h2>
        <p>${item.description}</p></div>
        </li>`
    });
    box.innerHTML=strHTML;
}
bindData(data);

function laydeLoad(){
    for(var i=0;i<imgs.length;i++){
        var boxT=$.offset(imgs[i].parentNode).top;
        var boxH=imgs[i].parentNode.offsetHeight;
        var sT=$.win("scrollTop");
        if(sT>boxT+boxH-wH){
            imgLoad(imgs[i]);
            fadeIn(imgs[i]);
        }
    }
};

function imgLoad(n){

    var img=new Image;
    img.src=n.getAttribute("photo");
    img.onload=function(){
        n.src=this.src;
    }
};
laydeLoad();

function fadeIn(ele){
    ele.timer=window.setInterval(function(){
        var opacity=$.css(ele,"opacity");
        opacity+=0.01;
        $.css(ele,"opacity",opacity);
        if(opacity>=1){
            window.clearInterval(ele.timer);
        }
        },60)
}
window.onscroll=laydeLoad;