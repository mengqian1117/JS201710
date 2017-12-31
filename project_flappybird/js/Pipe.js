(function(){
	var Pipe = window.Pipe = function(){
		//管子的高度（指的是上面管子的高度）
		this.h = parseInt(Math.random() * 220) + 100;
		//上下管子之间的间隙
		this.space = 140;
		//下管子的高度（因变量，不是主动量）
		this.h2 = game.canvas.height - 112 - this.h - this.space;
		//初始位置
		this.x = game.canvas.width;

		//把自己加入队列
		game.pipeArr.push(this);
	}
	Pipe.prototype.update = function(){
		this.x -= 2;

		//自杀检测
		if(this.x < -52){
			for (var i = 0; i < game.pipeArr.length; i++) {
				if(game.pipeArr[i] === this){
					game.pipeArr.splice(i,1);
				}
			};
		}
    };
	Pipe.prototype.render = function(){
		game.ctx.drawImage(game.R["pipe_down"],0,320-this.h,52,this.h,this.x,0,52,this.h);
		game.ctx.drawImage(game.R["pipe_up"],0,0,52,this.h2, this.x , this.h + this.space , 52 , this.h2);
	}
})();