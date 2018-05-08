"use strict";define(["jquery","ajax","confirmPopup","eventStatusDo","w3"],function($,ajax,confirmPopup,eventStatusDo,w3){return function(chest,targets){var content=void 0,statusData={status:"UNLOCKING"};content=chest.level>=2?'\n        <div class="start-confirm-grid-container">\n          <div class="content-block1">\n            <span>寶箱準備啟動中...</span>\n          </div>\n  \n          <div class="content-block2">\n            <span>目前寶箱等級為Lv'+chest.level+'，開啟這個寶箱可能獲得</span>\n          </div>  \n          <div class="img-block-left-btn">\n            <img class="left-btn" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/previous.png">\n          </div>\n  \n          <div class="img-block-right-btn">\n            <img class="right-btn" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/next.png">\n          </div>\n  \n          <div class="content-block4">\n            <span>你確定要啟動這個寶箱嗎？</span>\n          </div>\n        </div>\n      ':'\n        <div>\n          <h2 class="header-text">寶箱準備啟動中...</h2>\n          <h3>你確定要啟動這個寶箱嗎？</h3>\n        </div>\n      ',confirmPopup.dialog(content,function(){ajax("PUT","/chest/status/"+chest.id,statusData).then(function(jsonData){"Status of chest is already change"!==jsonData.message?eventStatusDo.unLocking(chest,targets):confirmPopup.ok("Oooooops！","此次寶箱操作，重複進行囉！請重新整理網頁")})},function(){},function(){chest.level<2||ajax("GET","/chest/checkAwardIsZero/chest"+chest.level).then(function(data){var awardsCount,awardsQuantity=data.content,limit=0,awardIndex=void 0,awardId=void 0,awardImages="",awardBlock="",composeAwardBlock=function(awardIndex,limit,awardId,awardImage){switch(awardIndex%limit){case limit-1:awardBlock+='<div class="img-block-award">'+(awardImages+=awardImage)+"</div>",awardImages="";break;default:awardImages+=awardImage}};for(var _awardId in limit=window.matchMedia("(max-width: 500px)").matches?1:window.matchMedia("(max-width: 950px)").matches?3:5,awardsCount=Object.keys(awardsQuantity).length,awardIndex=0,awardsQuantity){var awardImage='<div class="start-show-award">\n                  <img class="img-award'+awardIndex+'" data-award-id="'+_awardId+'" src="https://d220xxmclrx033.cloudfront.net/event-galaxy-space/img/award/'+_awardId+'.png">\n                </div>\n              ';awardIndex===awardsCount-1?awardBlock+='<div class="img-block-award">'+(awardImages+=awardImage)+"</div>":composeAwardBlock(awardIndex,limit,0,awardImage),awardIndex++}$(".img-block-left-btn").after(awardBlock),$("img[class^=img-award]").each(function(index,element){awardId=$(element).attr("data-award-id"),0===awardsQuantity[awardId]&&($(element).addClass("zero-quantity"),$(element).parent("div.start-show-award").append('<img class="award-zero" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-galaxy-space/img/soldout.png">'))});var slide=w3.slideshow(".img-block-award",0);$(".start-confirm-grid-container .right-btn").on("click",function(){slide.next()}),$(".start-confirm-grid-container .left-btn").on("click",function(){slide.previous()})})})}});