'use strict'

const config = require('../config.js')

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data: data
  })
}

module.exports = {
  signUp
}
