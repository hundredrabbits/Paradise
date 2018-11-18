'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')

function Leave (host) {
  Action.call(this, host, 'leave')

  this.docs = 'Exit the parent vessel.'

  this.operate = function (action, params) {
    const origin = this.host.parent().name()

    if (this.host.isParadox()) {
      return errors.NOCHANGE(`<p>You cannot leave the <action>${this.host.name()}</action> paradox.</p>`)
    }
    if (this.host.parent().isParadox()) {
      return errors.NOCHANGE(`<p>You cannot leave the <action>${this.host.parent().name()}</action> paradox.</p>`)
    }

    this.host.move(this.host.parent().parent())

    return `<p>You left the <action data='enter the ${origin}'>${origin}</action>.</p>`
  }
}

module.exports = Leave
