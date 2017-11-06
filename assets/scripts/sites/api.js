'use strict'

const config = require('../config.js')
const store = require('../store')

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

const createSite = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sites',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

module.exports = {
  getSites,
  getSite,
  createSite
}
