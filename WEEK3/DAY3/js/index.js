var data=null;
var strHTML=``;
var news=document.getElementById("news");
var wH=$.win("clientHeight");
//1.通过AJAX获取数据
var xhr=new XMLHttpRequest();
xhr.open("GET","json/data.json",false);
xhr.onreadystatechange=function () {
    if(xhr.status==200&&xhr.readyState==4){
        data=$.toJSONObj(xhr.responseText);
    }
};
xhr.send(null);

//2.绑定数据 ES6模板字符串
function bindData(data) {
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
    news.innerHTML=strHTML;
}
bindData(data);

var imgList=news.getElementsByTagName("img");
//3.实现延迟加载
function delayLoad() {
    //循环所有的图片,判断图片是否完全露出来
    for (var i=0;i<imgList.length;i++){
        //滚动条滚上去的距离
        var sT=$.win("scrollTop");
        //img图片盒子的高度
        var boxH=imgList[i].parentNode.offsetHeight;
        //盒子的上偏移量
        var boxT=$.offset(imgList[i].parentNode).top;
        //sT+wH>=盒子的高度+盒子的上偏移量
        if(sT+wH>=boxH+boxT){
            //加载图片
           imgLoad(imgList[i]);
           //渐变显示图片
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

//4.触发滚动条的时候仍然执行delayLoad方法即可
window.onscroll=delayLoad;