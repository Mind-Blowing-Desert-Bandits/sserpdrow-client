'use strict'

const signUpSuccess = function (data) {
  console.log('success')
  $('#messageContent').text('You have signed up as ' + data.user.email)
  $('#signedOut').hide()
  $('#signInMessage').text('')
  $('#signInModal').hide()
  $('#signInAfterSignUp').show()
}

const signUpFailure = function () {
  $('#messageContent').text('This user may already exist. Please try again.')
}

module.exports = {
  signUpSuccess,
  signUpFailure
}
