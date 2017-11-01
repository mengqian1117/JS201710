const fs=require("fs");
//./json/data2.json  :写入的时候data2.json没有,会自动创建一个data2.json文件

//先把执之前的内容读取出来
//注意:读出出的内容是字符串,写入的时候也是字符串
fs.readFile("./json/data2.json","utf-8",(e,v)=>{
    if(e){
        console.log("失败")
    }else {
        console.log(typeof v);//string
        v=JSON.parse(v);
        v.push({"name":"zf"});
        fs.writeFileSync("./json/data2.json",JSON.stringify(v),"utf-8");
    }
});




