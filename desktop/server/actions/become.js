'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')

function Become (host) {
  Action.call(this, host, 'become')

  this.docs = 'Become a visible vessel.'

  this.operate = function (action, params) {
    if (!params) { return errors.NOPARAM(action) }

    const target = this.find(params, this.host.siblings())

    if (target && target == this.host) {
      return errors.NOCHANGE()
    } else if (target) {
      this.host.paradise.client.change_vessel(target.id)
      return `<p>You became ${target}.</p>`
    } else {
      return errors.NOTARGET(params, 'visible', action)
    }
  }
}

module.exports = Become
