'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')

const promiseGetSite = function () {
  return api.getSite(store.site.id)
}

const onGetSites = function (event) {
  event.preventDefault()
  $('#allSites').text('')
  $('#blogs').hide()
  $('#sitePages').text('')
  api.getSites()
    .then(ui.getSitesSuccess)
    .then(function () {
      $('.view').on('click', viewSite)
    })
    .catch(ui.getSitesFailure)
}

const viewSite = function (event) {
  event.preventDefault()
  const site = event.target
  const siteId = site.parentNode.parentNode
  const thisSiteID = siteId.getAttribute('data-id')
  api.getSite(thisSiteID)
    .then(ui.viewSiteSuccess)
    .then(function () {
      $('.show-pages').on('click', viewPage)
    })
    .catch(ui.viewSiteFailure)
}

const createSite = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createSite(data)
    .then(ui.createSiteSuccess)
    .catch(ui.createSiteFailure)
}

const viewPage = function (event) {
  event.preventDefault()
  const page = event.target
  const pageId = page.parentNode
  const pageParent = pageId.parentNode
  const thisID = pageParent.getAttribute('data-id')
  for (let i = 0; i < store.site.site.pages.length; i++) {
    if (store.site.site.pages[i].id === thisID) {
      store.page = store.site.site.pages[i]
    }
  }
  ui.showPageSuccess()
}

const newBlogPost = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  const newBlog = {
    title: data.blogposts.title,
    textcontent: data.blogposts.textcontent
  }
  store.site.blogposts.push(newBlog)
  api.addBlogPost(store.site.blogposts)
    .then(ui.addBlogPostSuccess)
    .catch(ui.addBlogPostFailure)
    .then(promiseGetSite)
    .catch(ui.addBlogPostFailure)
    .then(ui.updateLocalSiteVar)
    .catch(console.error)
    .then(manageBlog)
}

const newPage = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  const newPageObject = {
    type: data.pages.type,
    title: data.pages.title,
    textcontent: data.pages.textcontent
  }
  store.site.pages.push(newPageObject)
  api.addPage(store.site.pages)
    .then(ui.addPageSuccess)
}

const getUpdatedSiteByUser = function () {
  api.getSites()
    .then(ui.getUpdatedSiteSuccess)
    .catch(ui.getSitesFailure)
}

const showMySite = function (event) {
  event.preventDefault()
  api.getMySite()
    .then(ui.showMySiteSuccess)
    .then(function () {
      $('#myPages').on('click', viewMyPage)
    })
    .catch(ui.showMySiteFailure)
}

const viewMyPage = function (event) {
  event.preventDefault()
  const page = event.target
  const pageId = page.parentNode
  const pageParent = pageId.parentNode
  const thisID = pageParent.getAttribute('data-id')
  for (let i = 0; i < store.mySite.site.pages.length; i++) {
    if (store.mySite.site.pages[i].id === thisID) {
      store.myPage = store.mySite.site.pages[i]
    }
  }
  ui.showMyPageSuccess()
}

const manageBlog = function () {
  // Hide dashboard
  $('#userDashboard').hide()
  ui.manageBlog()
  $('.editBlog').on('click', function (event) {
    const div = $(this).parents()[4]
    const dataId = $(div).attr('data-id')
    showEditBlogForm()
    dataIdFilter(dataId)
  })
  $('.deleteBlog').on('click', function (event) {
    const div = $(this).parents()[4]
    const dataId = $(div).attr('data-id')
    $('#deleteBlogId').val(dataId)
    $('#deleteModal').modal('show')
  })
  $('#manageBlogSection').show()
}

const dataIdFilter = function (dataId) {
  const blogpost = store.site.blogposts.filter((blog) => {
    return blog.id === dataId
  })[0]
  $('#editBlogTextArea').val(blogpost.textcontent)
  $('#editBlogTitle').val(blogpost.title)
  $('#blogId').val(blogpost.id)
}

const showCreateBlogForm = function () {
  $('#newBlog').show()
  $('#manageBlogSection').hide()
}

const cancelNewBlog = function () {
  $('#newBlog').hide()
  $('#manageBlogSection').show()
  document.getElementById('newBlogForm').reset()
}

const cancelEditBlog = function () {
  $('#editBlogSection').hide()
  $('#manageBlogSection').show()
  document.getElementById('editBlogForm').reset()
}

