'use strict'

const Action = require(`../core/action`)

function Look (host) {
  Action.call(this, host, 'look')

  this.operate = function () {

  }
}

module.exports = Look
