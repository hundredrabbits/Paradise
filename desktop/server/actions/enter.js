'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')

function Enter (host) {
  Action.call(this, host, 'enter')

  this.docs = 'Enter a visible vessel.'

  this.operate = function (action, params) {
    // Ensure parameters are given
    if (!params) { return errors.NOPARAM(action) }

    // Find target
    const target = this.find(params, this.host.siblings(true))

    if (target) {
      // Success
      this.host.move(target)
      return `<p>You entered the <action>${target.name()}</action>.</p>`
    } else {
      // No visible vessel
      return errors.NOTARGET(params, 'visible', action)
    }
  }
}

module.exports = Enter
