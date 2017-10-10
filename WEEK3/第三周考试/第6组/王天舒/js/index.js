
var data = [
    {"src":"img/1.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/2.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/3.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/4.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/5.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/6.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/7.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/8.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/9.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/10.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/11.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/12.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/13.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/14.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/15.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/16.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/17.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/18.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/19.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/20.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"},
    {"src":"img/21.jpg","title":"十期都是帅哥美女~","desc":"好好学习天天向上，学好JS，打遍天下键盘，BUg我不怕！！！"}

];
var news = document.getElementById('news');
// 一屏的高
var wH = $.win("clientHeight");
// var xhr = new XHLHttpRequset();
// xhr.open("GET" , "url" ,"false")；
// xhr.onreadystatechange = function(){
// 	if(xhr.status == 200 && xhr.readyState == 4){
// 	  data = $.toJSONObj(xhr.responseText)
// 	}
// }
// send(unll)
var strHTML = ``;
function bindData(data){
	data.forEach(function(item){
		strHTML += 
			`<li>
			<div>
			<img src="" photo="${item.src}">
			</div>
			<div>
			<h2>${item.title}</h2>
			<p>${item.desc}</p>
			</div>
			</li>	
			`
	})
	news.innerHTML = strHTML;
}
bindData(data);
var imgList = document.getElementsByTagName('img');
function dalayLoad(){
	for(var i=0;i<imgList.length;i++){
		// 滚动条滑动的距离
		var sT = $.win("scrollTop");
		// 盒子的高度
		var boxH = imgList[i].parentNode.offsetHeight;
		// 盒子的上偏移量
		var boxT = $.offset(imgList[i].parentNode).top;
		 if(sT+wH>=boxH+boxT){
           imgLoad(imgList[i]);
           fadeIn(imgList[i]);
        }
    }
}

dalayLoad();
function imgLoad(imgList){
	var img = new Image;
			img.src = imgList.getAttribute("photo");
			img.onload = function(){
				imgList.src = this.src;
			}
}
function fadeIn(ele){
	ele.timer = window.setInterval(function(){
       
        var opacity = $.css(ele,"opacity");
        opacity+=0.01;
        $.css(ele,"opacity",opacity);
        if(opacity>=1){
        	window.clearInterval(ele.timer);
        }
	},30)
}
// 出发滚动条的时候，仍然执行dalayLoad()方法
window.onscroll = dalayLoad;