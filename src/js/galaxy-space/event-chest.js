define(['jquery', 'popup'], ($, popup) => {
  require(['ajax'], ajax => {
    $(() => {
      $('.start-btn').css('display', 'none')
      $('.upgrade-btn').css('display', 'none')
      $('.ready-btn').css('display', 'none')
      $('.open-now-btn').css('display', 'none')

      ajax('GET', 'http://127.0.0.1:8080/chest/')
        .then(data => {
          let chests = data.content
          for (let index in chests) {
            let chest = chests[index]
            let chestId = chest.id
            let chestLevel = chest.level
            let chestStatus = chest.status
            let platformColor = chest.colorPlatform

            $(`.platform-${platformColor}`)
              .append(`<img class="chest${chestLevel}" title="chest${chestLevel}" src="./img/chest/chest${chestLevel}.png">`)
            $(`.platform-${platformColor} .start-btn`).css('display', '')
            $(`.platform-${platformColor} .upgrade-btn`).css('display', '')

            /* 啟動寶箱 */
            $(`.platform-${platformColor} .start-btn`).on('click', () => {
              popup.dialog('確定要啟動寶箱嗎？', '', () => {
                ajax('GET', `http://localhost:8080/chest/coolDownTime/${chestId}`)
                  .then((data) => {
                    let countdownTarget = $(`.platform-${platformColor} .countdown`)
                    let chestImg = $(`.platform-${platformColor} .chest${chestLevel}`)
                    let seconds = data.content

                    $(`.platform-${platformColor} .start-btn`).css('display', 'none')
                    $(`.platform-${platformColor} .upgrade-btn`).css('display', 'none')
                    $(`.platform-${platformColor} .chest${chestLevel}`).css('filter', 'grayscale(100%)')
                    require(['eventCountdown'], eventCountdown => {
                      eventCountdown.countdownFunc(seconds, countdownTarget, chestImg)
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
