'use strict'

const Action = require(`../core/action`)
const Vessel = require(`../core/vessel`)
const errors = require('../core/errors')

const reserved_names = [
  'some',
  'any',
  'itself',
  'a',
  'an',
  'the',
  'of',
  'some',
  'one',
  'two'
]

function Create (host) {
  Action.call(this, host, 'create')

  this.docs = 'Create a new vessel at your current location. Vessel names and attributes must include <b>less than 14 characters and be unique</b>. '

  this.operate = function (action, params) {
    if (!params) { return errors.NOPARAM(action) }

    const parts = this.remove_articles(params).trim().split(' ')
    const attr = parts[parts.length - 2] && parts[parts.length - 2] != parts[parts.length - 1] ? parts[parts.length - 2].toLowerCase() : null
    const name = parts[parts.length - 1].toLowerCase()

    // TODO: Transform these into Errors
    if (parseInt(name) > -1) { return `<p>Vessel names cannot be numbers.</p>` }
    if (name == '') { return errors.NOVALID(action) }
    if (name.length < 3 || name.length > 14) { return `<p>The vessel name must be between 3 and 14 characters long.</p>` }
    if (attr && attr.length > 14) { return `<p>The vessel attribute is too long.</p>` }
    if (reserved_names.indexOf(name) > -1) { return `<p>Vessel names cannot be reserved words ('some', 'any', or 'itself') or articles.</p>` }
    if (reserved_names.indexOf(attr) > -1) { return `<p>Vessel attributes cannot be reserved words ('some', 'any', or 'itself') or articles.</p>` }

    const data = {
      name: name,
      attr: attr,
      owner: this.host.id,
      parent: this.host.data.parent
    }

    const vessel = new Vessel(data)
    const success = this.host.paradise.add(vessel)

    // TODO: Transform these into Errors
    return !success ? `<p>A visible vessel with that name already exists.</p>` : `<p>You created <action data='enter the ${vessel.name()}'>${vessel.to_a()}</action> in the ${this.host.parent().name()}.</p>`
  }
}

module.exports = Create
