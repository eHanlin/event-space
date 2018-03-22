define(['jquery', 'ajax', 'popup', 'eventStatusDo'], ($, ajax, popup, eventStatusDo) => {
  return (chest, targets) => {
    let seconds
    ajax('GET', `http://localhost:8080/chest/coolDownTime/${chest.id}`)
      .then(data => {
        seconds = data.content

        console.log(seconds)
        return ajax('GET', `http://localhost:8080/chest/condition/openImmediately`)
      }).then(data => {
        let openImmediatelyData = data.content
        let consume = openImmediatelyData['content']
        let everySecondsHour = 3600
        let remainHours = Math.ceil(seconds / everySecondsHour)
        let deductGems = remainHours * consume.everyHourDeductGems

        popup.dialog(`立即開啟寶箱需花費${deductGems}個寶石`, `確定要立即開啟寶箱嗎？`, () => {
          ajax('PUT', `http://localhost:8080/chest/open/immediately/${chest.id}`, {
            deductGems: deductGems
          }).then(data => {
            let originalGems = $('#gems').text()
            let finalGems = data.content.finalGems
            let insufficientGems = originalGems - deductGems
            let statusData = {
              status: 'OPEN'
            }

            console.log('originalGems: ' + originalGems)
            console.log('finalGems: ' + finalGems)
            console.log(insufficientGems)

            if (insufficientGems < 0) {
              popup.confirm(`你的寶石不足${insufficientGems * -1}個`, `欠一屁股債了~ 快做題吧 !`, () => {})
              return false
            }

            ajax('PUT', `http://localhost:8080/chest/status/${chest.id}`, statusData)
              .then(eventStatusDo.open.bind(eventStatusDo.open, chest, targets))

            require(['eventCountUp'], eventCountUp => {
              eventCountUp('gems', originalGems, finalGems)
            })
          })
        })
      })
  }
})
