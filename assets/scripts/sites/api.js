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
  const updatedata = {
    'site': {
      'blogposts': data
    }
  }

  console.log('api data is', data)
  return $.ajax({
    url: config.apiOrigin + '/sites/' + store.site.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: updatedata
  })
}

const getMySite = function () {
  return $.ajax({
    url: config.apiOrigin + '/sites/' + store.site.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const editSite = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sites/' + store.site.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  getSites,
  getSite,
  createSite,
  addBlogPost,
  getMySite,
  editSite
}
