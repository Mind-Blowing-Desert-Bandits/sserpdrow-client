'use strict'

const store = require('../store.js')
const showSitesTemplate = require('../templates/getSites.handlebars')
const showSiteTemplate = require('../templates/getSite.handlebars')
const showPagesTemplate = require('../templates/showPage.handlebars')

const getSitesSuccess = function (sites) {
  store.sites = sites
  const showSites = showSitesTemplate({ sites: sites.sites })
  $('#allSites').append(showSites)
}

const getSitesFailure = function () {
  $('#allSites').text('Please try again')
}

const viewSiteSuccess = function (site) {
  store.site = site
  const showSite = showSiteTemplate({ blogs: site.site.blogposts })
  console.log('this is a site title ', site.site.pages)
  const showPages = showPagesTemplate({ pages: site.site.pages })
  $('#allSites').text('')
  $('#siteTitle').text(site.site.title)
  $('#blogs').show()
  $('#allSites').append(showSite)
  $('#sitePages').text('')
  $('#sitePages').append(showPages)
}

const viewSiteFailure = function () {
  $('#allSites').text('Please try again')
}

const createSiteSuccess = function (site) {
  store.site = site
  console.log(store.site)
}

const createSiteFailure = function () {
  console.log('failure')
}

module.exports = {
  getSitesSuccess,
  getSitesFailure,
  viewSiteSuccess,
  viewSiteFailure,
  createSiteSuccess,
  createSiteFailure
}
