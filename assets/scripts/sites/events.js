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
  $('#returnToSite').hide()
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
  console.log('stored pages are ', store.site.pages)
  api.addPage(store.site.pages)
    .then(ui.addPageSuccess)
    .then(api.getSites)
    .then(ui.updateLocalSitePageVar)
    .catch(console.error)
    .then(managePages)
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

const dataPageIdFilter = function (dataId) {
  const page = store.site.pages.filter((page) => {
    return page.id === dataId
  })[0]
  console.log(page.type)
  $('#editPageDropDown').val(page.type)
  $('#editPageTitle').val(page.title)
  $('#editPageTextArea').val(page.textcontent)
  $('#pageId').val(page.id)
  console.log('this is the stuff ', $('#pageId').val())
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

const cancelEditPage = function () {
  $('#editPageSection').hide()
  $('#managePagesSection').show()
  document.getElementById('editPageForm').reset()
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
  api.deleteBlogPost(data.blogposts.id)
    .catch(ui.deleteBlogPostFailure)
    .then(promiseGetSite)
    .catch(ui.deleteBlogPostFailure)
    .then(ui.updateLocalSiteVar)
    .then(manageBlog)
    .then(ui.deleteBlogPostSuccess)
}

const closeDeleteModal = function () {
  $('#deleteModal').modal('hide')
  $('#deletePageModal').modal('hide')
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
    dataPageIdFilter(dataId)
  })
  $('.deletePage').on('click', function (event) {
    const div = $(this).parents()[4]
    const dataId = $(div).attr('data-id')
    $('#deletePageId').val(dataId)
    $('#deletePageModal').modal('show')
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

const editPageContent = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.site.pages.forEach((page, index) => {
    console.log('pages.type', page.type)
    if (page.id === data.pages.id) {
      store.site.pages[index].type = data.pages.type
      store.site.pages[index].title = data.pages.title
      store.site.pages[index].textcontent = data.pages.textcontent
    }
  })
  console.log('this is store.site.pages ', store.site.pages)
  api.addPage(store.site.pages)
    .then(ui.editPageSuccess)
    .then(api.getSites)
    .then(ui.updateLocalSitePageVar)
    .catch(console.error)
    .then(managePages)
}

const deletePage = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('data is ', data)
  api.deletePageAPI(data.pages.id)
    .then(api.getSites)
    .then(ui.updateLocalSitePageVar)
    .catch(console.error)
    .then(managePages)
    .then(ui.deletePageSuccess)
}

const returnToSite = function (event) {
  event.preventDefault()
  ui.viewSiteSuccess(store.site)
}

const myDashboard = function () {
  $('#userDashboard').show()
  $('#mySite').hide()
  $('#manageBlogSection').hide()
  $('#newBlog').hide()
  document.getElementById('newBlogForm').reset()
  $('#editBlogSection').hide()
  document.getElementById('editBlogForm').reset()
  $('#managePagesSection').hide()
  $('#newPage').hide()
  document.getElementById('newPageForm').reset()
  $('#editPageSection').hide()
  document.getElementById('editPageForm').reset()
  $('#editASite').hide()
  document.getElementById('editSiteForm').reset()
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
  $('#cancelEditPageButton').on('click', cancelEditPage)
  $('#editBlogForm').on('submit', editBlogContent)
  $('#editPageForm').on('submit', editPageContent)
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
  $('#yesDeletePageForm').on('submit', deletePage)
  $('#returnToSite').on('click', returnToSite)
  $('#dashboardLink').on('click', myDashboard)
}

module.exports = {
  siteHandlers,
  getUpdatedSiteByUser,
  newBlogPost
}
