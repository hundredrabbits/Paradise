'use strict'

const Action = require('../core/action')
const errors = require('../core/errors')

function Move (host) {
  Action.call(this, host, 'move')

  this.docs = 'Move a visible vessel into another visible vessel.'

  this.operate = function (action, params) {
    if (!params) { return errors.NOPARAM(action) }

    if (params.indexOf(' in ') < 0 && params.indexOf(' into ') < 0) { return errors.NOVALID(false, 'You must use the words <action data=\'move the vessel1 into the vessel2\'>in or into</action>.') }

    const parts = params.replace(' into ', ' in ').split(' in ')

    const target_a = this.find(parts[0], this.host.siblings())
    let target_b
    if (parts[1] === 'itself') {
      target_b = target_a
    } else {
      target_b = this.find(parts[1], this.host.siblings())
    }

    if (target_a && target_b) {
      target_a.move(target_b)
      return `<p>You moved the ${target_a.name()} in the <action data='enter the ${target_b.name()}'>${target_b.name()}</action>.</p>`
    } else {
      return errors.NOTARGET(params, 'visible', action)
    }
  }
}

module.exports = Move
