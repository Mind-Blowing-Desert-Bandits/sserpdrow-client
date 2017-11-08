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
  } else {
    // Have them create a site
    $('#userSignedOut').hide()
    $('#signedIn').show()
    $('#createASite').show()
  }
}
const getUpdatedSiteFailure = function (error) {
  console.error(error)
}

const getSitesFailure = function (error) {
  console.error(error)
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

const viewSiteFailure = function (error) {
  console.error(error)
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
}

const showPageFailure = function (error) {
  console.error(error)
}

const createSiteSuccess = function (data) {
  store.site = data.site
  console.log(store.site)
  document.getElementById('create-a-site').reset()
  $('#createASiteMessage').text('')
  $('#createASite').hide()
  $('#userDashboard').show()
}

const createSiteFailure = function (error) {
  $('#createASiteMessage').text('Unexpected Error. Please try again.')
  console.error(error)
}

const addBlogPostSuccess = function () {
  document.getElementById('newBlogForm').reset()
  $('#createABlogMessage').text('')
  // hiding the form and bringing back updated blogs page
  $('#newBlog').hide()
}

const addBlogPostFailure = function (error) {
  console.error(error)
  $('#createABlogMessage').text('Unexpected Error. Please try again.')
}

const addPageSuccess = function () {
  document.getElementById('newPageForm').reset()
  // hiding the form and bringing back updated blogs page
  $('#newPage').hide()
}

const showMySiteSuccess = function (data) {
  store.mySite = data
  const site = store.mySite
  const pages = site.site.pages
  const blogs = site.site.blogposts
  const mySite = showMySiteTemplate({ site: site })
  const myPages = showPagesTemplate({ pages: pages })
  const myBlogs = showSiteTemplate({ blogs: blogs })
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

const editPageSuccess = function () {
  console.log('ui success')
  document.getElementById('editPageForm').reset()
  // hiding the form and bringing back updated blogs page
  $('#editPageSection').hide()
}

const editBlogPostSuccess = function () {
  document.getElementById('editBlogForm').reset()
  // hiding the form and bringing back updated blogs page
  $('#editABlogMessage').text('')
  $('#editBlogSection').hide()
}

const editBlogPostFailure = function (error) {
  console.error(error)
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

const updateLocalSiteVar = function (data) {
  store.site = data.site
}

const updateLocalSitePageVar = function (data) {
  const userSites = data.sites.filter((site) => {
    return site['_owner'] === store.user['_id']
  })
  store.site = userSites[0]
}

const deleteBlogPostSuccess = function () {
  $('#deleteModal').modal('hide')
  $('#deleteABlogMessage').text('')
}
const deleteBlogPostFailure = function (error) {
  console.error(error)
  $('#deleteABlogMessage').text('Unexpected Error. Please try again.')
}

const editSiteSuccess = function (data) {
  document.getElementById('editSiteForm').reset()
  store.site = data.site
  $('#editASite').hide()
  $('#userDashboard').show()
}

const deleteSiteSuccess = function () {
  store.site = null
  $('#deleteSiteModal').modal('hide')
  $('#userDashboard').hide()
  $('#createASite').show()
}

const managePages = function () {
  const showMyPages = showMyPagesTemplate({ pages: store.site.pages })
  console.log('stored pages are ', store.site.pages)
  $('#mPage').html(showMyPages)
  $('#pageTitle').text(store.site.title)
  $('#pageDescription').text(store.site.description)
}

const deletePageSuccess = function () {
  $('#deletePageModal').modal('hide')
}

module.exports = {
  getSitesSuccess,
  getSitesFailure,
  viewSiteSuccess,
  viewSiteFailure,
  showPageSuccess,
  showPageFailure,
  createSiteSuccess,
  createSiteFailure,
  getUpdatedSiteSuccess,
  getUpdatedSiteFailure,
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
  updateLocalSitePageVar
}
