'use strict'

const Action = require('../core/action')
const errors = require('../core/errors')

function Echo (host) {
  Action.call(this, host, 'echo')

  this.docs = 'Repeat back some text. Useful for wildcard testing.'

  this.operate = function (action, params) {
    if (!params) {
      return errors.NOPARAM(action)
    }

    const reaction_rendered = this.render(params, null, host) // query = null
    return `<p>${reaction_rendered}</p>`
  }
}

module.exports = Echo
