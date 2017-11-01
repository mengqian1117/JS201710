let http=require("http");
let server=http.createServer((request,response)=>{
    //这个函数不是在创建服务的时候执行的,而是只要是这个服务对应的端口号被客户端请求了,这个函数就会执行,客户端请求几次就会执行几次
    /*
    * 1.如何向当前服务发请求?
    * 请求都是基于浏览器完成的,在浏览器的地址栏中输入地址
    * http://localhost:8080 访问本机
    * http://192.168.1.149:8080
    * */
    //这个回调函数每一次执行都会默认给他传两个参数request,response
    // request:对象这里面存储了客户端发过来的请求的全部信息,例如request.url就是当前客户端请求的资源路径以及传递的数据等
    // response:对象,里面提供了很对方法可以让服务器吧内容返回给客户端,例如,response.end("你好"),就会将"你还"返回给客户端
    console.log(1);
});
//让这个服务监听一个端口号
server.listen(8080,()=>{
    console.log("8080OK!")
});
