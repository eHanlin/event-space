"use strict";define(["jquery","ajax"],function(n,t){t("GET","/ms-user-status/userStatus").then(function(t){var s=t.name,o=t.studentCard;console.log("--------- "+t.id+" ----------"),n(".user-status .login").remove(),n(".user-status .name").append(s+'&nbsp;&nbsp;<span class="logout">登出</span>'),n(".user-status .student-card").append(""+o)}),n(".user-status .logout").on("click",function(){t("PUT","/Users/521d946be4b0d765448570bd/!logout").then(function(){window.location="https://"+window.location.hostname})}),n(".user-status .name").on("click",function(){t("PUT","/Users/521d946be4b0d765448570bd/!logout").then(function(){window.location="https://"+window.location.hostname})}),n(".user-status .student-card").on("click",function(){window.location.href="/my/owned/Courses.html"}),n(".user-status .login").on("click",function(){window.location.href="/Users/login.html"})});