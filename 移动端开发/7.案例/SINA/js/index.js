/*--HEADER--*/
let headerRender=(()=>{
    let $headerBox=$(".headerBox"),
        $menu=$headerBox.find(".menu"),
        $navBox=$(".navBox");
    let menuFn=()=>{
        //給menu加一个标志,记录当前是展开还是收起来的,用自定义属性加
        $menu.attr("isShow",false);
        //给menu绑定点击事件
        $menu.tap(function () {
            //获取他的isShow的值
            var isShow=$(this).attr("isShow");
            if(isShow==="false"){
                //当前是隐藏的,我们就让他展开
                $navBox.css({
                    height:"1.6rem",
                    padding:".16rem"
                });
                //改变isShow属性的值
                $menu.attr("isShow",true);
                return;
            }
            //->当前就是展开的,我们让其隐藏
            $navBox.css({
                height:0,
                padding:0
            });
            //改变isShow属性的值
            $menu.attr("isShow",false);
        })
    };
    return{
        init:function () {
            menuFn()
        }
    }
})();
headerRender.init();
/*--SWIPER--*/
let swiperRender=(()=>{
    let $swiper=$(".swiper-wrapper");
    let $CB=$.Callbacks();
    //绑定数据到页面上的函数
    $CB.add((data)=>{
        //准备一个空字符串
        var strHtml=``;
        $.each(data,function () {
            //this==>当前循环的这一项
            strHtml+=`
            <div class="swiper-slide">
                    <a href="${this.link}">
                        <img src="${this.img}" alt="">
                        <span>${this.desc}</span>
                    </a>
                </div>
            `
        });
        $swiper.html(strHtml);
    });
    //实现轮播的函数
    $CB.add(()=>{
        //实现轮播图的滑动
        //1.使用构造函数方式创建一个Swiper的实例 new Swiper(".swiper-container")
        //2,第二个参数,是配置信息,是个对象,属性名都是swiper给你提供的
        new Swiper(".swiper-container",{
            autoplay:3000,//自动轮播的时间
            loop:true,//实现闭合的环路,无缝滑动
            autoplayDisableOnInteraction:false,//手动轮播之后停止自动轮播,false:就是不让他停下来
            pagination:".swiper-pagination",//设置分页器
            paginationType:"fraction",//设置分页器的类型
        });

    });
    return{
        init:function () {
            //获取数据 $.ajax
            $.ajax({
                url:"banner.json",
                method:"get",//type
                dataType:"json",
                cache:false,//走不走缓存
                success:function (data) {
                    $CB.fire(data);
                }
            })
        }
    }
})();
swiperRender.init();
/*--ASIDE--*/
let asideRender=(()=>{
    let $asideBox=$(".asideBox"),
        $list=$asideBox.find(".list");
    let $CB=$.Callbacks();
    //数据绑定
    $CB.add((data)=>{
        let str=``;
        $.each(data,function () {
            str+=`<li>
               <a href="${this.link}">${this.title}</a>
            </li>`
        });
        $list.html(str);
        //为了实现无缝的上下滚动,在最后面拼接一个第一条li
        //获取第一条li
        let $li=$list.find("li").eq(0);
        //将$li克隆一份一样的加在$list的后面,注意clone(true),这样的话li的内容才会全部克隆
        $list.append($li.clone(true))
    });
    //实现上下滚动的动画效果
    let timer=null,step=0;
    let asideH=$asideBox[0].offsetHeight;
    $CB.add(()=>{
        //设置定时器,每隔3s滚动一次
        timer=window.setInterval(()=>{
            //加一个过渡效果,过渡的总时间
            $list.css("transitionDuration",".3s");
            step++;
            $list.css({
                transform:`translateY(${-step*asideH}px)`
            }).on("webkitTransitionEnd",function () {
                //当过渡动画完成之后触发的函数,这个时候为们再去判断临界值
                if(step==8){
                    //此时显示的时候显示的是最后克隆的那一条
                    //接下来就让$list瞬间回到初始位置
                    $list.css("transitionDuration","0s");
                    $list.css({
                        transform:"translateY(0)"
                    });
                    step=0;
                }
            });
        },3000)
    });
    return{
        init:function () {
            $.ajax({
                url:"aside.json",
                type:"get",
                dataType:"json",
                cache:false,
                async:false,
                success:$CB.fire
            })
        }
    }
})();
asideRender.init();
/*--NEWS--*/
let newsRender=(()=>{
    let $news=$(".news");
    let $CB=$.Callbacks();
    $CB.add((data)=>{
        let str=``;
        str+=`<ul class="item">`;
        $.each(data.newsList,function () {
            str+=`
             <li>
                    <a href="${this.link}">
                        <img src="${this.img}" alt=""/>
                        <div>
                            <p>${this.title}</p>
                            <span>${this.count}
                                <i class="icon-comment"></i>
                            </span>
                        </div>
                    </a>
                </li>
            `
        });
        str+=`</ul> <div class="image"> <p>${data.imgList.title}</p> <div class="clearfix">`;
        $.each(data.imgList.img,function () {
            str+=`<img src="${this}"/>`
        });
        str+=`</div> <span>${data.imgList.count}<i class="icon-comment"></i></span></div>`;
        $news.append(str);
        //给window绑定下拉加载更多
        $(window).on("scroll",loadMore)
    });
    let loadMore=()=>{
        //获取当前盒子的高度
        let clientH=document.documentElement.clientHeight,
            scrollT=document.documentElement.scrollTop,
            winH=document.documentElement.scrollHeight;
        if(clientH+scrollT+10>=winH){
            //再发一次请求,加载更多
            $(window).off("scroll",loadMore);
            $.ajax({
                url:"news.json",
                type:"get",
                dataType:"json",
                cache:false,
                success:$CB.fire
            })
        }
    };
    return{
        init:function () {
            $.ajax({
                url:"news.json",
                type:"get",
                dataType:"json",
                cache:false,
                success:$CB.fire
            })
        }
    }
})();
newsRender.init();












