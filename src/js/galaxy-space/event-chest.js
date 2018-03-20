define(['jquery', 'popup'], ($, popup) => {
  require(['ajax'], ajax => {
    $(() => {
      ajax('GET', 'http://127.0.0.1:8080/chest/')
        .then(data => {
          let chests = data.content
          for (let index in chests) {
            let chest = chests[index]
            let chestId = chest.id
            let chestLevel = chest.level
            let chestStatus = chest.status
            let platformColor = chest.colorPlatform
            let platformTarget = $(`.platform-${platformColor}`)
            let countdownTarget = $(`.platform-${platformColor} .countdown`)
            let startBtnTarget = $(`.platform-${platformColor} .start-btn`)
            let upgradeBtnTarget = $(`.platform-${platformColor} .upgrade-btn`)
            let readyBtnTarget = $(`.platform-${platformColor} .ready-btn`)

            $(`.platform-${platformColor}`)
              .append(`<img class="chest${chestLevel}" title="chest${chestLevel}" src="./img/chest/chest${chestLevel}.png">`)
            $(`.platform-${platformColor} .start-btn`).css('display', '')
            $(`.platform-${platformColor} .upgrade-btn`).css('display', '')

            /* 啟動寶箱 */
            $(`.platform-${platformColor} .start-btn`).on('click', () => {
              popup.dialog('確定要啟動寶箱嗎？', '', () => {
                ajax('PUT', `http://localhost:8080/chest/status/${chestId}`, {
                  status: 'UNLOCKING'
                })
                  .then(() => {
                    require(['eventDetermine'], eventDetermine => {
                      eventDetermine(
                        chestStatus,
                        platformColor,
                        chestLevel,
                        chestId,
                        startBtnTarget,
                        upgradeBtnTarget,
                        platformTarget,
                        countdownTarget,
                        readyBtnTarget
                      )
                    })
                  })
              })
            })

            /* 升級寶箱 */
            $(`.platform-${platformColor} .upgrade-btn`).on('click', event => {
              popup.dialog('確定要升級寶箱嗎？', '', () => {
                ajax('GET', 'http://localhost:9090/currencyBank/totalAssets/one')
                  .then((data) => {
                    let totalCoins = data.content.coins
                    let totalGems = data.content.gems
                    let upLevel = chestLevel + 1
                    ajax('GET', `http://localhost:8080/chest/condition/level${upLevel}`)
                      .then((data) => {
                        let upChestLevelCoins = data.content.content.coins
                        let upChestLevelGems = data.content.content.gems
                        let levelUpData = {
                          level: upLevel
                        }
                        if (totalCoins - upChestLevelCoins >= 0 && totalGems - upChestLevelGems >= 0) {
                          ajax('PUT', `http://localhost:8080/chest/upgrade/${chestId}`, levelUpData)
                            .then((data) => {
                              $(`.platform-${platformColor} .chest${chestLevel}`).remove()
                              if (data.message.indexOf('success') >= 0) {
                                $(`.platform-${platformColor}`)
                                  .append(`<img class="chest${upLevel}" title="chest${upLevel}" src="./img/chest/chest${upLevel}.png">`)
                              }

                              if (data.message.indexOf('failure') >= 0) {
                                $(`.platform-${platformColor}`)
                                  .append(`<img class="chest${upLevel - 1}" title="chest${upLevel - 1}" src="./img/chest/chest${upLevel - 1}.png">`)
                              }

                              console.log(data)
                            })
                        } else if (totalCoins - upChestLevelCoins < 0 || totalGems - upChestLevelGems < 0) {
                          let nowCoins = totalCoins - upChestLevelCoins
                          let nowGems = totalGems - upChestLevelGems
                          console(nowCoins)
                          console(nowGems)
                        }
                      })
                  })
              })
            })
          }
        })
    })
  })
})