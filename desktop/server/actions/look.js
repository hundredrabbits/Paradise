'use strict'

const Action = require(`../core/action`)

function Look (host) {
  Action.call(this, host, 'look')

  this.docs = 'List all visible vessels.'

  this.operate = function () {

  }
}

module.exports = Look
