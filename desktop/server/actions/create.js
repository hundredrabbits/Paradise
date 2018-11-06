'use strict'

const Action = require(`../core/action`)
const Vessel = require(`../core/vessel`)

function Create (host) {
  Action.call(this, host, 'create')

  this.docs = 'Create a new vessel at your current location. Vessel names and attributes must include <b>less than 14 characters and be unique</b>. '

  this.operate = function (action, params) {
    if (!params) { return this.err_NOPARAM() }

    const parts = this.remove_articles(params).trim().split(' ')
    const attr = parts[parts.length - 2] && parts[parts.length - 2] != parts[parts.length - 1] ? parts[parts.length - 2].toLowerCase() : null
    const name = parts[parts.length - 1].toLowerCase()

    if (parseInt(name) > -1) { return `<p>Vessel names cannot be numbers.</p>` }
    if (name == '') { return this.err_NOVALID() }
    if (name.length < 3 || name.length > 14) { return `<p>The vessel name must be between 3 and 14 characters long.</p>` }
    if (attr && attr.length > 14) { return `<p>The vessel attribute is too long.</p>` }

    const data = {
      name: name,
      attr: attr,
      owner: this.host.id,
      parent: this.host.data.parent
    }

    const vessel = new Vessel(data)
    const success = this.host.paradise.add(vessel)

    return !success ? `<p>A visible vessel with that name already exists.</p>` : `<p>You created <action data='enter the ${vessel.name()}'>${vessel.to_a()}</action> in the ${this.host.parent().name()}.</p>`
  }
}

module.exports = Create
