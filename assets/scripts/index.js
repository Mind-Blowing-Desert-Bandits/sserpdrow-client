'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

const authEvents = require('./auth/events')
const ui = require('./auth/ui')
const siteEvents = require('./sites/events')
// const siteUi = require('./sites/ui')

$(() => {
  authEvents.authHandlers()
  siteEvents.siteHandlers()
  ui.uiHandlers()
  // siteUi.uiHandlers()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
