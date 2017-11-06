'use strict'

const store = require('../store.js')
const showSitesTemplate = require('../templates/getSites.handlebars')

const getSitesSuccess = function (sites) {
  store.sites = sites
  const showSites = showSitesTemplate({ sites: sites.sites })
  $('#allSites').append(showSites)
}

const getSitesFailure = function () {
  console.log('this has failed')
}

module.exports = {
  getSitesSuccess,
  getSitesFailure
}
