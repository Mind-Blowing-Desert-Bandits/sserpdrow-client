'use strict'

const store = require('../store.js')
const showSitesTemplate = require('../templates/getSites.handlebars')
const showSiteTemplate = require('../templates/getSite.handlebars')

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
  console.log('site.site is ', site.site.blogposts)
  const showSite = showSiteTemplate({ blogs: site.site.blogposts })
  $('#allSites').text('')
  $('#allSites').append(showSite)
}

const viewSiteFailure = function () {
  $('#allSites').text('Please try again')
}

module.exports = {
  getSitesSuccess,
  getSitesFailure,
  viewSiteSuccess,
  viewSiteFailure
}
