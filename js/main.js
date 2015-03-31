
var cardImgUrl = "/cardImg"
var imgList = new Array();
var numOfImg = 0;
var numOfFinishImg = 0;
var stopTimeCount = true;
var timedCount = -1;
var tryTimes = 0;
var MAX_TIME = 9999999;
var minPlayTime = MAX_TIME;
var minTryTimes = MAX_TIME;
var curCard;
var preCard;
var canClick = true;
var $cardTable;

function init(){
    $cardTable = $("#cardTable");
}


function lock(){
    canClick = false;
}

function unlock(){
    canClick = true;
}

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

function setPosition(){
    $cardTable.css({ 
    left: ($(window).width() - $cardTable.outerWidth())/2, 
    top: ($(window).height() - $cardTable.outerHeight())/2 
    });    
}

$(window).resize(function(){ 
    setPosition();
}); 