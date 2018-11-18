'use strict'

Error = require('./error')

const basic = {
  name: 'ghost',
  attr: 'hungry',
  parent: 0,
  owner: -1
}

function Vessel (data = basic) {
  this.paradise = null
  this.data = data

  this.cmd = function (q = '') {
    const lines = `${q}`.indexOf(' & ') > -1 ? `${q}`.split(' & ') : [`${q}`]

    if (!lines) { return this.act() }

    let output
    let action
    let params
    for (const id in lines) {
      const line = lines[id]
      const parts = line.split(' ')
      action = parts.splice(0, 1)[0]
      params = parts.join(' ').trim()
      output = this.act(action, params)
    }
    if (output.reaction instanceof Error) {
      this.data.last_error = output.reaction
      output.reaction = output.reaction.to_a()
      return output
    } else if (action != 'look') {
      this.data.last_error = null
      return output
    } else {
      return output
    }
  }

  this.act = function (a, p) {
    const Responder = this.response(a || 'look')
    const action = new Responder(this)
    return action.run(a, p)
  }

  this.response = function (action = 'look') {
    try {
      return require(`../actions/${action}`)
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        return require(`./action`)
      }
      throw err
    }
  }

  this.set = function (key, value) {
    if (this.data[key] != value) {
      this.data[key] = value
      return true
    } else {
      return false
    }
  }

  this.move = function (target) {
    return this.set('parent', target.id)
  }

  this.parent = function () {
    return this.paradise.world[this.data.parent]
  }

  this.owner = function () {
    return this.paradise.world[this.data.owner]
  }

  this.is_circular = function () {
    // find Root
    const known = []
    let v = this.parent()
    let i = 0
    while (i < 50) {
      if (v.is_paradox()) { return false }
      if (known.indexOf(v.id) > -1) { return true }
      known.push(v.id)
      v = v.parent()
      i += 1
    }
    return false
  }

  this.stem = function () {
    // find Root
    const known = []
    let v = this.parent()
    let i = 0
    while (i < 50) {
      if (v.parent().is_paradox() || known.indexOf(v.id) > -1) { return v }
      i += 1
      known.push(v.id)
    }
    return this // REVIEW: Should this be null?
  }

  // Helpers

  // BUG: Causes crash on str.split (apparently it isn't a function)
  this.is = function (str) {
    const parts = str.split(' ')
    const last_word = parts[parts.length - 1].toLowerCase()

    if (last_word == this.data.name) {
      return true
    }
    return false
  }

  this.siblings = function () {
    const a = []
    const parent = this.parent()
    for (const id in this.paradise.world) {
      const vessel = this.paradise.world[id]
      if (parent.is_paradox() && vessel.id == parent.id) { continue } // Don' show paradoxes
      if (vessel.parent().id == this.parent().id && vessel.id != this.id) {
        a.push(vessel)
      }
    }
    return a
  }

  this.children = function () {
    const a = []
    for (const id in this.paradise.world) {
      const vessel = this.paradise.world[id]
      if (vessel.parent().id == this.id && vessel.id != this.id) {
        a.push(vessel)
      }
    }
    return a
  }

  this.usables = function () {
    return [].concat(this.siblings()).concat(this.children())
  }

  // Checks

  this.is_paradox = function () {
    return this.parent().id == this.id
  }

  this.is_program = function () {
    return !!this.data.program
  }

  // Formatters

  this.to_h = function () {
    return this.data
  }

  this.to_a = function (show_particle = true) {
    return `${show_particle ? this.particle() + ' ' : ''}<action data='${this.action()}'>${this.name()}</action>`
  }

  this.particle = function () {
    const letter = this.data.attr ? this.data.attr.substr(0, 1).toLowerCase() : this.data.name.substr(0, 1).toLowerCase()
    return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u' ? 'an' : 'a'
  }

  this.name = function () {
    return `${this.data.attr ? this.data.attr + ' ' : ''}${this.data.name}`
  }

  this.type = function () {
    if (this.data.program) { return `program` }
    if (this.data.note) { return `location` }

    return `vessel`
  }

  this.usable = function () {
    return this.trigger() !== false
  }

  this.trigger = function () {
    if (this.data.trigger) {
      return this.data.trigger.indexOf(' ') > -1 ? this.data.trigger.split(' ')[0] : this.data.trigger
    }
    if (this.is_program()) {
      return 'use'
    }
    return false
  }

  this.passive = function () {
    if (this.trigger() != 'passive') { return }
    if (!this.data.reaction) { return }

    return this.data.reaction
  }

  this.action = function () {
    let action = `warp into the ${this.name()}`

    // Inventory
    if (this.data.parent == this.paradise.ghost().id) {
      if (this.is_program()) {
        action = `${this.trigger()} ${this.name()}`
      } else {
        action = `drop the ${this.name()}`
      }
    } else if (this.data.parent == this.paradise.ghost().data.parent) { // Is Visible
      if (this.is_program()) {
        action = `${this.trigger()} ${this.name()}`
      } else {
        action = `enter the ${this.name()}`
      }
    }

    return action
  }

  this.toString = function () {
    return `${this.particle()} ${this.name()}`.trim()
  }
}

module.exports = Vessel
