// 全局变量定义
var cardImgUrl = "/cardImg" // 卡片用图片保存处
var imgList = new Array();  // 存放所有的卡片对象
var numOfImg = 0; // 图片的数量
var numOfFinishImg = 0; // 当前翻开的数量
var stopTimeCount = true; // 是否停止计时 true：停止计时 false：继续计时
var timedCount = -1; //秒单位计时器
var tryTimes = 0; // 尝试打开次数
var MAX_TIME = 9999999; // 最大值
var minPlayTime = MAX_TIME; // 最高时间记录
var minTryTimes = MAX_TIME; // 最高尝试记录
var curCard; // 当前翻开的卡片
var preCard; // 前一张翻开的卡片
var canClick = true; // 是否能点击卡片
var $cardTable; // 画面上布局卡片的位置

function init(){
    $cardTable = $("#cardTable");
}


function lock(){
    canClick = false;
}

function unlock(){
    canClick = true;
}

// 检查翻开的两张卡片是否有效
function checkCard() {
    if (preCard && curCard) {
        tryTimes++;
        if (!curCard.equal(preCard)) {
            curCard.close();
            preCard.close(unlock);
        }else{
            numOfFinishImg++;
            unlock();
            if(numOfImg == numOfFinishImg){
                GameStart();
            }
        }
        curCard = null;
        preCard = null;
    } else {
        preCard = curCard;
        unlock();
    }
}

// 将目录下的图片包装成卡片对象保存起来
function showCardList() {
    $.get(cardImgUrl,
    function(rep) {
        $("#imgList").html(rep);
        
        $("#imgList a").each(function(i, a) {
            imgsrc = $(a).attr("href");
            numOfImg++;
            imgList.push(new card(imgsrc, 1));
            imgList.push(new card(imgsrc, 2));
        });

        GameStart(imgList);
    });
}

// 游戏开始
function GameStart(){
    stopTimeCount = true;
    if(tryTimes > 0 && tryTimes < minTryTimes){
        minTryTimes = tryTimes;
    } 
    if(timedCount > 0 && timedCount < minPlayTime){
        minPlayTime = timedCount;
    }
    tryTimes = 0;
    numOfFinishImg = 0;
    $("#cardTable table").detach();
    
    makeCardInTable(imgList);

    setTimeout(function() {
        for (var i = 0; i < imgList.length; i++) {
            imgList[i].afterClick = checkCard;
            imgList[i].close();
        };
        stopTimeCount = false;
    },
    2000);
}

// 重新洗牌
function randCardList(imgList) {
    num = imgList.length;
    for (var i = 0; i < num/2; i++) {
        var iRand = (parseInt(num * Math.random())) % num;
        var temp = imgList[i];
        imgList[i] = imgList[iRand];
        imgList[iRand] = temp;
    }
    return imgList;
}

// 将卡片显示在画面上
function makeCardInTable(imgList) {
    num = imgList.length;
    maxCol = 10;
    for (var col = maxCol; col >= 2; col--) {
        if (num % col == 0) break;
    }

    row = num / col;

    imgList = randCardList(imgList);

    var html = '<table><tbody>';
    var index = 0;
    for (j = 0; j < row; j++) {
        html = html + '<tr>';
        for (k = 0; k < col; k++) {
            html = html + '<td>'+ imgList[index].toHtml() + '</td>'
            index++;
        }
        html = html + '</tr>';
    }

    html = html + '</tbody></table>';

    $cardTable.html(html);
    setPosition();
}


$(document).ready(function() {
    showCardList();
    init();
})

// 设置卡片的位置
function setPosition(){
    $cardTable.css({ 
    left: ($(window).width() - $cardTable.outerWidth())/2, 
    top: ($(window).height() - $cardTable.outerHeight())/2 
    });    
}

// 窗口大小改变时，自动重新设置位置
$(window).resize(function(){ 
    setPosition();
}); 