window.Banner=(function () {
    return function (id,url,duration,interval) {
        //id:当前轮播的最外层盒子的id  必填
        //url:数据的地址              必填
        //duration:运动时间           选填(默认值1000)
        //interval:轮播的频率         选填(默认值2000)
        duration=duration||1000;
        interval=interval||2000;
        if(duration>interval){
            [duration,interval]=[interval,duration];
        }
        //1.根据id获取相应的元素
        let banner=document.getElementById(id);
        let bannerInner=banner.getElementsByClassName("bannerInner")[0];
        let focusList=banner.getElementsByClassName("focusList")[0];
        let imgList=bannerInner.getElementsByTagName("img");
        let list=focusList.getElementsByTagName("li");
        let leftBtn=banner.getElementsByTagName("a")[0];
        let rightBtn=banner.getElementsByTagName("a")[1];
        let w=banner.offsetWidth;
        let data=null,step=0,timer=null,isClick=true;
        //2.根据url获取数据
        ;(function (url) {
            let xhr=new XMLHttpRequest();
            xhr.open("GET",url,false);
            xhr.onreadystatechange=function () {
                if(xhr.readyState===4&&xhr.status==200){
                    data=$.toJSONObj(xhr.responseText);
                }
            };
            xhr.send(null);
        })(url);
        //3.绑定数据
        ;(function (data) {
            if(data){
                let str1=``,str2=``;
                for(let i=0;i<data.length;i++){
                    str1+=`<div><img src="" photo="${data[i].src}"></div>`;
                    str2+=i==0?`<li class="selected"></li>`:`<li></li>`;
                }
                str1+=`<div><img src="" photo="${data[0].src}"></div>`;
                $.css(bannerInner,"width",(data.length+1)*w);
                bannerInner.innerHTML=str1;
                focusList.innerHTML=str2;
            }
        })(data);
        //4.延迟加载
        ;(function () {
            for (let i=0;i<imgList.length;i++){
                let img=document.createElement("img");
                img.src=imgList[i].getAttribute("photo");
                img.onload=function () {
                    imgList[i].src=this.src;
                    imgList[i].animation({opacity:1},1000);
                }
            }
        })();
        function move() {
            if(isClick){
                isClick=false;
                if(step==data.length){
                    step=0;
                    $.css(bannerInner,{left:0});
                }
                step++;
                bannerInner.animation({left:-step*w},duration,function () {
                    isClick=true;
                });
                focusAlign();
            }
        }
        function focusAlign() {
            for(let i=0;i<list.length;i++){
                step==data.length?list[0].className="selected":null;
                list[i].className=i==step?"selected":"";
            }
        }
        banner.onmouseover=function () {
            window.clearInterval(timer);
            $.css(leftBtn,{display:"block"});
            $.css(rightBtn,{display:"block"});
        };
        banner.onmouseout=function () {
            if(this.auto){
                timer=window.setInterval(move,interval);
            };
            $.css(leftBtn,{display:"none"});
            $.css(rightBtn,{display:"none"});
        };
        //5.自动轮播
        function autoMove() {
            //只要是这个函数执行了说明加上自动轮播了
            banner.auto=true;
            timer=window.setInterval(move,interval);
            return this;//链式写法
        }
        //6.焦点点击
        function focusClick() {
            for(let i=0;i<list.length;i++){
                list[i].onclick=function () {
                   if(isClick){
                       isClick=false;
                       step=i;
                       bannerInner.animation({left:-step*w},duration,function () {
                           isClick=true;
                       });
                       focusAlign();
                   }
                }
            }
            return this;
        }
        //7.左右切换
        function arrowClick() {
            rightBtn.onclick=move;
            leftBtn.onclick=function () {
                if(isClick){
                    isClick=false;
                    if(step==0){
                        step=data.length;
                        $.css(bannerInner,{left:-step*w})
                    }
                    step--;
                    bannerInner.animation({left:-step*w},duration,function () {
                        isClick=true;
                    });
                    focusAlign();
                }
            };
            return this;
        }
        return{
            init:function () {
                this.autoMove();
                this.focusClick();
                this.arrowClick();
                return this;
            },
            autoMove:autoMove,
            focusClick:focusClick,
            arrowClick:arrowClick
        }
    }
})();