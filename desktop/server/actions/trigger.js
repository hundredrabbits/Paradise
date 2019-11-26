'use strict'

const Action = require('../core/action')
const errors = require('../core/errors')

function Trigger (host) {
  Action.call(this, host, 'trigger')

  this.docs = 'Trigger sets an action word to a program vessel. You can also set a custom reaction to a program use by adding a short sentence after the trigger action word.'

  this.operate = function (action, params) {
    if (!this.host.parent().data.trigger && params.trim() == '') { return errors.NOVALID(action) }

    const parts = params.split(' ')
    const target = parts[0]
    const reaction = params.replace(target, '').trim()

    this.host.parent().set('trigger', target.toLowerCase())

    if (reaction) {
      this.host.parent().set('reaction', reaction)
    }
    return params.trim() == '' ? `<p>You removed the trigger of ${this.host.parent()}.` : `<p>You set the trigger of ${this.host.parent()} to '${target}'${reaction ? ', with the "' + reaction + '" reaction' : ''}.</p>`
  }
}

module.exports = Trigger
