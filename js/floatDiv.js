var MargiRight = 30;   //浮动层离浏览器右侧的距离
var MarginBottom = 50;     //浮动层离浏览器底部的距离
var Width = 230;        //浮动层宽度
var Heigth= 100;        //浮动层高度

// 格式化时间
function fmtTimeCount(timeCt){
	var hour = parseInt(timeCt / 3600); // 小时数  
	var min = parseInt(timeCt / 60); // 分钟数 
	var lastsecs = timeCt % 60;
	return hour + "时" + min + "分" + lastsecs + "秒"
}

// 设定浮动窗口的画面位置
function setFloatDivPosition(){
	$floatDIV = $("#floatDIV");
	$floatDIV.css({"width":Width,"height":Heigth});
	$floatDIV.css({"top":document.documentElement.clientHeight - Heigth - MarginBottom,"left":document.documentElement.clientWidth - Width - MargiRight});
}
// 画面大小改变时，重新设置浮动窗口位置
$(window).resize(function(){ 
	setFloatDivPosition();
});


$(document).ready(function(){
	// 设置位置
	setFloatDivPosition();
	
	// 保存画面DOM，监控变量显示在画面上
	var $tryTime = $("#tryTime");// 打开次数
	var $playTime = $("#playTime");// 目前用时
	var $rd_tryTime = $("#rd_tryTime"); // 最佳打开次数
	var $rd_playTime = $("#rd_playTime"); // 最佳用时记录
	
	// 监控变量显示在画面上
	setInterval(function(){
		
		$tryTime.text(tryTimes);
		
		if(!stopTimeCount){ // 秒单位计时
			timedCount++;
			$playTime.text(fmtTimeCount(timedCount)); 

		}else{ // 开始或者一次游戏结束
			// 重置计时变量
			timedCount=0;

			// MAX_TIME表示尚未开始游戏，不显示最高纪录
			$playTime.text("等待开始"); 
		    if(minTryTimes!=MAX_TIME){
		        $rd_tryTime.text(minTryTimes);
		    }
		    if(minPlayTime!=MAX_TIME){
		        $rd_playTime.text(fmtTimeCount(minPlayTime));
		    }
		}
	},1000);
}
);


 
