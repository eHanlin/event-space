"use strict";define(["jquery","ajax","confirmPopup"],function($,ajax,confirmPopup){var eventChestOpenImmediately={ask:function(chest,targets){var seconds=void 0;ajax("GET","/chest/coolDownTime/"+chest.id).then(function(jsonData){return seconds=jsonData.content,ajax("GET","/chest/condition/openImmediately")}).then(function(jsonData){var popupContent,openImmediatelyInfo=jsonData.content.content,secondsCycle=parseInt(openImmediatelyInfo.secondsCycle),spendGems=openImmediatelyInfo.spendGems;popupContent='\n            <div>\n              <h2 class="header-text">立即開啟寶箱需花費 '+(spendGems*=Math.ceil(seconds/secondsCycle))+" 個寶石</h2>\n              <h3>確定要立即開啟寶箱嗎？</h3>\n            </div>\n          ",confirmPopup.dialog(popupContent,eventChestOpenImmediately.process.bind(eventChestOpenImmediately.process,chest,targets,spendGems))})},process:function(chest,targets,spendGems){ajax("GET","/chest/checkBalance?gems="+spendGems).then(function(jsonData){var insufficientMessage=jsonData.content;if(insufficientMessage){return confirmPopup.ok("Oooooops 餘額不足喔！",insufficientMessage),$.Deferred().reject().promise()}return ajax("PUT","/chest/open/immediately/"+chest.id,{spendGems:spendGems})}).then(function(jsonData){var finalGems=jsonData.content.finalGems;require(["eventCountUp"],function(eventCountUp){eventCountUp("gems",parseInt($("#gems").text()),finalGems)}),require(["eventCountdown","eventChestReady"],function(eventCountdown,eventChestReady){eventCountdown(0,chest,targets,eventChestReady)})})}};return eventChestOpenImmediately});