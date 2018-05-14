define(['jquery', 'confirmPopup'], ($, confirmPopup) => {
  return (message, checkResult) => {
    let isAbnormally = false
    if (message === 'Chest operate abnormally by user') {
      isAbnormally = true
      confirmPopup.ok('Oooooops！', checkResult, () => {window.location.reload()})
    }
    return isAbnormally
  }
})
