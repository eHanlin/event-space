"use strict";define(["jquery","confirmPopup"],function($,confirmPopup){return function(message,multiResultInfo){for(var resultBlocks="",totalCoins=0,totalGems=0,finalCoins=void 0,finalGems=void 0,i=0;i<multiResultInfo.length;i++){var resultInfo=multiResultInfo[i];resultBlocks+="\n        <div>\n          Lv "+resultInfo.chestLevel+' 寶箱獲得\n          <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">\n          <span>'+resultInfo.coins+'</span>\n          <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">\n          <span>'+resultInfo.gems+"</span>\n        </div>\n      ",totalCoins+=resultInfo.coins,totalGems+=resultInfo.gems,finalCoins=resultInfo.finalCoins,finalGems=resultInfo.finalGems}var isAwardsAreZero=!1;if("All awards are zero"===message){var content='\n          <div class="awards-are-zero-grid-container">\n            '+resultBlocks+'\n            <div class="result-summary-block">\n                總計 \n                <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">'+totalCoins+' \n                <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">'+totalGems+"<br>\n                請至雲端銀行確認\n            </div>\n          </div>\n        ";confirmPopup.awardIsZeroDialog("寶藏已被隊員們探索完畢，請靜待下次開放探索時間<br>總部已將您的寶箱結算",content,function(){require(["eventCountUp"],function(eventCountUp){eventCountUp("coins",parseInt($("#coins").text()),finalCoins),eventCountUp("gems",parseInt($("#gems").text()),finalGems)}),$(".platform img[class^=chest]").remove()}),isAwardsAreZero=!0}return isAwardsAreZero}});