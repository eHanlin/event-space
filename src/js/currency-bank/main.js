require(['config'], function () {
  require(['jquery', 'bootstrap', 'bootstrapTable', 'bootstrapTableTw'], function ($) {
    require(['ajax'], (ajax) => {
      ajax('GET', 'http://localhost:9090/currencyBank/transaction')
        .then((jsonData) => {
          return jsonData.content
        })
        .then((transactions) => {

          $('#table').bootstrapTable({
            data: transactions,
            striped: true,
            pageSize: 10,
            pagination: true
          })

          $('section .fixed-table-container').css({border: 0})
        })
    })
  })
})