'use strict'

const store = require('../store.js')

const signUpSuccess = function (data) {
  $('#messageContent').text('You have signed up as ' + data.user.email)
  $('#signedOut').hide()
  $('#signInMessage').text('')
  $('#signInModal').hide()
  $('#signInAfterSignUp').show()
}

const signUpFailure = function () {
  $('#messageContent').text('This user may already exist. Please try again.')
}

const onSignInLinkClick = function (event) {
  event.preventDefault()
  $('#sign-in').show()
  $('#sign-up').hide()
  $('#signInModal').hide()
  $('#signUpModal').show()
  $('#messageContent').hide()
  $('#signInAfterSignUp').hide()
  $('#signInMessage').show()
  const form = document.getElementById('sign-up')
  form.reset()
}

const onSignUpModalLinkClink = function (event) {
  event.preventDefault()
  $('#sign-up').show()
  $('#sign-in').hide()
  $('#signUpModal').hide()
  $('#signInModal').show()
  $('#signInMessage').hide()
  $('#messageContent').show()
  $('#messageContent').text('')
  $('#signUpSignIn').text('')
  $('#signInMessage').text('')
  $('#signInAfterSignUp').hide()
  const form = document.getElementById('sign-in')
  form.reset()
}

const signInSuccess = function (data) {
  $('#messageContent').text('')
  $('#sign-up').hide()
  $('#signInAfterSignUp').hide()
  $('#signInMessage').show()
  $('#signInMessage').text('Signed in as ' + data.user.email)
  $('#sign-in').hide()
  $('#signUpLink').hide()
  $('#signOut').show()
  $('#changePassword').show()
  $('#signedOut').hide()
  $('#signUpModal').hide()
  $('#userNameNav').show()
  store.user = data.user
  const user = store.user.email
  $('#userNameNav').append(user)
}

const signInFailure = function () {
  $('#signInMessage').text('Please try signing in with a registered email and password.')
}

const signOutSuccess = function () {
  store.user = null
  $('#changePassword').hide()
  $('#signOut').hide()
  $('#signUpLink').show()
  $('#signedOut').show()
  $('#messageContent').text('')
  $('#signInMessage').text('')
  $('#messageContent').show()
  $('#signInMessage').show()
  $('#signUpModal').hide()
  $('#signInModal').show()
  $('#userNameNav').text('')
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
  changePasswordFailure
}
