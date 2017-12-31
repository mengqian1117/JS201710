;(function () {
    //检测url上有没有?
    let checkUrl=(url)=>{
        //参数url:要检测url
        //如果之前有问号返回'&'没有返回'?'
        return url.includes("?")?"&":"?";
    };
    //拼接data到url上的方法
    let codeData=(data)=>{
        //'key1=val1&key2=val2'
        if(data.toString()=="[object Object]"){
            //准备一个空的字符串
            let temp=``;
            //循环对象data 拼接字符串
            for(var key in data){
                //我们只需要获取私有属性,过滤一下
                if(data.hasOwnProperty(key)){
                    //注意有些汉字或者其他符号,我们需要统一编码一下
                    temp+=`${key}=${encodeURIComponent(data[key])}&`
                }
            }
            //将最后一个&去掉
            data=temp.replace(/&$/,"");
        };
        return data;
    };
    let ajax=(xhrObj)=>{
        //设置默认参数
        let _default={
            url:null,
            type:"GET",
            data:null,
            dataType:"text",
            cache:true,
            async:true,
            success:null,
            error:null
        };
        //循环参数xhrObj给_default赋值
        for(let key in xhrObj){
            //处理type和method问题
            if(key=="method"){
                _default["type"]=xhrObj[key];
                continue;
            }
            _default[key]=xhrObj[key];
        };

        //当请求是GET请求的时候做处理(参数,缓存问题)
        //写一个正则判断是否是get,delete,head,不区分大小写
        let regType=/(GET|DElETE|HEAD)/i;
        if(regType.test(_default.type)){
            //只要匹配了,这个就是GET请求
            //如果data中有数据我们拼接到URL上
            if(_default.data!=null){
                _default.url+=`${checkUrl(_default.url)}${codeData(_default.data)}`
            };
            //处理缓存
            if(_default.cache){
                //拼接时间戳的时候也需要检测一下url有没有?
                _default.url+=`${checkUrl(_default.url)}_=${(new Date).getTime()}`
            };
        }
        let xhr=new XMLHttpRequest();
        xhr.open(_default.type,_default.url,_default.async);
        xhr.onreadystatechange=function () {
            //http的状态码只要是以 2或者是3作为开头就是成功
            if(/^(2|3)\d{2}$/.test(xhr.status)&&xhr.readyState==4){
                let result=xhr.responseText;
                switch (_default.dataType.toUpperCase()){
                    case "JSON":
                        result=JSON.parse(result);
                        break;
                    case "XML":
                        result=xhr.responseXML;
                        break;
                }
                //将success中的this变成xhr
                typeof _default.success=="function"?_default.success.call(xhr,result):null
            }else {
                typeof _default.error=="function"?_default.error.call(xhr,new Error("请求出错了")):null;
            }
        };
        if(regType.test(_default.type)){
            xhr.send(null)
        }else {
            xhr.send(_default.data);
        }
    };

    //将私有的ajax方法暴露在全局,就是给window增加一个属性名字跟他一样即可
    window.ajax=ajax;

})();
