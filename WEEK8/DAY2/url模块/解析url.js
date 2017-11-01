let url=require("url");
let utlStr='https://www.zhufengpeixun.com:8080/stu/index.html?name=zf&age=9&course=JS#box';

//console.log(url.parse(utlStr,false));
/*
Url {
    protocol: 'https:',传输协议
    slashes: true   斜杠
    auth: null,    作者
    host: 'www.zhufengpeixun.com:8080', 域名+端口号
    port: '8080', 端口号
    hostname: 'www.zhufengpeixun.com',域名
    hash: '#box',哈希值
    search: '?name=zf&age=9&course=JS', 查询参数 ?+参数
    query: 'name=zf&age=9&course=JS', 参数
    pathname: '/stu/index.html', 文件路径名
    path: '/stu/index.html?name=zf&age=9&course=JS', 路径+查询参数
    href: 'https://www.zhufengpeixun.com:8080/stu/index.html?name=zf&age=9&course=JS#box'
    }
 */
console.log(url.parse(utlStr,true));
//第二个参数false/true
//当true的时候其他的值都一样,只有query会变成一个对象,一般我们都写true,方便后面操作参数
//  query: { name: 'zf', age: '9', course: 'JS' },
//我们经常使用ES6中对象的解构赋值拿到解析url后的某些内容
let{pathname:pn,query:q}=url.parse(utlStr,true);
