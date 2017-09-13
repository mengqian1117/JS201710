var list=document.getElementById("list");
var header=document.getElementById("header");
var linkList=header.getElementsByTagName("a");
var strHTML=``;
var data = null;

//1.通过AJAX获取数据
var xhr = new XMLHttpRequest();
xhr.open("GET", "Data/product.json", false);
xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
        data = JSON.parse(xhr.responseText);
    }
};
xhr.send(null);

//使用ES6模板字符串绑定数据
function bindHTML(data) {
    strHTML=``;
    data.forEach(function (item,index) {
        strHTML+=`<li>
        <a href="javascript:;">
            <img src="${item.img}" alt="">
            <p>${item.title}</p>
            <p class="hot">热度：${item.hot}</p>
            <del>$9999</del>
            <span>￥${item.price}</span>
            <p class="time">上架时间：${item.time}</p>
        </a>
    </li>`
    });
    list.innerHTML=strHTML;
};
bindHTML(data);

//给三个排序的依据绑定点击事件
for(var i=0;i<linkList.length;i++){
    //使用setAttribute设置自定义属性将索引存起来，为了后面明确点击的是哪一个a
    linkList[i].setAttribute("index",i);
    linkList[i].onclick=function () {
        //获取点击元素的index属性，根据Index属性的值来判断是按照那个依据来排序的
        //this==你点击的元素
        //getAttribute 获取出的属性的值是个字符串,注意在比较的时候
        var index=this.getAttribute("index");
        if(index==="0"){
            //按照时间将数组data重新排序
            data.sort(function (a,b) {
                var prev=a["time"];//"2017-03-15"
                var next=b["time"];//"2015-12-15"
                prev=prev.replace(/-/g,"");
                next=next.replace(/-/g,"");
                return prev - next;
            });
            //将拍好顺序的数组data传给bindHTML方法重新渲染页面
            bindHTML(data);

        }else if(index==="1"){

        }else {

        }
    }
}