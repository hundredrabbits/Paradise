'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')

function Inspect (host) {
  Action.call(this, host, 'inspect')

  this.docs = `Inspect a vessel to see its program, precise location and various details. An excellent tool to find issues with vessels.`

  this.operate = function (action, params) {
    // If no params, inspect parent
    if (params.trim() == '') { return this.inspect_parent() }

    // Find target
    const target = this.find(params, this.host.siblings())

    if (target) {
      // Inspect target
      return `<p>You are inspecting the <action>${target.name()}</action>#${target.id}. ${this.make_location(target)}</p>`
    } else {
      // No target
      return errors.NOTARGET(params, 'visible', action)
    }
  }

  // Inspect the parent
  this.inspect_parent = function () {
    return `<p>${this.make_location()}</p>`
  }

  // Turn a target into a formatted string
  this.make_location = function (target = this.host.parent()) {
    if (target.parent().isParadox()) {
      // Parent is paradox
      return `The ${target.name()} ${target.type()}, located in the ${target.parent().name()} ${target.parent().type()} paradox, was created by ${target.owner()}.`
    }
    if (target.isParadox()) {
      // Paradox
      return `The ${target.name()} ${target.type()} paradox was created by ${target.owner()}.`
    }
    // Default
    return `The ${target.name()} ${target.type()}, located in the ${target.parent().name()} ${target.parent().type()}, part of the ${target.stem().name()} constellation, was created by ${target.owner()}.`
  }
}

module.exports = Inspect
