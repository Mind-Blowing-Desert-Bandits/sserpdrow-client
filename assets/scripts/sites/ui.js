'use strict'

const store = require('../store.js')

const getSitesSuccess = function (sites) {
  store.sites = sites
  console.log('store.sites is ', store.sites)
}

const getSitesFailure = function () {
  console.log('this has failed')
}

module.exports = {
  getSitesSuccess,
  getSitesFailure
}
