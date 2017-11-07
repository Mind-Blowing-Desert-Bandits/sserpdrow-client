'use strict'

const store = require('../store.js')
const showSitesTemplate = require('../templates/getSites.handlebars')
const showSiteTemplate = require('../templates/getSite.handlebars')
const showPagesTemplate = require('../templates/showPage.handlebars')
const showPageSuccessTemplate = require('../templates/showPageSuccess.handlebars')
const showMySiteTemplate = require('../templates/mySite.handlebars')
const showBlogsTemplate = require('../templates/manageBlogs.handlebars')

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
  console.log('store.site is', store.site)
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
const getUpdatedSiteFailure = function (data) {
}

const getSitesFailure = function () {
  $('#allSites').text('Please try again')
}

const viewSiteSuccess = function (site) {
  store.site = site
  const showSite = showSiteTemplate({ blogs: site.site.blogposts })
  const showPages = showPagesTemplate({ pages: site.site.pages })
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

const showPageFailure = function () {
  console.log('it failed')
}

const createSiteSuccess = function (data) {
  store.site = data.site
  console.log(store.site)
  $('#createASite').hide()
  $('#userDashboard').show()
}

const createSiteFailure = function () {
  console.log('failure')
}

const addBlogPostSuccess = function () {
  console.log('ui success')
  document.getElementById('newBlogForm').reset()
  // hiding the form and bringing back updated blogs page
  $('#newBlog').hide()
}

const showMySiteSuccess = function (data) {
  store.mySite = data
  const site = store.mySite
  const pages = site.site.pages
  const blogs = site.site.blogposts
  const mySite = showMySiteTemplate({ site: site })
  const myPages = showPagesTemplate({ pages: pages })
  const myBlogs = showSiteTemplate({ blogs: blogs })
  console.log('site is ', site.site.blogposts)
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

const editBlogPostSuccess = function () {
  console.log('ui success')
  document.getElementById('editBlogForm').reset()
  // hiding the form and bringing back updated blogs page
  $('#editBlogSection').hide()
}

const manageBlog = function () {
  const showBlogs = showBlogsTemplate({
    blogs: store.site.blogposts
  })
  $('#mBlog').html(showBlogs)
  $('#mbTitle').text(store.site.title)
  $('#mbDescription').text(store.site.description)
  console.log(store.site)
  console.log(store.site.blogposts)
}

const updateLocalSiteVar = function (data) {
  const userSites = data.sites.filter((site) => {
    return site['_owner'] === store.user['_id']
  })
  store.site = userSites[0]
}

const deleteBlogPostSuccess = function () {
  $('#deleteModal').modal('hide')
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
  showMySiteSuccess,
  showMyPageSuccess,
  manageBlog,
  updateLocalSiteVar,
  editBlogPostSuccess,
  deleteBlogPostSuccess
}
