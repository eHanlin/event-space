'use strict';

define(['jquery', 'ajax', 'eventCountUp'], function ($, ajax, eventCountUp) {
  ajax('GET', '/currencyBank/totalAssets/one').then(function (data) {
    var finalCoins = data.content.coins;
    var finalGems = data.content.gems;

    eventCountUp('coins', 0, finalCoins);
    eventCountUp('gems', 0, finalGems);
  });
});