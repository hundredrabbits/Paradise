'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')
const helpers = require('../core/helpers')
const wildcards = require('../wildcards')
const fs = require('fs');

function Learn (host) {
  Action.call(this, host, 'learn')

  this.docs = "The learn command allows you to read documentation for <action data='learn about actions'>actions</action>, <action data='learn about wildcards'>wildcards</action>, <action data='learn about groups'>groups</action>, and <action data='learn about knowledge'>general knowledge</action>."

  // Knowledge unrelated to actions or wildcards.
  // `learn about ___`
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
      // `learn to action`
      return this.learn_action(parts, target)
    } else if (method === 'about') {
      // `learn about ___`
      if (target[0] === '@') {
        if (target[1] === ':') {
          // `learn about @wildcard`
          return this.learn_wildcard_group(parts, target)
        } else {
          // `learn about @:group`
          return this.learn_wildcard(parts, target)
        }
      } else {
        // `learn about knowledge`
        return this.learn_knowledge(parts, target)
      }
    } else {
      // Invalid
      return errors.NOVALID(action, false)
    }
  }

  // Learn about an action
  this.learn_action = function (parts, target) {
    if (!target) {
      // Ensure a target is given
      return errors.UNKNOWN(target)
    }

    try {
      // Find action
      const a = require(`./${target}`)
      const obj = new a()
      // Find images
      let out = `<div id="learn_image">${this.obtain_image(obj.name)}</div>`
      out += `<p>${obj.docs}<br /><br />Type <action>learn about actions</action> again to see the available actions.</p>`
      return out
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        // No action file
        return errors.UNKNOWN(target, 'action', false)
      }
      // Other error
      throw err
    }
  }

  // Learn about a wildcard
  this.learn_wildcard = function (parts, target) {
    // Find target
    target = target ? target.replace('@', '') : null
    // Find all wildcard descriptions
    const descriptions = wildcards.descriptions()
    // If the target exists and is valid:
    if (target && descriptions[target]) {
      // Get its description
      const desc = descriptions[target]
      // Compose output
      let out = `Documentation for @${target}: <br /><br />`
      out += (desc.inputs.length > 0) ? `Accepts inputs: <code>${desc.inputs.join(', ')}</code><br />` : ''
      out += desc.description
      return out
    } else {
      // No description found, so target is invalid
      return errors.UNKNOWN(target, 'wildcard', false)
    }
  }

  this.learn_wildcard_group = function (parts, target) {
    // Find target and valid groups
    target = target ? target.replace('@:', '') : null
    const groups = wildcards.groups
    // If the target exists and is valid:
    if (target && groups[target]) {
      // Find wildcards in group
      let cards = Object.keys(require(`../wildcards/${target}`).descriptions())
      // Format wildcards
      cards = cards.map(function (name) { return `@${name}` })
      // Compose output
      return `Documentation for @:${target}:<br />${groups[target]}<br /><br />Includes wildcards: ${cards.map(function (inp) { return `<action data='learn about ${inp}'>${inp}</action>` }).join(', ')}`
    } else {
      // No description found, so target is invalid
      return errors.UNKNOWN(target, 'group', false)
    }
  }

  // Learn other knowledge
  this.learn_knowledge = function (parts, target) {
    // If the target exists and is valid
    if (target && this.knowledge[target]) {
      if (typeof this.knowledge[target] === 'function') {
        // Call it if it is a function
        return this.knowledge[target].call(this)
      }
      // Return the knowledge
      return this.knowledge[target]
    } else if (target === 'knowledge') {
      // List all knowledge
      return `Available knowledge:<br /><br />${Object.keys(this.knowledge).map(function (inp) { return `<action data='learn about ${inp}'>${inp}</action>` }).join('<br />')}`
    } else {
      // Unknown term
      return errors.UNKNOWN(target, 'term', false)
    }
  }

  // List actions
  this.list_actions = function () {
    // TODO: Make this dynamic?
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

  // List groups
  this.list_groups = function () {
    const groups = Object.keys(wildcards.groups).map(function (name) { return `@:${name}` })
    return `Groups:<br /><br />${groups.map(function (inp) { return `<action data='learn about ${inp}'>${inp}</action>` }).join('<br />')}`
  }

  this.obtain_image = function (name, fallback = 'default') {
    // Obtaining an image, so must be an SVG in the graphics directory
    const path = `sources/media/graphics/${name}.svg`
    // Try to read the file
    try {
      // Success!
      return fs.readFileSync(path, 'utf8')
    } catch (err) {
      if (!fallback) { throw err }
      // Failure; try again with the fallback, but last chance!
      return this.obtain_image(fallback, null)
    }
  }
}

module.exports = Learn
