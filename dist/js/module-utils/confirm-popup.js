"use strict";define(["jquery","swal"],function(n,t){var o={background:"url(https://d220xxmclrx033.cloudfront.net/event-space/img/popup/confirm.png) repeat center center / contain",width:"100%",customClass:"confirm-popup-modal",buttonsStyling:!1,allowOutsideClick:!1},i=function(n){var t={},o=void 0;for(o in n)t[o]=n[o];return t};return{dialog:function(e,s,c,r,a,l){var p=i(o);return p.title="",p.html=e,p.showCancelButton=!0,p.confirmButtonText=a||"確定",p.confirmButtonClass="confirm-popup-btn confirm-popup-btn-dialog",p.cancelButtonText=l||"我再想想",p.cancelButtonClass="confirm-popup-btn confirm-popup-btn-cancel",p.reverseButtons=!0,p.onOpen=function(){n(".swal2-header").remove(),r&&r()},t(p).then(function(n){n.value&&s?s():n.dismiss===t.DismissReason.cancel&&c&&c()})},image:function(e,s,c,r){var a=i(o);return a.title="",a.html='\n          <div class="confirm-grid-gif-container">\n            <div class="header-block1">'+e+'</div>\n            <div class="content-block1 ">'+s+"</div>\n          </div> \n        ",a.confirmButtonText=r||"我瞭解了",a.confirmButtonClass="confirm-popup-btn confirm-popup-btn-gif",a.onOpen=function(){n(".swal2-header").remove()},t(a).then(function(n){n.value&&c&&c()})},ok:function(n,e,s,c){var r=i(o);return r.title='<span style="color: #217dbb;">'+n+"</span>",r.html='<div style="font-weight: bolder">'+e+"</div>",r.confirmButtonText=c||"我瞭解了",r.confirmButtonClass="confirm-popup-btn confirm-popup-btn-ok",t(r).then(function(n){n.value&&s&&s()})},awardIsZeroDialog:function(o,e,s,c){var r=i({background:"url(https://d220xxmclrx033.cloudfront.net/event-space/img/popup/confirm.png) repeat center center / contain",width:"100%",customClass:"awards-are-zero-confirm-popup-modal",buttonsStyling:!1,allowOutsideClick:!1});return r.title='<span class="awards-are-zero-title">'+o+"</span>",r.html='<div style="font-weight: bolder">'+e+"</div>",r.confirmButtonText=c||"好的",r.confirmButtonClass="confirm-popup-btn confirm-popup-btn-awardZero",r.onOpen=function(){n(".swal2-content").append('\n          <div class="shining-block">\n            <div class="shining-coins"></div>\n            <div class="shining-gems"></div>\n          </div>\n          ');for(var t=1;t<31;t++)n(".shining-block .shining-coins").append('<img class="coins'+t+'" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/coinGif.gif">');for(var o=1;o<21;o++)n(".shining-block .shining-gems").append('<img class="gems'+o+'" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/gemGif.gif">')},t(r).then(function(n){n.value&&s&&s()})}}});