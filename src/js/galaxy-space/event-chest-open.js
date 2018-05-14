define(['jquery', 'ajax', 'confirmPopup', 'eventChestInspection', 'eventAwardsAreZero'],
  ($, ajax, confirmPopup, eventChestInspection, eventAwardsAreZero) => {
    return (chest, targets) => {
      ajax('POST', `/chest/open/${chest.id}`)
        .then((jsonData) => {
          let jsonContent = jsonData.content
          let finalCoins = jsonContent.finalCoins
          let finalGems = jsonContent.finalGems

          /* 獲得禮物內容 */
          let gainCoins = jsonContent.coins ? jsonContent.coins : 0
          let gainGems = jsonContent.gems ? jsonContent.gems : 0
          let gainAwardId = jsonContent.gainAwardId
          let gainAward = jsonContent.gainAward

          let luckyBag = jsonContent.luckyBag
          let awardImg = '', awardTitle = '', openLuckyBagBtn = ''
          let content, openTextBlock3 = '', openTextBlock4 = ''

          if (eventChestInspection(jsonData.message, jsonData.content)) {
            return
          } else if (eventAwardsAreZero(jsonData.message, jsonData.content)) {
            return
          }

          if (gainAwardId) {
            awardTitle = `<span class="gif-title">${gainAward}</span>`
            awardImg = `<img class="your-award-gif" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${gainAwardId}.png">`
            openTextBlock3 = `
            <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
            <span>${gainCoins}</span>
            <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
            <span>${gainGems}</span>
          `
            openTextBlock4 = awardImg
          } else {
            openTextBlock4 = `
            <img class="coins-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
            <span class="coins-lg">${gainCoins}</span>
            <br/>
            <img class="gems-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
            <span class="gems-lg">${gainGems}</span>
          `
          }

          content = `
          <div class="open-confirm-grid-container">
            <div class="open-text-block1">
              <img class="open-gif-chest" src="https://d220xxmclrx033.cloudfront.net/event-space/img/chest/open/openChest${chest.level}.gif">
            </div>
            <div class="open-text-block2">恭喜你獲得了
              <span class="gif-title">${awardTitle}</span>
            </div>
            <div class="open-text-block3">
              ${openTextBlock3}
            </div>
            <div class="open-text-block4">
              ${openTextBlock4}
            </div>
          </div>
        `

          let afterOpen = (finalCoins, finalGems) => {
            require(['eventCountUp'], (eventCountUp) => {
              targets.readyBtn.css('display', 'none')
              targets.platformChest.remove()
              eventCountUp('coins', parseInt($('#coins').text()), finalCoins)
              eventCountUp('gems', parseInt($('#gems').text()), finalGems)
            })
          }

          if (gainAwardId && luckyBag === false) {
            confirmPopup.dialog(content,
              /* 導頁至領取㽪品 */
              () => {
                afterOpen(finalCoins, finalGems)
                window.open('https://test.ehanlin.com.tw/Events/winner_info.html?id=space', 'winner_info')
              },
              /* confirmFn */
              afterOpen.bind(afterOpen, finalCoins, finalGems),
              /* onOpenFn */
              () => {},
              '回填領獎', '我瞭解了')
          } else {
            if (luckyBag === true) {
              openLuckyBagBtn = '打開福袋'
            }

            confirmPopup.ok('', content, () => {
              /* 福袋內容 */
              if (luckyBag === true) {
                ajax(
                  'POST', `/chest/award/luckyBag/${chest.id}`, {
                    awardId: gainAwardId,
                    chestId: chest.id,
                    level: chest.level
                  })
                  .then((jsonData) => {
                    let jsonContent = jsonData.content
                    let gainCoins, gainGems, finalCoins, finalGems, title

                    if (jsonData.message === 'Lucky bag is already opened') {
                      confirmPopup.ok('Oooooops！', '福袋已經開啟過囉！')
                      return
                    }

                    gainCoins = jsonContent.coins
                    gainGems = jsonContent.gems
                    finalCoins = jsonContent.finalCoins
                    finalGems = jsonContent.finalGems
                    title = `
                    <div class="lucky-bag">
                      <span>福袋打開囉，得到 </span>
                      <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
                      <span>${gainCoins}</span>
                      <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
                      <span>${gainGems}</span>
                    </div>
                  `
                    let bagImage = `<img class="confirm-popup-lucky-bag" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${gainAwardId}.png">`

                    confirmPopup.image(title, bagImage, afterOpen.bind(afterOpen, finalCoins, finalGems))
                  })
              } else {
                afterOpen(finalCoins, finalGems)
              }
            }, openLuckyBagBtn)
          }
        })
    }
  })
