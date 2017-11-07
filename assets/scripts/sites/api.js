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
    url: config.apiOrigin + '/sites' + '/5a00b075a647f53fc0d6cd8a',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'site': data
    }
  })
}

const getMySite = function () {
  return $.ajax({
    url: config.apiOrigin + '/sites' + '/5a00b075a647f53fc0d6cd8a',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getSites,
  getSite,
  createSite,
  addBlogPost,
  getMySite
}
