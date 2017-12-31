function getRem(){
	document.documentElement.style.fontSize=100/(375/document.documentElement.clientWidth)+"px";
};
getRem();
window.addEventListener("resize",getRem,false);
//var ss=document.querySelectorAll("*");
//for(var i=0;i<ss.length;i++){
//	var s=window.getComputedStyle(ss[i]);
//	console.log(s)
//	for(var k in s){
//		console.log(k,s[k])
//	}
//}
