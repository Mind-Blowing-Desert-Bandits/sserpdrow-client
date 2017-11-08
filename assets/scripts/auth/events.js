'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const apiSites = require('../sites/api')
const reuse = require('../reuse/reuse.js')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  const dataSave = data
  if (data.credentials.password !== data.credentials.password_confirmation) {
    $('#messageContent').text('Password and password confirmation do not match.')
  } else {
    reuse.removeValMultipleTextFields(['#signUpEmail', '#signUpPassword', '#signUpPasswordConf'])
    // $('#signUpEmail').val('')
    // $('#signUpPassword').val('')
    // $('#signUpPasswordConf').val('')
    api.signUp(data)
      .then(ui.signUpSuccess)
      .catch(ui.signUpFailure)
      .then(() => api.signIn(dataSave))
      .then(ui.signInNewUserSuccess)
      .catch(ui.signInFailure)
  }
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#passwordChange').text('')
  reuse.removeValMultipleTextFields(['#signInEmail', '#signInPassword'])
  // $('#signInEmail').val('')
  // $('#signInPassword').val('')
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignUpLinkClick = function (event) {
  event.preventDefault()
  reuse.emptyMultipleTextFields(['#messageContent', '#signInMessage'])
  reuse.hideMultipleFields(['#sign-up', '#signInModal'])
  reuse.showMultipleFields(['#sign-in', '#signUpModal'])
  // $('#sign-up').hide()
  // $('#sign-in').show()
  // $('#signInModal').hide()
  // $('#signUpModal').show()
  // $('#messageContent').text('')
  // $('#signInMessage').text('')
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  reuse.removeValMultipleTextFields(['#changeOld', '#changeNew'])
  // $('#changeOld').val('')
  // $('#changeNew').val('')
  if (store.user === undefined || null) {
    $('#passwordChange').text('You must sign in before you can change your password.')
  } else if (data.passwords.old.length === 0) {
    $('#passwordChange').text('Please enter your current password.')
  } else if (data.passwords.new.length === 0) {
    $('#passwordChange').text('Please enter a new password.')
  } else if (data.passwords.new === data.passwords.old) {
    $('#passwordChange').text('New and old passwords are the same. Please try again')
  } else {
    api.changePassword(data)
      .then(ui.changePasswordSuccess)
      .catch(ui.changePasswordFailure)
  }
}

const clearPassword = function () {
  event.preventDefault()
  $('#passwordChange').text('')
}

const authHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#signOut').on('click', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#passwordClose').on('click', clearPassword)
  $('#signUpLink').on('click', onSignUpLinkClick)
}

module.exports = {
  authHandlers
}
