###css预处理

```
css是标记语言，不是编程语言，所以不具备编程语言的特点（编程语言的特点：变量存储、判断和循环的逻辑操作、函数的封装继承和多态...），如果具备以上编程语言的特点，开发css的时候将会非常的方便

css预处理编译语言的宗旨就是把css变为编程语言来开发，提高开发效率，实现组件化的封装

less
sass
stylus
…
之所以叫做预编译语言是因为：我们使用上述语言编写完成的样式代码，浏览器不能识别，我们需要把代码编译成为正常能识别的css代码才可以，所以叫做预编译
```

###less的使用

Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护、方便制作主题、扩充。

Less 可以运行在 Node、浏览器和 Rhino 平台上。网上有很多第三方工具帮助你编译 Less 源码。
####安装less
```
 npm install -g less
```
####Less 编译器
```
lessc styles.less > styles.css
若要输出压缩过的 CSS，只需添加 -x 选项
lessc styles.less > styles.min.css -x
```

```
//less也是来写样式的跟css一样都是实现样式的写法，只不过语法不同，它涵盖了一些JS的思想

//变量
//在JS中var color="#ff6700";
//在less中变量前面加上@
@color:#ff6700;
.box1{
    color: @color;
}
//还可以 以变量的名定义定义为变量
@word:"I love you";
@c:#ff5700;
@var:"word";//定义了一个变量var赋值为一个变量名word
@col:"c";//定义了一个变量var赋值为一个变量名c
#p1:after{
    //content: @word;
    content: @@var;//@(@var)->@word->"I love you"
    color: @@col;
}

//混合类
.class1{
    font-size: 20px;
    width: 200px;
    height: 50px;
    border: 1px solid red;  
}
.box1{
    .class1;
    background-color: #0000FF;
}

//带参数混合
//在less中可以像JS函数一样定义一个带参数的属性集合

.radius(@rad){
    border-radius: @rad;
    -webkit-border-radius: @rad;
    -moz-border-radius: @rad;
    -ms-border-radius: @rad;
    -o-border-radius: @rad;
}
.box1{
    .radius(10px);//@rad=10px;
    border: 1px solid #0000FF;
}

//给参数赋默认值
.font(@size:18px){
    font-size:@size ;
}
.menu li{
    .font();
}

//@arguments:包含了所有传进来的参数
.bor(@x,@y,@z){
    border: @arguments;
}
.wh(@w:100px,@h:30px){
    width: @w;
    height: @h;
}
.menu li{
    .wh(200px);
    .bor(3px ,solid ,green);
}
.box-shadow(@x:0,@y:0,@blur:4px,@color:#ccc){
    box-shadow: @arguments;
    color: @color;
    border-radius: @blur;
}
span{
    display: block;
    .box-shadow(5px,5px);
    .wh(150px,45px);
}

//匹配模式和引导表达式
.min(drak,@color){
    color: darken(@color,20%);
    //将颜色加深20%
}
.min(light,@color){
    color: lighten(@color,20%);
    //将颜色变浅20%
}
.min(@_,@color){
    display: block;
}
@switch1:drak;
@switch2:light;

span{
    //.min(@switch1,#ddd);
    //.min(drak,#ddd);@color:#ddd
    //.min(@switch2,#ddd);
    //@_,接受任意值，你传什么值他都会执行；
    .min(@word,#ccc);
}

//注释
/*
 注释
 * color函数
 * 1. lighten(@color,10%):
 * 意思：return a color which is 10% lighter than @color
 * 2. darken(@color,10%);
 * 意思：return a color which is 10% draker than @color
 * 3. statuate(@color,10%);//增加饱和度
 * 意思：return a color which is 10% statuated than @color
 * 4. destatuste(@color,10%);//减少饱和度，褪色
 * 5. fadein(@color,10%)
 * 6. fadeout(@color,10%)
 * 7. fade(@color,50%)
 * 8. spin(@color,10)
 * 9. spin(@color,-10)
 * 10. mix(@color1,@color2);混合
 * 
 * 
 * 提取颜色信息
 * hue(@color):返回当前颜色的色调
 * staturation(@color):返回当前颜色的饱和度
 * lightness(@color):返回当前颜色的亮度(浅的度数)
 * */
div{
    width: 100px;
}
```

```
.wh(@w:100px,@h:50px){
    width: @w;
    height: @h;
}
//when
.mixin(@a) when(lightness(@a)>=50%){
    background-color: black;
}
.mixin(@a) when(lightness(@a)<50%){
    background-color: whitesmoke;
}
.box1{
    .wh();
    .mixin(#ddd);
}

.mn(@w,@h) when(@w>@h){
    width: @w;
    height: @h;
}
.mn(@w,@h) when(@w<=@h){
    width: @h;
    height: @w;
}
.box1{
    //.mn(100px,200px);
    .mn(200px,50px)
}

.m(@x) when(@x=red){
    color: @x;
}
.m(@x) when(@x=green){
    color: @x;
}
p{
    //.m(green)
    .m(whitesmoke);//没有满足条件的根本不会执行
}
/*
 注意：
 *在less中比较运算：
 *  >  <  >=  <=  =
 * */
//基于值类型的判断进行匹配，可以使用JS函数判断
/*
 * isnumber
 * iscolor
 * isstring
 * isurl
 * iskeyword
 * 判断单位
 * ispixel  px
 * ispercentage  pt
 * isem   em
 * */

.n(@a) when(iscolor(@a)){
    color: @a;
}
.n1(@b) when(isstring(@b)){
    content: @b;
}
.n2(@c) when(ispixel(@c)){
    width: @c;
}
.box2 span{
    .n(red);
    }
.box2:before{
    //.n1(red)
    .n1("哈哈哈哈哈")
}

.box2{
    .n2(100px);
}

```

```
//嵌套规则
//1.直接嵌套表示的是后代关系
//2.如果想表达都是当前选择器加一个&来表示(一般都是伪元素伪类用的比较多)
.wh(@w:100px,@h:100px){
    width: @w;
    height: @h;
}
div{
    .wh();
    p{
       .wh(100px,20px);
    }
}
.box{
    .wh();
    &:hover{
        background-color: wheat;
    }
}

span{
    display: block;
    .wh(50px,20px);
    &#span1{
        .wh();
        background-color: #87CEEB;
    }
}

//计算功能：任何颜色，变量都可以参与运算
@base:5%;
@filter:@base*2;//10%
@other:@base*4+@filter;//30%
.box{
    color: #FFFF00;
    background-color: @filter+#111;
    height: 100%/2+@other;
}

@var:10px + 5;
#box1{
    width: (@var + 20)*2;
    height: (@var - 5)*3;
    p{
        height: (@var + 5)/2;
        background-color: #101010+#000111;
        border: @var - 5 solid #0000ff;
    }
}

//less也支持部分Math函数
//round(1.67)->2
//ceil(2.1)->3
//floor(2.9)->2
//peercentage(0.5)->50%转为百分数的函数
#s{
    width: 100px;
    height: 100px;
    border-radius: percentage(0.5);
}

//命名空间
#box1{
    .p1{
        width: 100px;
        height: 30px;
        border: 1px solid red;
        &:hover{
            color: #FF0000;
        }
    }
}
.p2{
    color: #ccc;
    #box1>.p1;
}


```