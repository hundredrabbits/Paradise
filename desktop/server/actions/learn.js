'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')
const helpers = require('../core/helpers')

// TODO: Add wildcard docs here

function Learn (host) {
  Action.call(this, host, 'learn')

  this.knowledge = {
    actions: 'todo call actions_general() to generate this',
    paradoxes: 'There are two types of <b>Paradoxes</b> in Paradise. The first kind, is vessels folded onto themselves, existing within their own space. The second type, is vessels organized in a loop, where there are no real beginning to a space, a deeply nested vessel might become the parent of a first type paradox and create this kind of shape.',
    passive: "The <b>Passive</b> <action data='learn to trigger'>trigger</action>, is used to add dynamic content to the browser.",
    lisp: "WildcardLISP is a variant of the LISP programming language. It is based around nested brackets and <action data='learn about wildcards'>wildcards</action>, and can be embedded in vessel programs and triggers, as well as eveluated using echo. To embed WildcardLISP, use the following syntax: <code>@(lisp goes here)</code>",
    wildcards: "Wildcards are the equivalent of actions for <action data='learn about lisp'>WildcardLISP</action>. They follow the format <code>@(wildcard inputs)</code>.<br />There are several groups of wildcards:<br />[insert groups here]",
  }

  this.operate = function (action, params) {
    const parts = params.split(' ')
    const method = parts[0]
    if (method == "to") {
      const target = parts[parts.length - 1].toLowerCase()
      try {
        const a = require(`./${target}`)
        const obj = new a()
        return `<img src='media/graphics/${obj.name}.png'/><p>${obj.docs} Type <action>learn</action> again to see the available actions.</p>`
      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          return this.default(target, 'action')
        }
        throw err
      }
    } else if (method == "about") {
      const target = parts[parts.length - 1].toLowerCase()
      if (false) { // In wildcard docs

      } else {
        return this.default(target, 'term')
      }
    } else {
      return this.default(null, 'term')
    }
  }

  this.default = function (key, method = 'action') {
    if (key) {
      if (method == 'term' && this.knowledge[key]) {
        return `<p>${this.knowledge[key]}</p>`
      } else {
        return errors.UNKNOWN(key, method, false)
      }
    } else if (method == 'action') {
      return this.actions_general()
    } else {
      return 'insert some docs for learn here'
    }
  }

  this.actions_general = function () {
    const docs = this.action_documentation()
    const count = Object.keys(docs).length

    let index = 2
    let _list = ''
    for (const id in docs) {
      if (id == 'learn') { continue }
      _list += `<action data='learn to ${id}'>${id.toSentenceCase()}</action>${index == count - 1 ? ' or ' : (index == count ? '. ' : ', ')} `
      index += 1
    }
    return `<img src='media/graphics/default.png'/><p>Which action would you like to <action data='learn'>learn</action>? ${_list}</p>`
  }

  this.action_documentation = function () {
    const actions = {}

    const _actions = {
      look: require('./look'),

      create: require('./create'),
      become: require('./become'),
      enter: require('./enter'),
      leave: require('./leave'),

      warp: require('./warp'),
      take: require('./take'),
      drop: require('./drop'),
      inventory: require('./inventory'),
      move: require('./move'),

      learn: require('./learn'),
      note: require('./note'),
      transform: require('./transform'),
      inspect: require('./inspect'),

      trigger: require('./trigger'),
      program: require('./program'),
      use: require('./use'),
      cast: require('./cast'),
      echo: require('./echo')
    }
    for (const id in _actions) {
      const action = new _actions[id]()
      actions[id] = action.docs
    }
    return actions
  }
}

module.exports = Learn
