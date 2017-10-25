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
        $phone.css("transform","translateY("+document.documentElement.clientHeight+"px)").on("webkitTransitionEnd",function () {
            //当过度效果完成之后才会执行的函数
            //此时让Phone消失
            $phone.css("display","none");
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
var MessageRender=(function () {
    return {
        init:function () {
            
        }
    }
})();
/*cube显示     单利模式*/
/*swiper显示  单利模式*/


var page = window.location.href.queryUrl().page;
page == 0 || isNaN(page) ? LoadRender.init() : null;
page == 1 ? PhoneRender.init() : null;