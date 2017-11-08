'use strict'

const store = require('../store.js')
const sitesEvents = require('../sites/events.js')
const reuse = require('../reuse/reuse.js')

const signUpSuccess = function (data) {
  $('#messageContent').text('You have signed up as ' + data.user.email)
  $('#signInMessage').text('')
  $('#signInModal').hide()
  // $('#signInModal').modal('hide')
  $('#createASite').show()
}

const signUpFailure = function () {
  $('#messageContent').text('This user may already exist. Please try again.')
}

const onSignInLinkClick = function (event) {
  event.preventDefault()
  reuse.hideMultipleFields(['#sign-up', '#signInModal', '#messageContent', '#signInAfterSignUp'])
  reuse.showMultipleFields(['#sign-in', '#signUpModal', '#signInMessage'])
  // $('#sign-in').show()
  // $('#sign-up').hide()
  // $('#signInModal').hide()
  // $('#signUpModal').show()
  // $('#messageContent').hide()
  // $('#signInAfterSignUp').hide()
  // $('#signInMessage').show()
  const form = document.getElementById('sign-up')
  form.reset()
}

const onSignUpModalLinkClink = function (event) {
  event.preventDefault()
  reuse.hideMultipleFields(['#sign-in', '#signUpModal', '#signInMessage', '#signInAfterSignUp'])
  reuse.showMultipleFields(['#sign-up', '#signInModal', '#messageContent'])
  reuse.emptyMultipleTextFields(['#messageContent', '#signUpSignIn', '#signInMessage'])
  // $('#sign-up').show()
  // $('#sign-in').hide()
  // $('#signUpModal').hide()
  // $('#signInModal').show()
  // $('#signInMessage').hide()
  // $('#messageContent').show()
  // $('#messageContent').text('')
  // $('#signUpSignIn').text('')
  // $('#signInMessage').text('')
  // $('#signInAfterSignUp').hide()
  const form = document.getElementById('sign-in')
  form.reset()
}

const signInSuccess = function (data) {
  reuse.hideMultipleFields(['#sign-up', '#signInAfterSignUp', '#sign-in',
    '#signUpLink', '#signUpModal', '#exampleModal', '#get-sites', '#mySite',
    '#myPages', '#myBlogs', '#mySiteHeader'])
  reuse.showMultipleFields(['#signInMessage', '#signOut', '#changePassword', '#userNameNav'])
  $('#messageContent').text('')
  // $('#sign-up').hide()
  // $('#signInAfterSignUp').hide()
  // $('#signInMessage').show()
  $('#signInMessage').text('Signed in as ' + data.user.email)
  // $('#sign-in').hide()
  // $('#signUpLink').hide()
  // $('#signOut').show()
  // $('#changePassword').show()
  // $('#signUpModal').hide()
  // $('#exampleModal').modal('hide')
  // $('#userNameNav').show()
  // $('#get-sites').hide()
  // $('#mySite').hide()
  // $('#myPages').hide()
  // $('#myBlogs').hide()
  // $('#mySiteHeader').hide()
  store.user = data.user
  const user = store.user.email
  $('#userNameNav').append(user)
  sitesEvents.getUpdatedSiteByUser()
}

const signInFailure = function () {
  $('#signInMessage').text('Please try signing in with a registered email and password.')
}

const signInNewUserSuccess = function (data) {
  reuse.hideMultipleFields(['#sign-up', '#signInAfterSignUp', '#sign-in',
    '#signUpLink', '#signUpModal', '#signInMessage', '#userSignedOut', '#userSignedOut'])
  reuse.showMultipleFields(['#signOut', '#changePassword', '#userNameNav', '#signedIn', '#createASite'])
  $('#messageContent').text('')
  // $('#sign-up').hide()
  // $('#signInAfterSignUp').hide()
  // $('#sign-in').hide()
  // $('#signUpLink').hide()
  // $('#signOut').show()
  // $('#changePassword').show()
  // $('#signUpModal').hide()
  // $('#userNameNav').show()
  // $('#signInMessage').hide()
  store.user = data.user
  const user = store.user.email
  $('#userNameNav').append(user)
  $('#exampleModal').modal('hide')
  // $('#userSignedOut').hide()
  // $('#signedIn').show()
  // $('#createASite').show()
}

const signOutSuccess = function () {
  reuse.hideMultipleFields(['#changePassword', '#signOut', '#signUpModal',
    '#signedIn', '#editASite', '#manageBlogSection', '#newBlog'])
  reuse.showMultipleFields(['#signUpLink', '#messageContent', '#signInMessage', '#signInModal',
    '#get-sites', '#userSignedOut'])
  reuse.emptyMultipleTextFields(['#messageContent', '#signInMessage', '#userNameNav',
    '#blogs', '#allSites', '#sitePages'])

  store.user = null
  store.site = null
  // $('#changePassword').hide()
  // $('#signOut').hide()
  // $('#signUpLink').show()
  // $('#messageContent').text('')
  // $('#signInMessage').text('')
  // $('#messageContent').show()
  // $('#signInMessage').show()
  // $('#signUpModal').hide()
  // $('#signInModal').show()
  // $('#get-sites').show()
  // $('#signedIn').hide()
  // $('#userSignedOut').show()
  // $('#userNameNav').text('')
  $('#siteTitle').text('SSERPDROW')
  $('#siteDescription').text('Welcome to SSERPDROW! To view our communities\' sites please click \'View All Sites\' link above. To create your own site/blogs please sign-up or sign-in!')
  // $('#blogs').text('')
  // $('#allSites').text('')
  // $('#sitePages').text('')
  // $('#editASite').hide()
  // $('#manageBlogSection').hide()
  // $('#newBlog').hide()
  document.getElementById('newBlogForm').reset()
}

const signOutFailure = function () {
  $('#signedOut').text('Please try again.')
}

const changePasswordSuccess = function () {
  $('#passwordChange').text('Password has been successfully updated.')
}

const changePasswordFailure = function () {
  $('#passwordChange').text('Please try again.')
}

const uiHandlers = function () {
  $('#signInModal').on('click', onSignInLinkClick)
  $('#signInAfterSignUp').on('click', onSignInLinkClick)
  $('#signUpModal').on('click', onSignUpModalLinkClink)
}

module.exports = {
  uiHandlers,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  onSignInLinkClick,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signInNewUserSuccess
}
