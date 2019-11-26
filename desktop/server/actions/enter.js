'use strict'

const Action = require('../core/action')
const errors = require('../core/errors')

function Enter (host) {
  Action.call(this, host, 'enter')

  this.docs = 'Enter a visible vessel.'

  this.operate = function (action, params) {
    if (!params) { return errors.NOPARAM(action) }

    const target = this.find(params, this.host.siblings(true))

    if (target) {
      this.host.move(target)
      return `<p>You entered the <action>${target.name()}</action>.</p>`
    } else {
      return errors.NOTARGET(params, 'visible', action)
    }
  }
}

module.exports = Enter
