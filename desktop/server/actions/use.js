'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')

function Use (host) {
  Action.call(this, host, 'use')

  this.docs = "Trigger a vessel's program."

  this.operate = function (action, params) {
    if (!params) { return errors.NOPARAM(action) }

    const target = this.find(params, this.host.usables())

    if (!target) { return errors.NOTARGET(params, 'available', action) }
    if (!target.usable()) { return errors.NOPROGRAM(target) }

    const cmd_rendered = this.render(target.data.program, params, target)
    this.host.cmd(cmd_rendered)

    if (target.data.reaction) {
      const reaction_rendered = this.render(target.data.reaction, params, target)
      return `<p>${reaction_rendered}</p>`
    }

    return `<p>You used <action>${target}</action>.</p>`
  }
}

module.exports = Use
