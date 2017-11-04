let http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((request,response)=>{
    let {pathname,query}=url.parse(request.url,true);
    //静态资源文件的请求处理
    if(pathname=="/"){
        fs.readFile("./userList.html","utf-8",(error,value)=>{
            if(error){
                console.log("请求失败",error);
            }else {
                response.end(value);
            }
        });
        return;
    }
    let reg=/\.[0-9a-zA-Z]+$/i;
    if(reg.test(pathname)){
        let res="";
        try {
            res=fs.readFileSync("./"+pathname);
        }catch (e){
            res="not found";
        }
        response.end(res);
    };

    //处理ajax请求数据的
    //把数据从数据库中读出出来,读取出的是字符串,我们需要将其转为数组
    let allData=JSON.parse(fs.readFileSync("./data/userListData.json","utf-8"));
    var result={
        code:1,
        msg:"error",
        data:null
    };
    //API:"/getUserList"
    if(pathname=="/getUserList"){
        //根据客户端传给你的参数page的值来返回对应的数据
        var page=query.page;
        //1   0-9    (page-1)*10 到 page*10-1
        //2  10-19
        //3  20-29
        //根据page从数组中找所以是(page-1)*10 到 page*10-1之间的数
        result={
            code:0,
            msg:"success",
            total:Math.ceil(allData.length/10),
            data:allData.slice((page-1)*10,page*10)
        };
        response.writeHead(200,{
            "content-type":"text/json;charset=utf-8"
        });
        response.end(JSON.stringify(result));
        return;
    };
    //API:"/removeUser"
    if(pathname=="/removeUser"){
        //获取客户端传过来的想要删除的用户的id,就是参数id的值
        var userID=query.id;
        //遍历数据库中的数据allData,去找到对应的这个ID的用户,删掉数据
        allData=allData.filter((item)=>{
            return item.id!=userID;
        });
        //要把删除后的allData重新写入到数据库中,注意写入的时候将其变成字符串
        fs.writeFileSync("./data/userListData.json",JSON.stringify(allData),"utf-8");
        result={
            code:0,
            msg:"删除成功"
        };
        response.writeHead(200,{"content-type":"text/json;charset=utf-8"});
        response.end(JSON.stringify(result));
        return;
    };
    //API:"/addUserInfo"
    if(pathname=="/addUserInfo"){
        //这里接受的是post请求,客户端请求的参数就不是在request.url,这里有他自己的获取参数的方式
        //request.on("data",function(chunk){有几个参数就会执行几次})
        var strData="";
        request.on("data",function (chunk) {
            strData+=chunk;
        });
        request.on("end",function () {
            strData=JSON.parse(strData);
            //{name:'qq',age:'12',tel:'1211312221',}
            //给当前新增加的用户创造一个ID,值为数据库中最后一个用户的ID+1;
            strData["id"]=parseInt(allData[allData.length-1].id)+1;
            //将这条数据push到allData
            allData.push(strData);
            //最后再把增加后的allData写入到数据库中
            fs.writeFileSync('./data/userListData.json',JSON.stringify(allData),"utf-8");
            result={
                coed:0,
                msg:"增加用户成功"
            };
            response.writeHead(200,{"content-type":"text/json;charset=utf-8"});
            response.end(JSON.stringify(result));
        });
        return;
    };
    //API:"/userInfo"
    if(pathname=="/userInfo"){
        //获取客户端传进来的查看用户的ID,就是获取参数id的值
        var userID=query.id;
        //根据userID的值从allData中查找到这条数据
        var data=allData.find((item)=>{
            return item.id==userID;
        });
        result={
            code:0,
            msg:"success",
            data:data
        };
        response.writeHead(200,{"content-type":"text/json;charset=utf-8"});
        response.end(JSON.stringify(result));
        return;
    };
    //API:"/changeUserInfo"
    if(pathname=="/changeUserInfo"){
        var strData="";
        request.on("data",function (chunk) {
            strData+=chunk;
        });
        request.on("end",function () {
            strData=JSON.parse(strData);
            var userId=strData.id;
            allData.forEach(function (item,index) {
                if(item["id"]==userId){
                    allData.splice(index,1,strData);
                    //把改变的数据写入到数据库中,注意把userData变成JSON字符串
                    fs.writeFileSync("./data/userListData.json",JSON.stringify(allData),"utf-8");
                    result={
                        code:0,
                        msg:"success"
                    };
                    return false;
                }
            });
            response.writeHead(200,{
                "content-type":"application/json;charset=utf-8;"
            });
            response.end(JSON.stringify(result));
        });
        return;
    };
    //API:"/checkUser"
    if(pathname=="/checkUser"){
        console.log(1);
        let {check,key}=query;
        let reg=new RegExp(`${key}`,"g");
        var data=allData.filter((item)=>{
            return reg.test(item[check].toString())
        });
        result={
            code:0,
            msg:"success",
            data:data
        };
        response.writeHead(200,{"content-type":"text/json;charset=utf-8"});
        response.end(JSON.stringify(result));
    };
}).listen(246,()=>{
    console.log("服务监听成功246")
});
