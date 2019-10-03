'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')
const helpers = require('../core/helpers')
const wildcards = require('../wildcards')

function Learn (host) {
  Action.call(this, host, 'learn')

  this.docs = "The learn command allows you to read documentation for <action data='learn about actions'>actions</action>, <action data='learn about wildcards'>wildcards</action>, <action data='learn about groups'>groups</action>, and <action data='learn about knowledge'>general knowledge</action>."

  this.knowledge = {
    actions: function () { return this.list_actions() },
    paradoxes: 'There are two types of <b>Paradoxes</b> in Paradise. The first kind, is vessels folded onto themselves, existing within their own space. The second type, is vessels organized in a loop, where there are no real beginning to a space, a deeply nested vessel might become the parent of a first type paradox and create this kind of shape.',
    passive: "The <b>Passive</b> <action data='learn to trigger'>trigger</action>, is used to add dynamic content to the browser.",
    lisp: "<b>WildcardLISP</b> is a variant of the LISP programming language. It is based around nested brackets and <action data='learn about wildcards'>wildcards</action>, and can be embedded in vessel programs and triggers, as well as eveluated using echo. To embed WildcardLISP, use the following syntax: <code>@(lisp goes here)</code>",
    wildcards: "<b>Wildcards</b> are the equivalent of actions for <action data='learn about lisp'>WildcardLISP</action>. They follow the format <code>@(wildcard inputs)</code>.<br />There are several <action data='learn about groups'>groups</action> of wildcards.",
    groups: function () { return this.list_groups() }
  }

  this.operate = function (action, params) {
    if (!params) {
      params = 'to learn' // `learn` -> `learn to learn`
    }

    const parts = params.split(' ')

    if ((!parts[0]) || (!parts[1])) {
      return errors.NOVALID(action, false)
    }

    const method = parts[0].toString().toLowerCase()
    const target = parts[1].toString().toLowerCase()

    if (method === 'to') {
      return this.learn_action(parts, target)
    } else if (method === 'about') {
      if (target[0] === '@') {
        if (target[1] === ':') {
          return this.learn_wildcard_group(parts, target)
        } else {
          return this.learn_wildcard(parts, target)
        }
      } else {
        return this.learn_knowledge(parts, target)
      }
    } else {
      return errors.NOVALID(action, false)
    }
  }

  this.learn_action = function (parts, target) {
    if (!target) {
      return errors.UNKNOWN(target)
    }

    try {
      const a = require(`./${target}`)
      const obj = new a()
      const image_src = `media/graphics/${obj.name}.png`
      const alt_src = 'media/graphics/default.png'
      let out = `<img src='${image_src}' onerror='this.onerror=null; this.src="${alt_src}"' />`
      out += `<p>${obj.docs}<br /><br />Type <action>learn about actions</action> again to see the available actions.</p>`
      return out
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        return errors.UNKNOWN(target, 'action', false)
      }
      throw err
    }
  }

  this.learn_wildcard = function (parts, target) {
    target = target ? target.replace('@', '') : null
    const descriptions = wildcards.descriptions()
    if (target && descriptions[target]) {
      const desc = descriptions[target]
      let out = `Documentation for @${target}: <br /><br />`
      out += (desc.inputs.length > 0) ? `Accepts inputs: <code>${desc.inputs.join(', ')}</code><br />` : ''
      out += desc.description
      return out
    } else {
      return errors.UNKNOWN(target, 'wildcard', false)
    }
  }

  this.learn_wildcard_group = function (parts, target) {
    target = target ? target.replace('@:', '') : null
    const groups = wildcards.groups
    if (target && groups[target]) {
      let cards = Object.keys(require(`../wildcards/${target}`).descriptions())
      cards = cards.map(function (name) { return `@${name}` })
      return `Documentation for @:${target}:<br />${groups[target]}<br /><br />Includes wildcards: ${cards.map(function (inp) { return `<action data='learn about ${inp}'>${inp}</action>` }).join(', ')}`
    } else {
      return errors.UNKNOWN(target, 'group', false)
    }
  }

  this.learn_knowledge = function (parts, target) {
    if (target && this.knowledge[target]) {
      if (typeof this.knowledge[target] === 'function') {
        return this.knowledge[target].call(this)
      }
      return this.knowledge[target]
    } else if (target === 'knowledge') {
      return `Available knowledge:<br /><br />${Object.keys(this.knowledge).map(function (inp) { return `<action data='learn about ${inp}'>${inp}</action>` }).join('<br />')}`
    } else {
      return errors.UNKNOWN(target, 'term', false)
    }
  }

  this.list_actions = function () {
    const _actions = [
      'look',

      'create',
      'become',
      'enter',
      'leave',

      'warp',
      'take',
      'drop',
      'inventory',
      'move',

      'learn',
      'note',
      'transform',
      'inspect',

      'trigger',
      'program',
      'use',
      'cast',
      'echo'
    ]
    return `Available actions:<br /><br />${_actions.map(function (inp) { return `<action data='learn to ${inp}'>${inp}</action>` }).join('<br />')}`
  }

  this.list_groups = function () {
    const groups = Object.keys(wildcards.groups).map(function (name) { return `@:${name}` })
    return `Groups:<br /><br />${groups.map(function (inp) { return `<action data='learn about ${inp}'>${inp}</action>` }).join('<br />')}`
  }
}

module.exports = Learn
