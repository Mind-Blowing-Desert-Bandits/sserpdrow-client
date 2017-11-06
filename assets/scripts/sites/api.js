'use strict'

const config = require('../config.js')
// const store = require('../store')

const getSites = function () {
  return $.ajax({
    url: config.apiOrigin + '/sites',
    method: 'GET'
  })
}

const getSite = function (thisID) {
  return $.ajax({
    url: config.apiOrigin + '/sites/' + thisID
  })
}

module.exports = {
  getSites,
  getSite
}
