var ul=document.getElementById("news")
var data=null
var strHTML=""
var xhr=new XMLHttpRequest()
xhr.open("GET","json/data.json",false)
xhr.onreadystatechange=function () {
    if(xhr.status==200&&xhr.readyState==4){
        data=$.toJSONObj(xhr.responseText)
    }
}
xhr.send(null)

bingHTML(data)
function bingHTML(data) {
    data.forEach(function (item) {
        strHTML+=`
        <li>
        <div>
            <img src="" photo=${item.src} alt="">
        </div>
        <div>
            <h2>${item.title} </h2>
            <p>${item.description} </p>
        </div>
    </li>
    `
    })

    ul.innerHTML=strHTML
}
var imgList=ul.getElementsByTagName("img")
var wH=$.win("clientHeight")
delayLoad()
function delayLoad() {
    for(let i=0;i<imgList.length;i++){
        var p=imgList[i].parentNode
        var boxT=$.offset(p).top
        var boxH=p.offsetHeight
        var st=$.win("scrollTop")
        if(st>boxH+boxT-wH){
            var img=new Image()
            img.src=imgList[i].getAttribute("photo")
            img.onload=function () {
                imgList[i].src=this.src
                fadeIn(imgList[i])
            }
        }


    }
}
function fadeIn(img) {
    var timer=window.setInterval(function () {
        var opacity=Number($.getCss(img,"opacity"))
        opacity+=0.01
        if(opacity>1){
            window.clearInterval(timer)
        }
        $.setCss(img,"opacity",opacity)
    },30)
}
window.onscroll=delayLoad
