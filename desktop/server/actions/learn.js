'use strict'

const Action    = require(`../core/action`)
const errors    = require('../core/errors')
const helpers   = require('../core/helpers')
const wildcards = require('../wildcards')

// TODO: List available knowledge, groups, actions, etc.
// TODO: Add list of actions
// TODO: Add lists of wildcards for each group

function Learn (host) {
  Action.call(this, host, 'learn')

  this.docs = 'The learn command allows you to read documentation for actions, wildcards, groups, and general knowledge.'

  this.knowledge = {
    actions: 'todo call actions_general() to generate this',
    paradoxes: 'There are two types of <b>Paradoxes</b> in Paradise. The first kind, is vessels folded onto themselves, existing within their own space. The second type, is vessels organized in a loop, where there are no real beginning to a space, a deeply nested vessel might become the parent of a first type paradox and create this kind of shape.',
    passive: "The <b>Passive</b> <action data='learn to trigger'>trigger</action>, is used to add dynamic content to the browser.",
    lisp: "WildcardLISP is a variant of the LISP programming language. It is based around nested brackets and <action data='learn about wildcards'>wildcards</action>, and can be embedded in vessel programs and triggers, as well as eveluated using echo. To embed WildcardLISP, use the following syntax: <code>@(lisp goes here)</code>",
    wildcards: "Wildcards are the equivalent of actions for <action data='learn about lisp'>WildcardLISP</action>. They follow the format <code>@(wildcard inputs)</code>.<br />There are several groups of wildcards:<br />[insert groups here]",
  }

  this.operate = function (action, params) {
    if (!params) {
      params = 'to learn' // `learn` -> `learn to learn`
    }

    const parts = params.split(' ')
    const method = parts[0].toString().toLowerCase()
    const target = parts[1].toString().toLowerCase()

    if (method === 'to') {
      return this.learn_action(parts, target)
    } else if (method === 'about') {
      if (target[0] === "@") {
        if (target[1] === ":") {
          return this.learn_wildcard_group(parts, target)
        } else {
          return this.learn_wildcard(parts, target)
        }
      } else {
        return this.learn_knowledge(parts, target)
      }
    } else {
      return errors.NOVALID(action)
    }
  }

  this.learn_action = function (parts, target) {
    if (!target) {
      return errors.UNKNOWN(target)
    }

    try {
      const a = require(`./${target}`)
      const obj = new a()
      return `<img src='media/graphics/${obj.name}.png'/><p>${obj.docs}<br /><br />Type <action>learn</action> again to see the available actions.</p>`
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        return errors.UNKNOWN(target)
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
      out += desc.inputs ? `Accepts inputs: <code>${desc.inputs.join(', ')}</code><br />` : ''
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
      return groups[target]
    } else {
      return errors.UNKNOWN(target, 'group', false)
    }
  }

  this.learn_knowledge = function (parts, target) {
    if (target && this.knowledge[target]) {
      return this.knowledge[target]
    } else {
      return errors.UNKNOWN(target, 'term', false)
    }
  }
}

module.exports = Learn
