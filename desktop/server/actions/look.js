'use strict'

const Action = require('../core/action')
const errors = require('../core/errors')

function Look (host) {
  Action.call(this, host, 'look')

  this.docs = 'List all visible vessels.'

  this.operate = function () {

  }
}

module.exports = Look
