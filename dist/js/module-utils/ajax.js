"use strict";define(["jquery"],function(n){return function(t,e,a){return"GET"!==t&&(a=JSON.stringify(a)),n.ajax({type:t,cache:!1,crossDomain:!0,url:e,data:a,contentType:"application/json; charset=UTF-8",dataType:"json"})}});