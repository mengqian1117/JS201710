const fs=require("fs");
let res=fs.readFileSync('./json/data1.json',"utf-8");
//console.log(res);
fs.readFile("./json/data1.json","utf-8",(error,value)=>{
    // console.log(error);//null
    // console.log(value);//[{"name":"珠峰"},{"age":"9"}]
    if(error){
        console.log("读取错误");
    }else {
        console.log(value);//[{"name":"珠峰"},{"age":"9"}]
    }
});

