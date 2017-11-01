const fs=require("fs");
let dirAry=fs.readdirSync("./json");
//console.log(dirAry);
//[ 'data1.json', 'data2.json' ]
fs.readdir("./json",(e,v)=>{
    console.log(e);
    console.log(v);//[ 'data1.json', 'data2.json' ]
});