const showEditBlogForm = function () {
  $('#manageBlogSection').hide()
  $('#editBlogSection').show()
}

const editBlogContent = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.site.blogposts.forEach((blog, index) => {
    if (blog.id === data.blogposts.id) {
      store.site.blogposts[index].title = data.blogposts.title
      store.site.blogposts[index].textcontent = data.blogposts.textcontent
    }
  })
  api.addBlogPost(store.site.blogposts)
    .then(ui.editBlogPostSuccess)
    .catch(ui.editBlogPostFailure)
    .then(promiseGetSite)
    .catch(ui.editBlogPostFailure)
    .then(ui.updateLocalSiteVar)
    .then(manageBlog)
}

const deleteBlog = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.site.blogposts = store.site.blogposts.filter((blog) => {
    return blog.id !== data.blogposts.id
  })
  api.addBlogPost(store.site.blogposts)
    .catch(ui.deleteBlogPostFailure)
    .then(promiseGetSite)
    .catch(ui.deleteBlogPostFailure)
    .then(ui.updateLocalSiteVar)
    .then(manageBlog)
    .then(ui.deleteBlogPostSuccess)
}

const closeDeleteModal = function () {
  $('#deleteModal').modal('hide')
}

const showEditSiteForm = function () {
  $('#editASite').show()
  $('#userDashboard').hide()
  $('#siteTitleInput').val(store.site.title)
  $('#siteDescriptionInput').val(store.site.description)
  console.log($('#siteTitleInput').val())
  console.log($('#siteDescriptionInput').val())
}

const cancelEditSite = function () {
  $('#editASite').hide()
  $('#userDashboard').show()
  document.getElementById('editSiteForm').reset()
}

const editSite = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data.site.title)
  api.editSite(data)
    .then(api.getMySite)
    .then(ui.editSiteSuccess)
    .catch(console.error)
    .then(console.log)
}

const showDeleteSiteModal = function () {
  $('#deleteSiteModal').modal('show')
}

const closeDeleteSiteModal = function () {
  $('#deleteSiteModal').modal('hide')
}

const deleteSite = function (event) {
  event.preventDefault()
  api.deleteSite()
    .then(ui.deleteSiteSuccess)
    .catch(console.error)
}

const managePages = function () {
  // Hide dashboard
  $('#userDashboard').hide()
  ui.managePages()
  $('.editPage').on('click', function (event) {
    const div = $(this).parents()[4]
    const dataId = $(div).attr('data-id')
    showEditPageForm()
    dataIdFilter(dataId)
  })
  $('.deletePage').on('click', function (event) {
    const div = $(this).parents()[4]
    const dataId = $(div).attr('data-id')
    $('#deleteBlogId').val(dataId)
    $('#deleteModal').modal('show')
  })
  $('#managePagesSection').show()
}

const showCreatePageForm = function () {
  $('#newPage').show()
  $('#managePagesSection').hide()
}

const showEditPageForm = function () {
  $('#managePagesSection').hide()
  $('#editPageSection').show()
}

const siteHandlers = function () {
  $('#get-sites').on('click', onGetSites)
  $('#create-a-site').on('submit', createSite)
  $('#newBlogForm').on('submit', newBlogPost)
  $('#newPageForm').on('submit', newPage)
  $('#showSite').on('click', showMySite)
  $('#manageBlog').on('click', manageBlog)
  $('#createBlogButton').on('click', showCreateBlogForm)
  $('#cancelNewBlogButton').on('click', cancelNewBlog)
  $('#cancelEditBlogButton').on('click', cancelEditBlog)
  $('#editBlogForm').on('submit', editBlogContent)
  $('.noDelete').on('click', closeDeleteModal)
  $('#yesDeleteForm').on('submit', deleteBlog)
  $('#manageSite').on('click', showEditSiteForm)
  $('#cancelEditSiteTitleButton').on('click', cancelEditSite)
  $('#editSiteForm').on('submit', editSite)
  $('#editSiteDropdown').on('click', showEditSiteForm)
  $('#deleteSiteDropdown').on('click', showDeleteSiteModal)
  $('#noDeleteSite').on('click', closeDeleteSiteModal)
  $('#yesDeleteSite').on('click', deleteSite)
  $('#managePages').on('click', managePages)
  $('#createPageButton').on('click', showCreatePageForm)
}

module.exports = {
  siteHandlers,
  getUpdatedSiteByUser,
  newBlogPost
}
