//客户端向服务器发请求有两种方式
//一种:请求html后,浏览器进行页面的渲染,渲染的过程中去不断请求资源文件
//二种:页面加载完成后,用户手动发出的请求,ajax请求,一般都是请求数据的
//静态资源:.css,.js,.html,.jpg,.png,.gif,......,后面都是有后缀的.XXX
//判断是否是静态资源的请求的时候只需要判断是否有后缀即可

let http=require("http"),
    url=require("url"),
    fs=require("fs");

http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url);
    let result=null;
    if(pathname=='/'){
        result=fs.readFileSync("./index.html","utf-8");
    }else {
        //判断pathname是不是请求的资源文件,也就是说判断这个路径后面有没有后缀.XXX
        let reg=/\.[0-9a-zA-Z]+$/i;
        if(reg.test(pathname)){
            try {
                result=fs.readFileSync(`./${pathname}`);
            }catch (e){
                result="not found"
            }
        }
    }
    res.end(result);
}).listen(222,()=>{
    console.log("222,oK")
});