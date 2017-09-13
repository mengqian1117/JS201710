var header=document.getElementById("header");
var linkList=header.getElementsByTagName("a");
var list=document.getElementById("list");
var data=null;
var strHTML=``;

var xhr=new XMLHttpRequest();
xhr.open("GET","Data/product.json",false);
xhr.onreadystatechange=function () {
    if(xhr.status===200&&xhr.readyState===4){
        data=JSON.parse(xhr.responseText);
    }
};
xhr.send(null);
function bindHTML(data) {
    strHTML=``;
    data.forEach(function (item) {
        strHTML+=`<li>
           <a href="javascript:;">
               <img src="${item.img}" alt="">
               <p>${item.title}</p>
               <p class="hot">热度:${item.hot}</p>
               <del>$9999</del>
               <span>价格:${item.price}</span>
               <p class="time">上架时间:${item.time}</p>
           </a>
        </li>
        `
    });
    list.innerHTML=strHTML;
}
bindHTML(data);

for (var i=0;i<linkList.length;i++){
    linkList[i].setAttribute("index",i);
    linkList[i].onclick=function () {
        //this->你点击的元素
        sortList.call(this)
    }
}
function sortList() {
    //this-->你点击的a标签
    var index=this.getAttribute("index");
    //sortAttr  排序的依据
    var sortAttr=this.getAttribute("sort-attr");
    data.sort(function (a,b) {
        var prev=a[sortAttr];
        var next=b[sortAttr];
        //如果是字符串的话就是时间
        if(typeof prev=="string"){
            prev=prev.replace(/-/g,'');
            next=next.replace(/-/g,'');
        }
        return prev-next;
    });
    bindHTML(data);
}
