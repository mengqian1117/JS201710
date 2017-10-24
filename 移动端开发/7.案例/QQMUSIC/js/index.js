//处理rem
;~function () {
    var win = document.documentElement.clientWidth;
    var dw = 640;
    var $music = $("#music");

    //假如浏览器的宽大于640的设计稿我们就让最大值640px
    if (win > dw) {
        $music.css({width: dw, margin: "0 auto"});
        return;
    }
    document.documentElement.style.fontSize = win * 100 / dw + "px";
    window.htmlFont= win * 100 / dw;
    //htmlFont全局变量存储当前html的fontSize的值,为了后面计算main的高使用
}();
//计算main的height
~function () {
    var $main = $(".main"),
        $header = $(".header"),
        $footer = $(".footer");
    var wh=document.documentElement.clientHeight;
    $main.css("height",wh-$header[0].offsetHeight-$footer[0].offsetHeight-0.8*htmlFont);
    //注意1.ZEPTO没有outerHeight..,只能使用原生的offsetHeight
    //   2.将JQ对象变成原生对象,加一个[0]
    //   3.不要忘了将上下的margin去掉:0.8*htmlFont
}();

function Render() {
    //所有的变量都统一写下上面
    var $lyric=$(".main .lyric"),
        $musicAudio=$("#musicAudio"),
        $musicBtn=$(".musicBtn"),
        $musicPlay=$musicBtn.eq(0),
        $musicPause=$musicBtn.eq(1),
        $progress=$(".progress"),
        $current=$progress.find(".current"),
        $duration=$progress.find(".duration"),
        $timeLine=$progress.find(".timeLine"),
        $timeLineItem=$progress.find("span");
    var duration=0,timer=null,step=0;
    var $MusicPlain=$.Callbacks();
    //不足10补0
    function addZero(num) {
        return num>=10?num:"0"+num;
    }
    //控制自动播放音乐
    function autoPlay() {
        //音乐播放,play这个方法是原生H5元素中的方法,$musicAudio这个JQ对象变成原生的对象,加一个[0]
        $musicAudio[0].play();
        //canplay:这个事件是音乐播放的时候触发
        $musicAudio.on("canplay",function () {
            //1.让播放按钮变成正在播放的状态
            $musicPlay.css("display","none");
            $musicPause.css("display","block");
            //计算总时间,单位秒
            duration=$musicAudio[0].duration;
            var m=Math.floor(duration/60);
            var s=Math.floor(duration-m*60);
            $duration.html(addZero(m)+":"+addZero(s));
        })
    }
    $MusicPlain.add(autoPlay);

    //控制手动播放和暂停
    function playPause() {
        //$musicBtn绑定单击事件
        //判断audio当前的状态,如果是播放的状态就让他暂停,反之播放
        //paused:true:暂停,false:播放
        $musicBtn.tap(function () {
            if($musicAudio[0].paused){
                //此时暂停的状态
                $musicAudio[0].play();
                $musicPlay.css("display","none");
                $musicPause.css("display","block");
                return;
            }
            $musicAudio[0].pause();
            $musicPlay.css("display","block");
            $musicPause.css("display","none");
        })
    };
    $MusicPlain.add(playPause);

    //歌词,播放进度,播放时间的对应
    function lyricSync() {
        var $pList=$lyric.children("p");
        timer=window.setInterval(function () {
            //1.每隔一秒中获取一次当前播放时间,单位是秒s
            var currentTime=$musicAudio[0].currentTime,
                m=addZero(Math.floor(currentTime/60)),
                s=addZero(Math.floor(currentTime-m*60));
            //判断当前的播放时间如果==duration 播放完成,清掉定时器,播放按钮重置,如果<duration,显示当前播放时间
            $current.html(m+":"+s);
            if(currentTime>=duration){
                window.clearInterval(timer);
                //播放按钮重置
                $musicPlay.css("display","block");
                $musicPause.css("display","none");
                return;
            }
            //控制播放进度条
            //span的宽/div的宽=当前时间/总时间
            //$timeLineItem的width/$timeLine的宽=currentTime/duration
            $timeLineItem.css({
                transition:".5s",
                width:(currentTime/duration)*100+"%"
            });
            //歌词对应
            $pList.each(function (item,index) {
                var pm=$(this).attr("m"),
                    ps=$(this).attr("s");
                if(pm==m&&ps==s){
                    step++;
                    if(step>=4){
                        $lyric.css("top",-(step-3)*.84+"rem");
                    }
                    $(this).addClass("bg").siblings().removeClass("bg");
                }
            })

        },1000)
    };
    $MusicPlain.add(lyricSync);

    //绑定歌词的数据到页面上
    function bindHTML(data) {
        var strHtml=``;
        $.each(data,function(index,item){
            strHtml+=`<p id="lyric${item.id}" m="${item.m}" s="${item.s}">${item.lyric}</p>`;
        });
        $lyric.html(strHtml);
        $MusicPlain.fire();
    }
    return {
        init:function () {
            //通过ajax获取歌词
            $.ajax({
                //请求数据的时候一般会在后面拼接一个参数=当前时间
                //时间戳:防止缓存
                url:"json/lyric.json?_t="+new Date().getTime(),
                type:"get",
                dataType:"json",
                data:null,
                async:false,
                success:function (data) {
                    if(data){
                        data=data.lyric||"";
                        //处理歌词数据data
                        data=data.replace(/&#(\d+);/g,function () {
                            var n=arguments[1];
                            switch(parseInt(n)){
                                case 32:
                                    return " ";
                                    break;
                                case 45:
                                    return "-";
                                    break;
                                case 40:
                                    return "(";
                                    break;
                                case 41:
                                    return ")";
                                    break;
                                default:
                                    return arguments[0];
                                    break;
                            };
                        });
                        var dataAry=data.split("&#10;");
                        var reg=/\[(\d{2})&#58;(\d{2})&#46;\d+](.+)/;
                        dataAry=dataAry.filter((item)=>{
                            return reg.test(item);
                        });
                        dataAry=dataAry.map((item,index)=>{
                            var a=reg.exec(item);
                            return {
                                id:index,
                                lyric:a[3],
                                m:a[1],
                                s:a[2]
                            }
                        });
                        //执行bindHTML
                        bindHTML(dataAry);
                    }
                }
            })
        }
    }
};

Render().init();