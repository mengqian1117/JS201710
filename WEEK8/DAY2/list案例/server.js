let http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((req,res)=>{
    let {pathname,query}=url.parse(req.url,true);
    //query=={code:"1"}
    console.log(query);
    let reg=/\.[0-9a-zA-Z]+$/i;
    if(pathname=="/"){
        res.end(fs.readFileSync("./list.html","utf-8"))
    }
    if(reg.test(pathname)){
        let result="";
        try {
            result=fs.readFileSync(`./${pathname}`);
        }catch (e){
            result="is not found";
        }
        res.end(result)
    }
    //处理ajax数据请求
    if(pathname=="/list"){
        //1.根据解析url后得到的query参数,拿到code,code就是客户端想要的数据的条数
        let code=query.code;
        //2.读取data/data.json中的数据,读出的数据是个JSON字符串,我们先把他变成JSON对象是个数组,然后根据code值获取出数组的前code项得到一个新的数组data
        let data=(JSON.parse(fs.readFileSync("./data/data.json","utf-8"))).slice(0,code);
        //3.因为数据中可能有中午我们需要重写响应头告诉浏览器这个是什么类型的数据(text/json)以及他的编码格式(charset=utf-8)
        res.writeHead(200,{"content-type":"text/json;charset=utf-8"});
        //4.返回data,但是data是个数组,我们需要使用JSON.stringify将它变成字符串
        res.end(JSON.stringify(data));

    }
}).listen(1111,()=>{
    console.log("localhost:1111");
});