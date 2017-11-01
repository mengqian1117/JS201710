let http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((req,res)=>{
    //如果客户端请求的路径是/或者是/index.html我们都返回index.html这个页面
    let {pathname}=url.parse(req.url);
    let result=null;
    // if(pathname=="/"||pathname=="/index.html"){
    //     result=fs.readFileSync("./index.html");
    //     res.end(result);
    // }
    // //不光是你在浏览器的地址栏中写入地址的时候会发请求,html页面加载的时候(浏览器渲染页面的时候遇到link标签,href中需要一个css 文件此时就会主动的再发一次请求,如果请求成功继续往下加载页面,假如有遇到script标签了,也许要加载一个JS文件此时又会发一次请求.....还有img,audio,video,这些都是请求资源文件的,所以就有一个问题,优化的问题,优化的一个方法就是减少页面资源文件的请求次数)
    // else if(pathname=="/index.js"){
    //     result=fs.readFileSync("./index.js");
    //     res.end(result);
    // }else if(pathname=="/index.css"){
    //     result=fs.readFileSync("./index.css");
    //     res.end(result);
    // }
    if(pathname=="/"){
        result=fs.readFileSync('./index.html',"utf-8");
    }else {
        try {
            //img图片不是字符串,默认读取的时候不可以加utf-8
            result=fs.readFileSync(`./${pathname}`);
        }catch (e){
            result="not fond";
        }
    }
    res.end(result);

}).listen(1357,()=>{
    console.log("1357,OK")
});