'use strict'

const Action = require('../core/action')
const errors = require('../core/errors')

function Transform (host) {
  Action.call(this, host, 'transform')

  this.docs = 'Change your current vessel name.'

  this.operate = function (action, params) {
    if (!params) { return errors.NOPARAM(action) }

    const sides = ` ${params} `.replace(' into ', ' in ').split(' in ')
    const target = sides[0].trim() ? this.find(sides[0], this.host.siblings()) : this.host

    if (!target) { return errors.NOTARGET(sides[0], 'visible', action) }

    const parts = this.remove_articles(sides[1]).trim().split(' ')
    const origin = `${target}`

    if (!parts[0]) { return errors.NOVALID(action) }

    if (parts.length == 2) {
      const name_success = target.set('name', parts[1])
      const attr_success = target.set('attr', parts[0])
      if (name_success || attr_success) {
        return `<p>You transformed ${target.id != this.host.id ? origin + ' ' : ''}into ${target}.</p>`
      } else {
        return errors.NOCHANGE()
      }
    } else if (parts.length == 1) {
      const name_success = target.set('name', parts[0])
      if (name_success) {
        return `<p>You transformed ${target.id != this.host.id ? origin + ' ' : ''}into ${target}.</p>`
      } else {
        return errors.NOCHANGE()
      }
    }

    return errors.NOVALID(action)
  }
}

module.exports = Transform
