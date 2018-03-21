define(['jquery', 'ajax', 'eventStatusDo'], ($, ajax, eventStatusDo) => {
  return (chest, targets) => {
    let statusData = {
      status: 'READY'
    }
    ajax('PUT', `http://localhost:8080/chest/status/${chest.id}`, statusData)
      .then(eventStatusDo.ready.bind(eventStatusDo.ready, chest, targets))
  }
})