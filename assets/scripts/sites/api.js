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
  console.log('thisID', thisID)
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

const deleteBlogPost = function (data) {
  const updatedata = {
    'site': {
      'blogID': data
    }
  }
  console.log('api data is', data)
  return $.ajax({
    url: config.apiOrigin + '/deleteblogpost',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: updatedata
  })
}

const addPage = function (data) {
  const updatedata = {
    'site': {
      'pages': data
    }
  }
  return $.ajax({
    url: config.apiOrigin + '/sites/' + store.site.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: updatedata
  })
}

const deletePageAPI = function (data) {
  const updatedata = {
    'site': {
      'pageID': data
    }
  }
  console.log('api data is', updatedata)
  return $.ajax({
    url: config.apiOrigin + '/deletepage',
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

const deleteSite = function () {
  return $.ajax({
    url: config.apiOrigin + '/sites/' + store.site.id,
    method: 'DELETE',
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
  getMySite,
  editSite,
  deleteSite,
  addPage,
  deleteBlogPost,
  deletePageAPI
}
