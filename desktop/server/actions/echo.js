'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')

function Echo (host) {
  Action.call(this, host, 'echo')

  this.docs = 'Repeat back some text. Useful for wildcard testing.'

  this.operate = function (action, params) {
    if (!params) {
      // Ensure parameters are given
      return errors.NOPARAM(action)
    }

    // Render and return reaction
    const reaction_rendered = this.render(params, null, host) // query = null
    return `<p>${reaction_rendered}</p>`
  }
}

module.exports = Echo
