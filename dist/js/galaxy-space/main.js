"use strict";require.config({shim:{dialog:["jquery"],jqueryCountDown:["jquery"],w3:{exports:"w3"}},paths:{eventClickLink:["./event-click-link"],eventTotalAssets:["./event-total-assets"],eventSlideShow:["./event-slide-show"],eventCountdown:["./event-countdown"],eventUserStatus:["./event-user-status"],eventChestGet:["./event-chest-get"],eventChestDetermine:["./event-chest-determine"],eventChestBtnOn:["./event-chest-btn-on"],eventChestStatusDo:["./event-chest-status-do"],eventChestUpgrade:["./event-chest-upgrade"],eventChestStart:["./event-chest-start"],eventChestReady:["./event-chest-ready"],eventChestOpenImmediately:["./event-chest-open-immediately"],eventChestOpen:["./event-chest-open"],eventChestInspection:["./event-chest-inspection"],eventAwardAreZero:["./event-award-are-zero"],eventAwardGet:["./event-award-get"],eventCountUp:["./event-count-up"],eventBonusPopup:["./event-bonus-popup"],eventOpenFinalPage:["./event-open-final-page"],jquery:["../lib/jquery-3.3.1.min"],w3:["../lib/w3"],swal:["../lib/sweetalert2"],jqueryCountDown:["../lib/jquery-time-countdown.min"],countUp:["../lib/countUp.min"],bluebird:["../lib/bluebird.min"],cookie:["../lib/js.cookie.min"],confirmPopup:["../module-utils/confirm-popup"],ajax:["../module-utils/ajax"]},map:{"*":{jQuery:"jquery"}}}),require(["jquery","ajax"],function(){require(["bluebird"],function(e){window.Promise=e}),require(["eventClickLink"]),require(["eventSlideShow"]),require(["eventUserStatus"]),require(["eventTotalAssets"]),require(["eventAwardGet"],function(e){e()}),require(["eventChestGet"],function(e){e()}),require(["eventBonusPopup"]),require(["eventOpenFinalPage"])});