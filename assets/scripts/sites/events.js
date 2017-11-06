'use strict'

// const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
// const store = require('../store')

const onGetSites = function (event) {
  event.preventDefault()
  $('#allSites').text('')
  $('#blogs').hide()
  $('#sitePages').text('')
  api.getSites()
    .then(ui.getSitesSuccess)
    .then(function () {
      $('.view').on('click', viewSite)
    })
    .catch(ui.getSitesFailure)
}

const viewSite = function (event) {
  event.preventDefault()
  const site = event.target
  const siteId = site.parentNode
  const siteParent = siteId.parentNode
  const thisID = siteParent.getAttribute('data-id')
  api.getSite(thisID)
    .then(ui.viewSiteSuccess)
    .catch(ui.viewSiteFailure)
}

const siteHandlers = function () {
  $('#get-sites').on('click', onGetSites)
}

module.exports = {
  siteHandlers
}
