"use strict";define(["jquery","ajax"],function($,ajax){ajax("GET","/ms-user-status/userStatus").then(function(data){var name=data.name,studentCard=data.studentCard;console.log("-------- "+data.id+" --------"),$(".user-status .login").remove(),$(".user-status .name").append(name+"&nbsp;&nbsp;登出"),$(".user-status .student-card").append(""+studentCard)}),$(".user-status .logout").on("click",function(){ajax("PUT","https://test.ehanlin.com.tw/Users/521d946be4b0d765448570bd/!logout").then(function(){console.log("=========="),console.log(window.location.hostname),window.location="https://"+window.location.hostname})}),$(".user-status .name").on("click",function(){window.location.href="/my/owned/Courses.html"}),$(".user-status .student-card").on("click",function(){window.location.href="/my/owned/Courses.html"}),$(".user-status .login").on("click",function(){window.location.href="/Users/login.html"})});