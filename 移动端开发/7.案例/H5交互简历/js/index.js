/*解析URL方法,将这个方法加在String.prototype*/
~function (pro) {
    function queryURL() {
        //this->字符串String的实例,就是所有的字符串
        //?a=1&b=2 ->{a:1,b:2}
        //=两端只要不是?,&,=,#其他的内容都可以
        var reg = /([^?&=#]+)=([^?&=#]+)/g;
        var obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryUrl = queryURL;
}(String.prototype);

//不足10补0
function addZero(num) {
    return num >= 10 ? num : "0" + num;
}

/*loading显示  单例模式*/
var LoadRender = (function () {
    //将页面上所有的图片放到一个数组中
    var ary = ["icon.png", "zf_concatAddress.png", "zf_concatInfo.png", "zf_concatPhone.png", "zf_course.png", "zf_course1.png", "zf_course2.png", "zf_course3.png", "zf_course4.png", "zf_course5.png", "zf_course6.png", "zf_cube1.png", "zf_cube2.png", "zf_cube3.png", "zf_cube4.png", "zf_cube5.png", "zf_cube6.png", "zf_cubeBg.jpg", "zf_cubeTip.png", "zf_emploment.png", "zf_messageArrow1.png", "zf_messageArrow2.png", "zf_messageChat.png", "zf_messageKeyboard.png", "zf_messageLogo.png", "zf_messageStudent.png", "zf_outline.png", "zf_phoneBg.jpg", "zf_phoneDetail.png", "zf_phoneListen.png", "zf_phoneLogo.png", "zf_return.png", "zf_style1.jpg", "zf_style2.jpg", "zf_style3.jpg", "zf_styleTip1.png", "zf_styleTip2.png", "zf_teacher1.png", "zf_teacher2.png", "zf_teacher3.jpg", "zf_teacher4.png", "zf_teacher5.png", "zf_teacher6.png", "zf_teacherTip.png"];
    //获取所需要的元素
    var $loading = $("#loading"),
        $progressBox = $(".progress .progressBox"),
        step = 0,//记录加载到第几张图片
        total = ary.length;//图片的总个数
    return {
        init: function () {
            $loading.css("display", "block");
            //循环加载页面中所有的图片,控制进度条的宽度,加载图片的个数/图片的总个数这个比例就是当前进度条的宽的比例
            $.each(ary, function (index, item) {
                var oImg = new Image;
                oImg.src = "img/" + item;
                oImg.onload = function () {
                    step++;
                    $progressBox.css("width", step / total * 100 + "%");
                    //当图片全部加载完成之后,进度条也就完成了,此时显示phone区域
                    if (step == total) {
                        //为了页面的显示效果,稍微停一下再显示phone
                        //为了方便开发,当前page=0的时候,只显示这个loading区域,不再往下显示
                        if (page == 0) return;
                        window.setTimeout(function () {
                            $loading.css("display", "none");
                            PhoneRender.init();
                        }, 2000);
                    }
                }
            })
        }
    }
})();
/*phone显示    单例模式*/
var PhoneRender = (function () {
    //获取当前区域内jS所需要的元素
    var $phone = $("#phone"),
        $listen = $phone.children(".listen"),
        $listenTouch = $listen.children(".touch"),
        $detail = $phone.children(".details"),
        $detailTouch = $detail.children(".touch"),
        $time = $phone.children(".time");
    var listenMusic = $("#listenMusic")[0],
        detailMusic = $("#detailMusic")[0],
        musicTimer = null;

    function detailMusicPlay() {
        //播放音频detailMusic
        detailMusic.play();
        //设置定时器,每隔一秒获取播放的时间,转化成分:秒
        musicTimer = window.setInterval(function () {
            var current = detailMusic.currentTime,
                m = Math.floor(current / 60),
                s = Math.floor(current - m * 60);
            //将这个时间加在$time中,显示在页面上
            $time.html(addZero(m) + ":" + addZero(s));
            //当音频播放完成关闭当前phone,显示message
            if (current >= detailMusic.duration) {
                window.clearInterval(musicTimer);
                closePhone()
            }
        }, 1000)
    }

    function closePhone() {
        //让Phone消失之前先关掉音频
        detailMusic.pause();
        //Phone平移到最下面,有个动画效果消失
        $phone.css("transform", "translateY(" + document.documentElement.clientHeight + "px)").on("webkitTransitionEnd", function () {
            //当过度效果完成之后才会执行的函数
            //此时让Phone消失
            $phone.css("display", "none");
        });
        MessageRender.init();
    }

    return {
        init: function () {
            //让当前区域phone显示
            $phone.css("display", "block");
            //播放接听铃声,listenMusic播放
            listenMusic.play();
            //给listenTouch绑定单击事件,zepto中有现成的单击事件singleTap

            $listenTouch.singleTap(function () {
                //让listen消失
                $listen.css("display", "none");
                //让当前铃声停止播放
                listenMusic.pause();
                //让detail显示
                $detail.css("transform", "translateY(0)");
                //让时间显示
                $time.css("display", "block");
                //让detailMusic播放
                detailMusicPlay();
            });
            //给detailTouch绑定单击事件
            $detailTouch.singleTap(closePhone)
        }
    }
})();
/*message显示  单利模式*/
var MessageRender = (function () {
    var $message=$("#message"),
        $messageList=$message.children(".messageList"),
        $messageLis=$messageList.children("li"),
        $keyBoard=$message.children(".keyBoard"),
        $textTip=$keyBoard.children(".textTip"),
        $submit=$keyBoard.children(".submit");
    var messageMusic=$("#messageMusic")[0];
    var autoTimer=null,step=-1,total=$messageLis.length,bounceTop=0;
    //消息列表的推送
    function messageMove(){
        messageMusic.play();
        //设置定时器,每隔一段时间(1.5s)推送一条消息
        autoTimer=window.setInterval(function () {
            step++;
            //获取当前要推送的消息
            var $curLi=$messageLis.eq(step);
            $curLi.css({transform:"translateY(0)",opacity:1});
            //当消息推送到第三条就停止,显示键盘keyboard
            if(step==2){
                //清掉定时器就是停止推送
                window.clearInterval(autoTimer);
                //显示键盘keyboard
                $keyBoard.css({
                    transform:"translateY(0)"
                });
                //显示textTip
                $textTip.css("display","block");
                //模拟输入文字
                textMove()
            }
            //当推送到第四条的时候开始,每推送一条整体往上移
            if(step>=3){
                bounceTop-=$curLi[0].offsetHeight+10;
                $messageList.css("transform","translateY("+bounceTop+"px)");
            }
            //当消息完全推送完成
            if(step==total-1){
                //清除定时器
                window.clearInterval(autoTimer);
                //为了开发方便当page=2的时候停在当前区域不动
                if(page==2)return;
                //当前区域消失,下一个区域显示
                //关掉音乐
                messageMusic.pause();
                $message.css("display","none");
                CubeRender.init()
            }
        },1500)
    };
    //模拟键盘输入文字
    function textMove() {
        var text="都学会了!可还是找不到工作呀!",
            n=-1,
            result="",
            timer=null;
        //设定定时器每隔300ms显示一个文字
        timer=window.setInterval(function () {
            n++;
            //显示的内容拼接到result上
            result+=text[n];
            //将显示的内容放到页面上的$textTip上
            $textTip.html(result);
            if(n==text.length-1){
                //此时已经输入完成,清除定时器
                window.clearInterval(timer);
                //显示发送按钮$submit
                $submit.css("display","block");
                //给发送按钮绑定单击事件
                $submit.singleTap(function () {
                    //先让输入的文字消失
                    $textTip.css("display","none");
                    //让当前键盘keyBoard以动画效果平移下去
                    $keyBoard.css("transform","translateY(3.7rem)");
                    //消息继续推送,继续执行messageMove
                    messageMove();
                })
            }
        },300)

    }
    return {
        init: function () {
            $message.css("display", "block");
            //消息推送
            messageMove()
        }
    }
})();
/*cube显示     单利模式*/
var CubeRender=(function () {
    var $cube=$("#cube"),
        $cubeBox=$cube.children(".cubeBox"),
        $cubeBoxLis=$cubeBox.children("li");
    function start(e) {
        var point=e.touches[0];
        //手指一放上就记录一下当前指头的偏移
        //再加上改变的x,y方向的值changeX和changeY,初始是0
        $(this).attr({
            startX:point.clientX,
            startY:point.clientY,
            changeX:0,
            changeY:0
        })
    }
    function move(e) {
        //在屏幕上滑动的时候,记录当前changeX和changeY
        var point=e.touches[0];
        //求出移动的时候changeX和changeY,现在的位置-之前记录的初始位置
        var changeX=point.clientX-$(this).attr("startX"),
            changeY=point.clientY-$(this).attr("startY");
        //将求出的changeX和changeY存到自定义属性上
        $(this).attr({
            changeX:changeX,
            changeY:changeY,

        })
    }
    function end(e) {
        //手指离开屏幕的时候,根据你滑动的距离,让魔方cubeBox旋转一定的角度
        //将之前move中存起来的changeX和changY取出来
        //注意通过attr方法获取出来的都是字符串,我们将其变成数字
        var changeX=parseFloat($(this).attr("changeX")),
            changeY=parseFloat($(this).attr("changeY"));
        //获取之前的角度
        var rotateX=parseFloat($(this).attr("rotateX")),
            rotateY=parseFloat($(this).attr("rotateY"));
        //判断是否滑动,如果不是滑动就不需要动了
        if(!isSwiper(changeX,changeY))return;
        //是滑动了,先计算需要旋转的角度
        rotateX=rotateX-changeY/3;
        rotateY=rotateY+changeX/3;
        //旋转魔方
        $(this).attr({
            rotateX:rotateX,
            rotateY:rotateY,
        }).css({transform:"scale(0.6) rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)"});

    }
    function isSwiper(changeX,changeY) {
        return Math.abs(changeX)>30||Math.abs(changeY)>30;
    }
   return{
       init:function () {
           $cube.css("display","block");
           //存储一下初始位置魔方的角度
           $cubeBox.attr({
               rotateX:-30,
               rotateY:45,
           }).on("touchstart",start).on('touchmove',move).on("touchend",end);
           //给每一个面绑定点击的事件,跳转到对应的swiper的滑块中
           $cubeBoxLis.tap(function () {
               $cube.css("display","none");
               SwiperRender.init($(this).index())
           })
       }
   }
})();
/*swiper显示  单利模式*/
var SwiperRender=(function () {
    var $swiper=$("#swiper"),
        $return=$swiper.children(".return"),
        $slides=$(".swiper-slide"),
        $makisu=$("#makisu");
    function change(example) {
        //example:每一次执行这个函数默认传的参数,当前这个swiper的实例
        //example.slide:当前实例中所有的滑块
        //example.activeIndex:当前展示出现的滑块的索引
        //显示那一块就给他加一个ID="page"+(index+1)

        //example.activeIndex是0的时候显示的是折叠菜单
        if(example.activeIndex==0){
            $makisu.makisu({
                selector:"dd",
                overlap:0.6,
                speed:0.8
            });
            //展开
            $makisu.makisu("open");
        }else {
            //显示其他块的时候,再收起来
            $makisu.makisu({
                selector:"dd",
                overlap:0.6,
                speed:0
            });
            //展开
            $makisu.makisu("close");
        }

        $slides.each(function (index,item) {
            if(index==example.activeIndex){
                item.id="page"+(index+1);
            }else {
                item.id=null;
            }
        })

    }
    return{
        init:function (index=0) {
            $swiper.css("display","block");
            //初始化swiper
            //onTransitionEnd:每一个滑块出现显示的时候就会触发他的transition,所以说每个滑块内的动画效果只需要写在这个函数中即可
            var mySwiper=new Swiper(".swiper-container",{
                effect:"coverflow",
                onTransitionEnd:change
            });
            //根据传进来的参数index,显示对应的滑块
            //mySwiper.slideTo(滑块的索引,速度);
            mySwiper.slideTo(index,0);
            //给return绑定点击事件,点击跳出到cube区域
            $return.singleTap(function () {
                $swiper.css("display","none");
                $("#cube").css("display","block")
            })
        }
    }
})();

var page = window.location.href.queryUrl().page;
page == 0 || isNaN(page) ? LoadRender.init() : null;
page == 1 ? PhoneRender.init() : null;
page == 2 ? MessageRender.init() : null;
page == 3 ? CubeRender.init() : null;
page == 4 ? SwiperRender.init() : null;