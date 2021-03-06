'use strict'

const store = require('../store.js')
const showSitesTemplate = require('../templates/getSites.handlebars')
const showSiteTemplate = require('../templates/getSite.handlebars')
const showPagesTemplate = require('../templates/showPage.handlebars')
const showPageSuccessTemplate = require('../templates/showPageSuccess.handlebars')
const showMySiteTemplate = require('../templates/mySite.handlebars')
const showBlogsTemplate = require('../templates/manageBlogs.handlebars')
const showMyPagesTemplate = require('../templates/managePages.handlebars')

const getSitesSuccess = function (sites) {
  store.sites = sites
  const showSites = showSitesTemplate({
    sites: sites.sites
  })
  $('#allSites').append(showSites)
  $('#siteTitle').text('SSERPDROW')
  $('#siteDescription').text('Welcome to SSERPDROW! To view our communities\' sites please click the \'View All Sites\' link above. To create your own site/blogs please sign-up or sign-in!')
}

const getUpdatedSiteSuccess = function (data) {
  const userSites = data.sites.filter((site) => {
    return site['_owner'] === store.user['_id']
  })
  store.site = userSites[0]
  if (userSites.length !== 0) {
    // Show the dashboard
    $('#userSignedOut').hide()
    $('#signedIn').show()
    $('#userDashboard').show()
    $('#dashboardLink').show()
  } else {
    // Have them create a site
    $('#userSignedOut').hide()
    $('#signedIn').show()
    $('#createASite').show()
  }
}

const getSitesFailure = function () {
  $('#allSites').text('Please try again')
}

const viewSiteSuccess = function (site) {
  store.site = site
  const showSite = showSiteTemplate({ blogs: site.site.blogposts })
  const showPages = showPagesTemplate({ pages: site.site.pages })
  $('#returnToSite').hide()
  $('#allSites').text('')
  $('#siteTitle').text(site.site.title)
  $('#siteDescription').text('')
  $('#siteDescription').text(site.site.description)
  $('#blogs').show()
  $('#allSites').append(showSite)
  $('#sitePages').text('')
  $('#sitePages').append(showPages)
}

const viewSiteFailure = function () {
  $('#allSites').text('Please try again')
}

const showPageSuccess = function () {
  $('#blogs').hide()
  $('#returnToSite').show()
  const page = store.page
  const showPage = showPageSuccessTemplate({ page: page })
  $('#allSites').text('')
  $('#allSites').append(showPage)
}

const showMyPageSuccess = function () {
  $('#blogs').hide()
  const page = store.myPage
  const showPage = showPageSuccessTemplate({ page: page })
  $('#myBlogs').text('')
  $('#myBlogs').append(showPage)
  $('#returnToMySite').show()
}

const createSiteSuccess = function (data) {
  store.site = data.site
  document.getElementById('create-a-site').reset()
  $('#createASiteMessage').text('')
  $('#dashboardLink').show()
  $('#createASite').hide()
  $('#userDashboard').show()
}

const createSiteFailure = function () {
  $('#createASiteMessage').text('Unexpected Error. Please try again.')
}

// const addBlogPostSuccess = function () {
//   document.getElementById('newBlogForm').reset()
//   $('#createABlogMessage').text('')
//   $('#newBlog').hide()
// }

const addBlogPostSuccess = function () {
  return new Promise((resolve, reject) => {
    document.getElementById('newBlogForm').reset()
    $('#createABlogMessage').text('')
    $('#newBlog').hide()
    resolve()
  })
}

const addBlogPostFailure = function () {
  $('#createABlogMessage').text('Unexpected Error. Please try again.')
}

// const addPageSuccess = function () {
//   document.getElementById('newPageForm').reset()
//   // hiding the form and bringing back updated blogs page
//   $('#newPage').hide()
// }

const addPageSuccess = function () {
  return new Promise((resolve, reject) => {
    document.getElementById('newPageForm').reset()
    // hiding the form and bringing back updated blogs page
    $('#newPage').hide()
    $('#createAPageMessage').text('')
    resolve()
  })
}

const addPageFailure = function () {
  $('#createAPageMessage').text('Unexpected Error. Please try again.')
}

const showMySiteSuccess = function (data) {
  store.mySite = data
  const site = store.mySite
  const pages = site.site.pages
  const blogs = site.site.blogposts
  const mySite = showMySiteTemplate({ site: site })
  const myPages = showPagesTemplate({ pages: pages })
  const myBlogs = showSiteTemplate({ blogs: blogs })
  $('#returnToMySite').hide()
  $('#userDashboard').hide()
  $('#newBlog').hide()
  $('#newPage').hide()
  $('#createASite').hide()
  $('#mySiteHeader').text('')
  $('#mySite').show()
  $('#mySiteHeader').show()
  $('#mySiteHeader').append(mySite)
  $('#myPages').show()
  $('#myBlogs').show()
  $('#myPages').text('')
  $('#myPages').append(myPages)
  $('#myBlogs').text('')
  $('#myBlogs').append(myBlogs)
}

