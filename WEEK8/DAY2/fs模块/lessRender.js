let fs=require("fs"),
    less=require("less");
//获取less文件夹中的所有文件.筛选出后缀是.less的文件,这些文件才是我们接下来要编译的文件
let fileAry=fs.readdirSync("./less");

//数组:[ 'index.less', 'page1.css', 'public.less' ]
fileAry=fileAry.filter((item,index)=>{
    ///.less$/i:  修饰i不区分大小写
    return /\.less$/i.test(item);
});
console.log(fileAry);

//循环数组fileAry根据每一项的文件名字获取出对应less文件,一个一个处理
fileAry.forEach((item,index)=>{
    //读取出这个less 文件的内容,读出的内容是字符串,不要忘了给他设置utf-8
    //根据item拼接路径
    let con=fs.readFileSync(`./less/${item}`,"utf-8");
    //将读出的内容编译成css,使用less模块下的render方法
    less.render(con,{compress:true},(error,value)=>{
        if(error){
            console.log("编译失败!");
        }else {
            console.log(value);
            //value是个对象,有属性css,import
            //value.css:编译成功后的css内容
            //编译成功后将编译完成的value写入到新的.css文件中
            //.css文件的名字根据item的名字去掉后缀.less
            fs.writeFileSync(`./css/${item.split(".")[0]}.min.css`,value.css)
        }
    })
});

