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
  const newBlog = {
    title: data.blogposts.title,
    textcontent: data.blogposts.textcontent
  }
  store.site.blogposts.push(newBlog)
  console.log(store.site.blogposts)
  console.log(store.site)
  api.addBlogPost(store.site.blogposts)
    .then(ui.addBlogPostSuccess)
    .then(api.getSites)
    .then(ui.updateLocalSiteVar)
    .catch(console.error)
    .then(manageBlog)
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

const manageBlog = function () {
  console.log('mange blog worked')
  // Hide dashboard
  $('#userDashboard').hide()
  ui.manageBlog()
  $('#manageBlogSection').show()
  // Take information from site and use handlebars to create page that displays the blogs similar to when logged out with crud buttons
}

const showCreateBlogForm = function () {
  $('#newBlog').show()
  $('#manageBlogSection').hide()
}

const cancelNewBlog = function () {
  $('#newBlog').hide()
  $('#manageBlogSection').show()
  document.getElementById('newBlogForm').reset()
}

const siteHandlers = function () {
  $('#get-sites').on('click', onGetSites)
  $('#create-a-site').on('submit', createSite)
  $('#newBlogForm').on('submit', newBlogPost)
  $('#newPageForm').on('submit', newPage)
  $('#showSite').on('click', showMySite)
  $('#manageBlog').on('click', manageBlog)
  $('#createBlogButton').on('click', showCreateBlogForm)
  $('#cancelNewBlogButton').on('click', cancelNewBlog)
}

module.exports = {
  siteHandlers,
  getUpdatedSiteByUser,
  newBlogPost
}
