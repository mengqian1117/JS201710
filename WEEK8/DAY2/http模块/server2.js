let http=require("http"),
    fs=require("fs"),
    url=require("url");

let server=http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url);
    try {
        //'\index.html';
        //根据pathname找到文件index.html读取出来
        let result=fs.readFileSync(`.${pathname}`,"utf-8");
        //接下来就是将读取出的内容返回给客户端
        // res.write(result);
        // res,end()
        res.end(result);
    }catch (e){
        res.end("not found")
    }
});
server.listen(12345,()=>{
    console.log("12345端口监听成功!!")
});