'use strict'

const Action = require('../core/action')
const errors = require('../core/errors')

function Note (host) {
  Action.call(this, host, 'note')

  this.docs = 'Add a description to the current parent vessel.'

  this.operate = function (action, params) {
    if (!this.host.parent().data.note && params.trim() == '') { return errors.NOVALID(action) }

    const is_update = !!this.host.parent().data.note

    this.host.parent().set('note', params)

    return `<p>You ${params == '' ? 'removed the' : is_update ? 'updated the' : 'added a'} description to <action>${this.host.parent()}</action>.</p>`
  }
}

module.exports = Note
