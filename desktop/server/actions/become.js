'use strict'

const Action = require(`../core/action`)

function Become (host) {
  Action.call(this, host, 'become')

  this.docs = 'Become a visible vessel.'

  this.operate = function (action, params) {
    if (!params) { return this.err_NOPARAM() }

    const target = this.find(params, this.host.siblings())

    if (target && target == this.host) {
      return this.err_NOCHANGE()
    } else if (target) {
      this.host.paradise.client.change_vessel(target.id)
      return `<p>You became ${target}.</p>`
    } else {
      return this.err_NOTARGET(params)
    }
  }
}

module.exports = Become
