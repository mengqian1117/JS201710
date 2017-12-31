//new Date()获取本机的时间.这个时间是不准确的,我们应该统一获取服务器的时间

//1.通过ajax获取服务器时间,ajax状态码0-4,2的时候就应经可以拿到响应头了,这个时候就可以获取响应头的时间
//货获取时间的时候只需要第一获取一下,以后在这个时间的基础上每隔一秒加一秒即可
let serverTime=null;
let getServerTime=()=>{
    if(serverTime==null){
        let xhr=new XMLHttpRequest();
        xhr.open("GET","json/data.json");
        xhr.onreadystatechange=function () {
            if(xhr.status==200&&xhr.readyState==2){
                //xhr.readyState==2这个时候我们已经拿到请求头
                serverTime=xhr.getResponseHeader("date");
                //这个格林尼治时间我们需要将它转为北京时间
                serverTime=new Date(serverTime);
                console.log(serverTime);
            }
        };
        xhr.send(null);
        return;
    }
    //服务器时间只获取一次即可,以后自己每隔一秒加一秒即可
    //serverTime.getTime()将时间变成毫秒
    serverTime=new Date(serverTime.getTime()+1000);
    box.innerHTML= serverTime.getHours()+":"+serverTime.getMinutes()+":"+serverTime.getSeconds();
};
let timer=window.setInterval(getServerTime,1000);