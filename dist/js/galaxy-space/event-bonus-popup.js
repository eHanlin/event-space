"use strict";define(["jquery","cookie","ajax"],function($,Cookie,ajax){var isBonusPopup=Cookie.get("isBonusPopup"),bonusPopupTarget=$("#bonus-popup");isBonusPopup||ajax("GET","/chest/condition/bonusPopup").then(function(jsonData){var image=jsonData.content.content.image;bonusPopupTarget.css("background-image","url("+image+")"),bonusPopupTarget.addClass("bonus-popup-show"),setTimeout(function(){$("#bonus-popup img.forward-anchor").css("display","")},1e3),$("#bonus-popup #close-popup").on("click",function(event){event.preventDefault(),$("#bonus-popup").remove()}),Cookie.set("isBonusPopup",!0,{expire:1})})});