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

const addBlogPost = function (data) {
  console.log('api data is', data)
  return $.ajax({
    url: config.apiOrigin + '/sites' + '/5a011d0ae684f396aea942ff',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'site': data
    }
  })
}

module.exports = {
  getSites,
  getSite,
  createSite,
  addBlogPost
}
