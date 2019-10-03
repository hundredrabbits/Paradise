'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')

function Become (host) {
  Action.call(this, host, 'become')

  this.docs = 'Become a visible vessel.'

  this.operate = function (action, params) {
    // Ensure parameters are given
    if (!params) { return errors.NOPARAM(action) }

    const target = this.find(params, this.host.siblings())

    if (target && target == this.host) {
      // No change will occur (become self)
      return errors.NOCHANGE()
    } else if (target) {
      // Successful transformation
      this.host.paradise.client.change_vessel(target.id)
      return `<p>You became ${target}.</p>`
    } else {
      // No visible target
      return errors.NOTARGET(params, 'visible', action)
    }
  }
}

module.exports = Become