// const editPageSuccess = function () {
//   document.getElementById('editPageForm').reset()
//   // hiding the form and bringing back updated blogs page
//   $('#editPageSection').hide()
// }

const editPageSuccess = function () {
  return new Promise((resolve, reject) => {
    document.getElementById('editPageForm').reset()
    // hiding the form and bringing back updated blogs page
    $('#editPageSection').hide()
    $('#edit-page-message').text('')
    resolve()
  })
}

const editPageFailure = function () {
  $('#edit-page-message').text('Unexpected Error. Please try again.')
}

// const editBlogPostSuccess = function () {
//   document.getElementById('editBlogForm').reset()
//   // hiding the form and bringing back updated blogs page
//   $('#editABlogMessage').text('')
//   $('#editBlogSection').hide()
// }

const editBlogPostSuccess = function () {
  return new Promise((resolve, reject) => {
    document.getElementById('editBlogForm').reset()
    // hiding the form and bringing back updated blogs page
    $('#editABlogMessage').text('')
    $('#editBlogSection').hide()
    resolve()
  })
}

const editBlogPostFailure = function () {
  $('#editABlogMessage').text('Unexpected Error. Please try again.')
}

const manageBlog = function () {
  const showBlogs = showBlogsTemplate({
    blogs: store.site.blogposts
  })
  $('#mBlog').html(showBlogs)
  $('#mbTitle').text(store.site.title)
  $('#mbDescription').text(store.site.description)
}

// const updateLocalSiteVar = function (data) {
//   store.site = data.site
// }

const updateLocalSiteVar = function (data) {
  return new Promise((resolve, reject) => {
    store.site = data.site
    resolve()
  })
}

// const updateLocalSitePageVar = function (data) {
//   const userSites = data.sites.filter((site) => {
//     return site['_owner'] === store.user['_id']
//   })
//   store.site = userSites[0]
// }

const updateLocalSitePageVar = function (data) {
  return new Promise((resolve, reject) => {
    const userSites = data.sites.filter((site) => {
      return site['_owner'] === store.user['_id']
    })
    store.site = userSites[0]
    resolve()
  })
}

const deleteBlogPostSuccess = function () {
  $('#deleteModal').modal('hide')
  $('#deleteABlogMessage').text('')
}
const deleteBlogPostFailure = function () {
  $('#deleteABlogMessage').text('Unexpected Error. Please try again.')
}

const editSiteSuccess = function (data) {
  document.getElementById('editSiteForm').reset()
  store.site = data.site
  $('#edit-site-failure').text('')
  $('#editASite').hide()
  $('#userDashboard').show()
}

const editSiteFailure = function () {
  $('#edit-site-failure').text('Unexpected Error. Please try again.')
}

const deleteSiteSuccess = function () {
  store.site = null
  $('#deleteSiteModal').modal('hide')
  $('#userDashboard').hide()
  $('#dashboardLink').hide()
  $('#createASite').show()
  $('#delete-site-failure').text('')
}

const deleteSiteFailure = function () {
  $('#delete-site-failure').text('Unexpected Error. Please try again.')
}

const managePages = function () {
  const showMyPages = showMyPagesTemplate({ pages: store.site.pages })
  $('#mPage').html(showMyPages)
  $('#pageTitle').text(store.site.title)
  $('#pageDescription').text(store.site.description)
}

const deletePageSuccess = function () {
  $('#deletePageModal').modal('hide')
  $('#delete-page-failure').text('')
}

const deletePageFailure = function () {
  $('#delete-page-failure').text('Unexpected Error. Please try again.')
}

module.exports = {
  getSitesSuccess,
  getSitesFailure,
  viewSiteSuccess,
  viewSiteFailure,
  showPageSuccess,
  createSiteSuccess,
  createSiteFailure,
  getUpdatedSiteSuccess,
  addBlogPostSuccess,
  addBlogPostFailure,
  showMySiteSuccess,
  showMyPageSuccess,
  manageBlog,
  updateLocalSiteVar,
  editBlogPostSuccess,
  editSiteSuccess,
  deleteSiteSuccess,
  editBlogPostFailure,
  editPageSuccess,
  deleteBlogPostSuccess,
  deleteBlogPostFailure,
  managePages,
  addPageSuccess,
  deletePageSuccess,
  updateLocalSitePageVar,
  editSiteFailure,
  deleteSiteFailure,
  editPageFailure,
  deletePageFailure,
  addPageFailure
}
