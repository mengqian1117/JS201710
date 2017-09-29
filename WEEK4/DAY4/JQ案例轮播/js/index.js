var timer=null,step=0,data=null;
//1.获取数据
$.ajax({
    type:"GET",
    url:"json/data.json",
    dataType:"json",
    data:null,
    async:false,
    success:function (data) {
        window.data=data;
    },
    error:function (e) {console.log(e);}
});

//2.move函数
function move() {
    step++;
    if(step==data.length) {
        step = 0;
    }
    //我们再写解构的时候就注意了,给每一个li加class名,后缀分别是自己的索引,这样就跟step联系上了
    display($("#menu li[class=li"+step+"]"));
}
//3.display函数,将对应显示的menu下面的li传进来
function display($ele) {
    //将传进来的li下面的孩子a标签的marginRight以动画的形式变成20px
    //然后让这个a标签的父亲li的其他兄弟们的孩子a标签的marginRight值再变回执之前的-20px
    $ele.children("a").stop().animate({marginRight:20},500,function () {
       $(this).stop().animate({opacity:1},700);
       //图片的切换
        //根据step就可以通过data[step].image拿到对应的图片,将地址赋值给rot1的孩子img标签的src属性上即可,先将透明度opacity变成0,然后再慢慢变成1就实现了渐变的过程
        $("#rot1").children("img").prop("src",data[step].image).css({opacity:0}).stop().animate({opacity:1},2000);
        //heading显示
        $("#rot1 .heading").stop().animate({left:-450},700,"easeOutCirc",function () {
            $("h1",$(this)).html(data[step]["heading"]);
            $(this).stop().animate({left:0},600,"easeInOutQuad")
        });
        //description显示
        $("#rot1 .description").stop().animate({bottom:-270},700,"easeOutCirc",function () {
            $("p",$(this)).html(data[step]["description"]);
            $(this).stop().animate({bottom:0},500,"easeInOutQuad")
        })

    }).parent().siblings().children("a").stop().animate({marginRight:-20},400,function () {
        $(this).stop().animate({opacity:0.6},700)
    })
}

display($("#menu .li0"));
//4.设置定时器
timer=window.setInterval(move,3000);