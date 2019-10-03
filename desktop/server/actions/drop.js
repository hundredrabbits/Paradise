'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')

function Drop (host) {
  Action.call(this, host, 'drop')

  this.docs = 'Move a child vessel into the parent vessel.'

  this.operate = function (action, params) {
    // Ensure parameters are given
    if (!params) { return errors.NOPARAM(action) }

    // Find target
    const target = this.find(params, this.host.children())

    if (!target) { return errors.NOTARGET(params, 'child vessel', action) }

    // Perform drop
    target.move(this.host.parent())

    // Give feedback
    return `<p>You dropped ${target.particle()} <action data='take the ${target.name()}'>${target.name()}</action>.</p>`
  }
}

module.exports = Drop
