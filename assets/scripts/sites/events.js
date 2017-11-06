'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
// const store = require('../store')

const onGetSites = function (event) {
  event.preventDefault()
  api.getSites()
    .then(ui.getSitesSuccess)
    .catch(ui.getSitesFailure)
}

const siteHandlers = function () {
  $('#get-sites').on('click', onGetSites)
}

module.exports = {
  siteHandlers
}
