
function card(img, id) {
    var Me = this;
    Me["id"] = img.replace(/[/.\s]/, "_") + "_" + id;
    Me["img"] = img;
    Me["toHtml"] = function() {
        return '<div class="card" id="' + Me["id"] + '"><div class="cover"></div><img src="' + cardImgUrl + "/" + Me["img"] + '" /> </div>';
    };

    Me["close"] = function(callback) {
        var $card = $("#" + Me["id"]);
        var openWhenClick = function(){
            if(!canClick) return;
            if(preCard) lock();
            if ($card.is(".card:not(.opened)")) {
                $card.addClass("opened");
                $card.find(".cover").animate({
                    width: 0,
                    left: "55px"
                },
                1100);
                $card.find("img").animate({
                    width: "150px",
                    left: "0"
                },1700,function(){
                    curCard = Me;
                    checkCard();
                });
            }
        };

        $card.unbind("click");
        $card.removeClass("opened");
        $card.find("img").animate({
                    width: "95px",
                    left: "55px"
            },800);
        $card.find(".cover").animate({
            width: 150,
            left: "0px"
        },
        1700,function(){
            $card.click(function() {
                openWhenClick();
            });
            if(callback){
                callback();
            }
        });
    }

    Me["equal"] = function(card){
      if(card.img){
        return Me.img == card.img
      }
      return false;
    }

    return this;
}