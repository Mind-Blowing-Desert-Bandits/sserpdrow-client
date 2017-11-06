'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  const dataSave = data
  if (data.credentials.password !== data.credentials.password_confirmation) {
    $('#messageContent').text('Password and password confirmation do not match.')
  } else {
    $('#signUpEmail').val('')
    $('#signUpPassword').val('')
    $('#signUpPasswordConf').val('')
    api.signUp(data)
      .then(ui.signUpSuccess)
      .catch(ui.signUpFailure)
      .then(() => api.signIn(dataSave))
      .then(ui.signInSuccess)
  }
}

const authHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
}

module.exports = {
  authHandlers
}
