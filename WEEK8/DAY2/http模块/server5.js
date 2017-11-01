let http=require("http"),
    url=require("url"),
    fs=require("fs");

//我们发送给客户端的数据都是字符串,在标准浏览器中他可以自己判断是什么类型的文件,比如是html他就按照渲染html的方式去渲染,如果是js那就按照js的方式去加载,但是部分IE浏览器就没有这个本事了,他只知道这个是字符串,不是知道是什么类型的,一加载就乱套了,这时候我们需要给他返回的时候顺便告诉他这个是什么类型的文件,怎么告诉他呢,重写响应头
http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url);
    let reg=/\.([0-9a-zA-Z]+)$/i;
    if(pathname=="/"){
        res.end(fs.readFileSync("./index.html","utf-8"));
    }
    if(reg.test(pathname)){
        //result:返回给客户端的数据
        //status:网络状态码
        let result=null,status=404;
        try {
            result=fs.readFileSync(`./${pathname}`);
            status=200;
        }catch (e){
            result="this file is not found";
            status=404;
        }
        //根据pathname中的类型去判断对应的类型  text/html text/css image/gif
        let type=reg.exec(pathname)[1].toUpperCase();
        let typeMIME="text/plain";
        switch (type){
            case "HTML":
                typeMIME="text/html";
                break;
            case "CSS":
                typeMIME="text/css";
                break;
            case "JS":
                typeMIME="text/javascript";
                break;
            case "PNG":
                typeMIME="image/png";
                break;
            case "JPG":
                typeMIME="image/jpg";
                break;
            case "GIF":
                typeMIME="image/gif";
                break;
            case "JPEG":
                typeMIME="image/jpeg";
                break
        };
        //重写响应头 overWrite response header
        res.writeHead(status,{"content-type":typeMIME+";charset=UTF-8"});
        res.end(result);
    }
}).listen(666,()=>{
    console.log("666没毛病");
});