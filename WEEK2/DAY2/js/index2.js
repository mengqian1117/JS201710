var header=document.getElementById("header");
var linkList=header.getElementsByTagName("a");
var list=document.getElementById("list");
var data=null;
var strHTML=``;

var xhr=new XMLHttpRequest();
xhr.open("GET","json/productList.json",false);
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
    //给每一个linkList加一个自定义属性flag,记录当前是升序还是降序
    linkList[i].setAttribute("flag",-1);
    linkList[i].onclick=function () {
        //this->你点击的元素
        sortList.call(this);
        changeArrow.call(this);
        clearOther.call(this);
    }
}
function sortList() {
    //this-->你点击的a标签//sortAttr  排序的依据
    var sortAttr=this.getAttribute("sort-attr");
    //获取之前的排序状态
    var flag=this.getAttribute("flag");
    //改变状态
    flag*=-1;
    //将改变后的状态再给当前元素设置上
    this.setAttribute("flag",flag);
    data.sort(function (a,b) {
        var prev=a[sortAttr];
        var next=b[sortAttr];
        //如果是字符串的话就是时间
        if(typeof prev=="string"){
            prev=prev.replace(/-/g,'');
            next=next.replace(/-/g,'');
        }
        return (prev-next)*flag;
    });
    bindHTML(data);
}

//实现箭头的切换
function changeArrow() {
    //根据你点击的this,获取出下面的两个i标签
    var arrows=this.getElementsByTagName("i");
    var arrowUp=arrows[0], arrowDown=arrows[1];
    //获取this的flag
    var flag=this.getAttribute("flag");
    if(flag>0){
        arrowUp.className="up bg";
        arrowDown.className="down";
    }else {
        arrowDown.className="down bg";
        arrowUp.className="up";
    }
}

//清除其他A标签的样式(箭头样式)
function clearOther() {
    for (var i=0;i<linkList.length;i++){
        //判断不是你点击的a标签的话,将上下箭头都没有bg这类名
        //除此之外,我们还要将不是你点击的a标签的排序状态变成最初始的状态flag=-1
        if(this!==linkList[i]){
            var arrows=linkList[i].getElementsByTagName("i");
            arrows[0].className="up";
            arrows[1].className="down";
            linkList[i].setAttribute("flag",-1);
        }

    }
}