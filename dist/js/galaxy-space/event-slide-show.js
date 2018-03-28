define(["jquery","w3","ajax"],($,w3,ajax)=>{ajax("GET","http://localhost:8080/chest/award/conditions").then(data=>{let awards=data.content;for(let index in awards){let howMany,value=awards[index],title=value.content.title,quantity=value.content.quantity,needChestLv=value.content.needChestLv,notice=value.content.notice,awardId=value.id;0===quantity&&(howMany="沒貨啦"),quantity>0&&(howMany="還有貨喔"),$(".slide-show").append(`<img class="nature" src="./img/award/${awardId}.png">`),$(".slide-show-text").append(`<span class="award">${title}</span>\n             <span class="quantity">庫存狀況：${howMany}</span>\n             <span class="needChestLv">所在寶箱：Lv${needChestLv}</span>\n             <span class="awardNotice">${notice}</span>`)}let nature=w3.slideshow(".nature",3e3),award=w3.slideshow(".award",3e3),needChestLv=w3.slideshow(".needChestLv",3e3),quantity=w3.slideshow(".quantity",3e3),awardNotice=w3.slideshow(".awardNotice",3e3);$(".previous").on("click",event=>{nature.next(),award.next(),needChestLv.next(),quantity.next(),awardNotice.next()}),$(".next").on("click",event=>{nature.previous(),award.previous(),needChestLv.previous(),quantity.previous(),awardNotice.previous()})})});