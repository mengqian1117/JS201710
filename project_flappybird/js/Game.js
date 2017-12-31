(function(){
	//游戏类
	var Game = window.Game = function(){
		//游戏类负责canvas元素
		this.canvas = document.getElementById("canvas");
		//上下文
		this.ctx = this.canvas.getContext("2d");
		//适配canvas的宽度和高度
		var windowW = document.documentElement.clientWidth;
		var windowH = document.documentElement.clientHeight;
		this.canvas.width = windowW <= 420 ? windowW : 420;
		this.canvas.height = windowW <= 750 ? windowH : 750;
		//------------------------图片的加载------------------------
		this.R = {
			"bg_day" : "images/bg_day.png",
			"land" : "images/land.png",
			"pipe_down" : "images/pipe_down.png",
			"pipe_up" : "images/pipe_up.png"
		}
		//加载器
		var count = 0;	//计数器
		var picAmount = Object.keys(this.R).length;	//图片总数
		//遍历
		for(var k in this.R){
			(function(self , src){
				self.R[k] = new Image();
				self.R[k].src = src;
				self.R[k].onload = function(){
					count++;
					self.clear();
					self.ctx.font = "30px 黑体";
					self.ctx.textAlign = "center";
					self.ctx.fillText("正在加载资源" + count + "/" + picAmount , self.canvas.width / 2 , 200);
					
					if(count == picAmount){
						//所有图片加载完毕，开始游戏！
						self.start();
					}
				}
			})(this , this.R[k]);
		}
	}
	//清屏
	Game.prototype.clear = function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	//游戏开始
	Game.prototype.start = function(){
		//这里new出所有的演员。为什么要在这里new出演员，基于两点考量：
		//① 这里可以自由使用图片，因为图片已经加载完毕
		//② 这里是异步onload之后做的，所以构造器已经执行完毕，此时全局已经有了game对象。其他类的构造器，可以自由使用game对象。
		this.background = new Background();
		this.land = new Land();
		//管子数组
		this.pipeArr = [];

		//帧编号
		this.frame = 0;
		//设置字体和对齐
		this.ctx.font = "14px consolas";
		this.ctx.textAlign = "left";

		var self = this;
		setInterval(function(){
			self.clear();
			//帧编号++
			self.frame++;
			
			//渲染、更新所有演员
			self.background.update();
			self.background.render();

			self.land.update();
			self.land.render();
			
			for(var i = 0 ; i < self.pipeArr.length ; i++){
				self.pipeArr[i].update();
				self.pipeArr[i] && self.pipeArr[i].render();
			}

			//每100帧new出管子
			self.frame % 100 == 0 && (new Pipe());

			//显示帧编号
			self.ctx.fillStyle = "#333";
			self.ctx.fillText(self.frame , 10 , 20);
		},20);
	}
})();