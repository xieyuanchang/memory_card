var MargiRight = 30;   //浮动层离浏览器右侧的距离
var MarginBottom = 50;     //浮动层离浏览器底部的距离
var Width = 230;        //浮动层宽度
var Heigth= 100;        //浮动层高度

function fmtTimeCount(timeCt){
	var hour = parseInt(timeCt / 3600); // 小时数  
	var min = parseInt(timeCt / 60); // 分钟数 
	var lastsecs = timeCt % 60;
	return hour + "时" + min + "分" + lastsecs + "秒"
}

function setFloatDivPosition(){
	$floatDIV = $("#floatDIV");
	$floatDIV.css({"width":Width,"height":Heigth});
	$floatDIV.css({"top":document.documentElement.clientHeight - Heigth - MarginBottom,"left":document.documentElement.clientWidth - Width - MargiRight});
}

$(document).ready(function(){
	setFloatDivPosition();
	$tryTime = $("#tryTime");
	$playTime = $("#playTime");
	$rd_tryTime = $("#rd_tryTime");
	$rd_playTime = $("#rd_playTime");
	
	setInterval(function(){
		$tryTime.text(tryTimes);
		if(!stopTimeCount){
			timedCount++;
			$playTime.text(fmtTimeCount(timedCount)); 
		}else{
			$playTime.text("等待开始"); 
			timedCount=0;
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


$(window).resize(function(){ 
	setFloatDivPosition();
}); 
