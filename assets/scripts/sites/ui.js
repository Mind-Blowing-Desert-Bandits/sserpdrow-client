'use strict'

const store = require('../store.js')
const showSitesTemplate = require('../templates/getSites.handlebars')

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
  console.log('selected site is ', store.site)
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
