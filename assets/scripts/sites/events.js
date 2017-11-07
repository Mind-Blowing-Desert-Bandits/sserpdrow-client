'use strict'

const getFormFields = require('../../../lib/get-form-fields')
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
    .then(function () {
      $('.show-pages').on('click', viewPage)
    })
    .catch(ui.viewSiteFailure)
}
const createSite = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createSite(data)
    .then(ui.createSiteSuccess)
    .catch(ui.createSiteFailure)
}
const viewPage = function (event) {
  event.preventDefault()
  const page = event.target
  const pageId = page.parentNode
  const pageParent = pageId.parentNode
  console.log(pageParent)
  const thisID = pageParent.getAttribute('data-id')
  console.log('id is ', thisID)
}

const getUpdatedSiteByUser = function () {
  api.getSites()
    .then(ui.getUpdatedSiteSuccess)
    .catch(ui.getSitesFailure)
}

const siteHandlers = function () {
  $('#get-sites').on('click', onGetSites)
  $('#create-a-site').on('submit', createSite)
}

module.exports = {
  siteHandlers,
  getUpdatedSiteByUser
}
