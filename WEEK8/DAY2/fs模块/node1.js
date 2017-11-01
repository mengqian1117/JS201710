const fs=require("fs");
/*
1.读取文件内容
fs.readFile:异步读取一个文件中的内容(不管有没有读取完成,后面代码继续执行,不会等待)
fs.readFileSync:同步读取一个文件中的内容(相对于异步读取来说,同步读取是当文件读取完成之后再执行后面的代码)

fs.readFileSync([pathName路径,必填],[encode编码格式,选填]);
fs.readFile([pathName路径,必填],(error,value)=>{})


2.向文件写入内容
fs.writeFile([pathName],[content内容],[encode],[callback回调函数]);
fs.writeFileSync([pathName],[content内容],[encode])

注意:写入文件内容的时候是覆盖式的,后面写入的会将前面的覆盖掉,如果你不想覆盖那就是在写入的时候先把之前的读取出来加上现在的内容再写进去,类似于innerHTML+=

3.读取文件夹中的目录
fs.readdir([pathName],(error,value)=>{
error:失败的时候信息
value:读取成功之后的返回值,是一个数组,当前目录下的文件列表
});
fs.readdirSync([pathName])
//返回值是一个数组,当前目录下的文件列表
*/
