'use strict'

const store = require('../store.js')
const showSitesTemplate = require('../templates/getSites.handlebars')
const showSiteTemplate = require('../templates/getSite.handlebars')
const showPagesTemplate = require('../templates/showPage.handlebars')

const getSitesSuccess = function (sites) {
  store.sites = sites
  const showSites = showSitesTemplate({ sites: sites.sites })
  $('#allSites').append(showSites)
  $('#siteTitle').text('SSERPDROW')
  $('#siteDescription').text('Welcome to SSERPDROW! To view our communities sites please click the button below. To create your own site/blogs please sign-up or sign-in!')
}

const getUpdatedSiteSuccess = function (data) {
  const userSites = data.sites.filter((site) => { return site['_owner'] === store.user['_id'] })
  if (userSites.length !== 0) {
    // Show the dashboard
    $('#userSignedOut').hide()
    $('#signedIn').show()
    $('#userDashboard').show()
  } else {
    // Have them create a site
    $('#userSignedOut').hide()
    $('#signedIn').show()
    $('#createASite').show()
  }
}
const getUpdatedSiteFailure = function (data) {

}

const getSitesFailure = function () {
  $('#allSites').text('Please try again')
}

const viewSiteSuccess = function (site) {
  store.site = site
  const showSite = showSiteTemplate({ blogs: site.site.blogposts })
  const showPages = showPagesTemplate({ pages: site.site.pages })
  $('#allSites').text('')
  $('#siteTitle').text(site.site.title)
  $('#siteDescription').text('')
  $('#siteDescription').text(site.site.description)
  $('#blogs').show()
  $('#allSites').append(showSite)
  $('#sitePages').text('')
  $('#sitePages').append(showPages)
}

const viewSiteFailure = function () {
  $('#allSites').text('Please try again')
}

const showPageSuccess = function () {
  console.log(store.page.title)
}

const showPageFailure = function () {
  console.log('it failed')
}

const createSiteSuccess = function (site) {
  store.site = site
  console.log(store.site)
  $('#createASite').hide()
  $('#userDashboard').show()
}

const createSiteFailure = function () {
  console.log('failure')
}

const addBlogPostSuccess = function () {
  console.log('ui success')
  document.getElementById('newBlogForm').reset()
}

module.exports = {
  getSitesSuccess,
  getSitesFailure,
  viewSiteSuccess,
  viewSiteFailure,
  showPageSuccess,
  showPageFailure,
  createSiteSuccess,
  createSiteFailure,
  getUpdatedSiteSuccess,
  getUpdatedSiteFailure,
  addBlogPostSuccess
}
