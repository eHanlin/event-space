"use strict";define(["jquery","confirmPopup"],function($,confirmPopup){confirmPopup.awardIsZeroDialog("禮物贈完","剩下的寶箱幫你拿去當鋪了！",function(){$(".shining-block").show();for(var index=1;index<21;index++)$(".shining-block .shining-coins").append('<img class="coins'+index+'" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/coinGif.gif">');for(var _index=1;_index<13;_index++)$(".shining-block .shining-gems").append('<img class="gems'+_index+'" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/gemGif.gif">')})});