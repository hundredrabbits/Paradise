'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')

function Inspect (host) {
  Action.call(this, host, 'inspect')

  this.docs = `Inspect a vessel to see its program, precise location and various details. An excellent tool to find issues with vessels.`

  this.operate = function (action, params) {
    if (params.trim() == '') { return this.inspect_parent() }

    const target = this.find(params, this.host.siblings())

    if (target) {
      return `<p>You are inspecting the <action>${target.name()}</action>#${target.id}. ${this.make_location(target)}</p>`
    } else {
      return errors.NOTARGET(params, 'visible', action)
    }
  }

  this.inspect_parent = function () {
    return `<p>${this.make_location()}</p>`
  }

  this.make_location = function (target = this.host.parent()) {
    if (target.parent().isParadox()) {
      return `The ${target.name()} ${target.type()}, located in the ${target.parent().name()} ${target.parent().type()} paradox, was created by ${target.owner()}.`
    }
    if (target.isParadox()) {
      return `The ${target.name()} ${target.type()} paradox was created by ${target.owner()}.`
    }
    return `The ${target.name()} ${target.type()}, located in the ${target.parent().name()} ${target.parent().type()}, part of the ${target.stem().name()} constellation, was created by ${target.owner()}.`
  }
}

module.exports = Inspect
