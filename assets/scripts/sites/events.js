'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')

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
  const siteId = site.parentNode.parentNode
  console.log('this is site id ', siteId)
  const thisSiteID = siteId.getAttribute('data-id')
  api.getSite(thisSiteID)
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
  const thisID = pageParent.getAttribute('data-id')
  for (let i = 0; i < store.site.site.pages.length; i++) {
    if (store.site.site.pages[i].id === thisID) {
      store.page = store.site.site.pages[i]
    }
  }
  ui.showPageSuccess()
}

const newBlogPost = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  console.log(store.site)
  api.addBlogPost(data)
    .then(ui.addBlogPostSuccess)
    .catch(console.error)
    .then(console.log)
}

const newPage = function (event) {
  event.preventDefault()
  console.log(this)
  const data = getFormFields(this)
  console.log(data)
}

const getUpdatedSiteByUser = function () {
  api.getSites()
    .then(ui.getUpdatedSiteSuccess)
    .catch(ui.getSitesFailure)
}

const showMySite = function (event) {
  event.preventDefault()
  api.getMySite()
    .then(ui.showMySiteSuccess)
    .then(function () {
      $('#myPages').on('click', viewMyPage)
    })
    .catch(ui.showMySiteFailure)
}

const viewMyPage = function (event) {
  event.preventDefault()
  const page = event.target
  const pageId = page.parentNode
  const pageParent = pageId.parentNode
  const thisID = pageParent.getAttribute('data-id')
  console.log('page id is ', thisID)
  for (let i = 0; i < store.mySite.site.pages.length; i++) {
    if (store.mySite.site.pages[i].id === thisID) {
      store.myPage = store.mySite.site.pages[i]
    }
  }
  ui.showMyPageSuccess()
}

const siteHandlers = function () {
  $('#get-sites').on('click', onGetSites)
  $('#create-a-site').on('submit', createSite)
  $('#newBlogForm').on('submit', newBlogPost)
  $('#newPageForm').on('submit', newPage)
  $('#showSite').on('click', showMySite)
}

module.exports = {
  siteHandlers,
  getUpdatedSiteByUser,
  newBlogPost
}
