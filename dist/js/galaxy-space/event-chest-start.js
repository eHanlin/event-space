define(["jquery","ajax","confirmPopup","eventStatusDo","w3"],($,ajax,confirmPopup,eventStatusDo,w3)=>(chest,targets)=>{let content,statusData={status:"UNLOCKING"};chest.level>=2&&(content=`\n      <div class="start-confirm-grid-container">\n          <div class="content-block1">\n            <span class="content-text1">寶箱準備啟動中...</span>\n          </div>\n\n          <div class="content-block2">\n            <span class="content-text2">目前寶箱等級為Lv${chest.level}，開啟這個寶箱可能獲得</span>\n          </div>\n\n          <div class="img-block-left-btn">\n            <img class="left-btn" src="./img/previous.png">\n          </div>\n\n          <div class="img-block-right-btn">\n            <img class="right-btn" src="./img/next.png">\n          </div>\n\n          <div class="content-block4">\n            <span class="content-text3">你確定要啟動這個寶箱嗎？</span>\n          </div>\n      </div>`),chest.level<2&&(content="\n      <div>\n          <h2>寶箱準備啟動中...</h2>\n          <h3>你確定要啟動這個寶箱嗎？</h3>\n      </div>\n      "),confirmPopup.dialog(content,()=>{ajax("PUT",`http://localhost:8080/chest/status/${chest.id}`,statusData).then(eventStatusDo.unLocking.bind(eventStatusDo.unLocking,chest,targets))},()=>{},()=>{ajax("GET",`http://127.0.0.1:8080/chest/condition/chest${chest.level}`).then(data=>{let chestMatchAwards,awards=data.content.content.awards,awardsImg1="",awardsImg2="",awardsImg3="",awardsImg4="",awardsImg5="",imgBlock1="",imgBlock2="",imgBlock3="",imgBlock4="",imgBlock5="";for(let awardIndex in awards)chestMatchAwards=awards[awardIndex],awardIndex<5?imgBlock1=`<div class="img-block-award block1">${awardsImg1+=`\n                  <img class="img-award${awardIndex}" src="./img/award/${chestMatchAwards}.png">`}</div>`:awardIndex>=5&&awardIndex<10?imgBlock2=`<div class="img-block-award block2">${awardsImg2+=`\n                  <img class="img-award${awardIndex}" src="./img/award/${chestMatchAwards}.png">`}</div>`:awardIndex>=10&&awardIndex<15?imgBlock3=`<div class="img-block-award block3">${awardsImg3+=`\n                  <img class="img-award${awardIndex}" src="./img/award/${chestMatchAwards}.png">`}</div>`:awardIndex>=15&&awardIndex<20?imgBlock4=`<div class="img-block-award block4">${awardsImg4+=`\n                  <img class="img-award${awardIndex}" src="./img/award/${chestMatchAwards}.png">`}</div>`:awardIndex>=20&&awardIndex<25&&(imgBlock5=`<div class="img-block-award block5">${awardsImg5+=`\n                  <img class="img-award${awardIndex}" src="./img/award/${chestMatchAwards}.png">`}</div>`);$(".img-block-left-btn").after(`${imgBlock1}${imgBlock2}${imgBlock3}${imgBlock4}${imgBlock5}`);let slide=w3.slideshow(".img-block-award",0);$(".right-btn").on("click",()=>{slide.next()}),$(".left-btn").on("click",()=>{slide.previous()})})})});