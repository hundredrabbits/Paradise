'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')

function Cast (host) {
  Action.call(this, host, 'cast')

  // TODO: Make this documentation clearer
  this.docs = 'Move a child vessel into the parent vessel.'

  this.operate = function (action, params) {
    if (!params) { return errors.NOPARAM() }

    const parts = this.remove_articles(params).trim().split(' ')
    const spell_name = `${parts[0]} ${parts[1]}`
    const spell = this.find(spell_name)

    if (!spell) { return errors.UNKNOWN(spell_name, 'spell', false) }
    if (!spell.is_program()) { return errors.NOPROGRAM(spell.name()) }

    const target = this.find(parts[parts.length - 1], this.host.siblings())

    target.cmd(spell.data.program)

    return `<p>You casted the ${spell.name()} on ${target.name()}.</p>`
  }
}

module.exports = Cast
