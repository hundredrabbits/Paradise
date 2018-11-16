'use strict'

const Action = require(`../core/action`)

function Warp (host) {
  Action.call(this, host, 'warp')

  this.docs = "Enter a distant vessel by either its name, or its warp id. The vessel must be visible. Use <action data='warp to'>warp to</action> to move at a vessel's parent location."

  this.operate = function (action, params) {
    if (!params) { return this.err_NOPARAM() }

    const parts = this.remove_articles(params).split(' ')
    const relation = parts[0]
    const target = this.find(parts.length > 1 ? params.replace(relation, '').trim() : params)

    if (!target) {
      return `You cannot warp to this location.`
    }
    if (relation == 'at' || relation == 'by' || relation == 'to') {
      let result = this.host.move(target.parent())
      if (result) {
        return `<p>You warped by the <action>${target.name()}</action>, inside the ${target.parent().name()}.</p>`
      } else {
        return this.err_NOCHANGE()
      }
    }

    let result = this.host.move(target)
    if (result) {
      return `<p>You warped in <action>${target}</action>.</p>`
    } else {
      return this.err_NOCHANGE()
    }
  }
}

module.exports = Warp
