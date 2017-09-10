var box=document.getElementById("box");
var userList=box.getElementsByClassName("userList")[0];
var btn=document.getElementById("btn");
var ary = [{name: "王雪超"}, {name: "吴甜甜"}, {name: "邹林"}, {name: "冯鹏飞"}, {name: "李腾飞"}, {name: "高雅薇"}, {name: "左钊"}, {name: "陈泽琦"}, {name: "余敏"}, {name: "李敏"}, {name: "梁泉"}, {name: "郭磊"}, {name: "王敬娜"}, {name: "杨若琳"}, {name: "钟敏燕"}, {name: "李佳宝"}, {name: "彭翀"}, {name: "刘迪"}, {name: "李美臣"}, {name: "王赛"}, {name: "杜毅"}, {name: "金雨生"}, {name: "李天姿"}, {name: "侯希华"}, {name: "周英浩"}, {name: "郝新宇"}, {name: "谢绍峰"}, {name: "王启振"}, {name: "张增进"}, {name: "王龙"},{name:"代博"},{name:"孙晓丹"},{name:"徐锐"},{name:"徐万林"},{name:"刘璇"}];
let strHTML="";
ary.forEach((item, index) => {
    strHTML+="<li>"+item.name+"</li>";
});
userList.innerHTML=strHTML;
var list=userList.getElementsByTagName("li");
for(var i=0;i<list.length;i++){
    list[i].yes=false;
    list[i].onclick=function (){
        this.yes=!this.yes;
        if(this.yes){
            this.className="select";
        }else {
            this.className="";
        }
    }
}
/*

function code(n) {
    return Math.round(Math.random()*n)
}
function change(callback) {
    n=code(ary.length-1);
    list[n].className="select";
    window.setTimeout(callback,200,n)
}
var stop=false,timer=null,n=0;
btn.onclick=function () {
    stop=!stop;
    if(stop){
        for (var i=0;i<list.length;i++){
            list[i].className="";
        }
        timer= window.setInterval(change,400,function (n) {
            list[n].className="";
        })
    }else {
        list[n].className="select";
        window.clearInterval(timer)
    }

}*/
