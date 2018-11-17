'use strict'

const Lisp = require('./lisp')
const clock = require('./clock')
const helpers = require('./helpers')
const errors = require('./errors')


function Wildcard (host, input, query, responder) {
  const lib = {

    // Sights
    self: function () {
      return host.id
    },
    parent: function () {
      return host.parent().id
    },
    stem: function () {
      return host.stem().id
    },
    // TODO: siblings - returns list
    // TODO: children - returns list
    // TODO: usables  - takes list, returns list

    // TODO: clean up the id checks; put in helpers.js

    is_paradox: function (id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.is_paradox() ? 'true' : helpers.nil
    },

    is_program: function (id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.is_program() ? 'true' : helpers.nil
    },

    is_usable: function (id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.usable() ? 'true' : helpers.nil
    },

    is_passive: function (id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.passive() ? 'true' : helpers.nil
    },

    // TODO?: to_a
    // TODO?: toString
    // TODO?: particle, name, type

    // Transform
    concat: function (separator = '', ...items) {
      return items.reduce((a, b) => a.toString() + separator + b.toString())
    },
    lc: function (str) {
      return str ? `${str}`.toLowerCase() : ''
    },
    cc: function (str) {
      return str ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : ''
    },
    uc: function (str) {
      return str ? `${str}`.toUpperCase() : ''
    },
    tc: function (str) {
      return str ? str.toTitleCase() : ''
    },
    format: function (word, settings) {
      return settings ? `<action data='${settings}'>${word}</action>` : `<action>${word}</action>`
    },

    // Programming
    query: function () {
      return query
    },
    responder: function () {
      return responder.id
    },
    success: function () {
      return !host.data.last_error ? 'true' : helpers.nil
    },
    error: function () {
      return host.data.last_error ? host.data.last_error.to_a() : helpers.nil
    },

    // Arithmetic
    add: function (...items) {
      return items.reduce((a, b) => a + b, 0)
    },
    sub: function (a, b) {
      return a - b
    },
    mult: function (...items) {
      return items.reduce((a, b) => a * b, 1)
    },
    div: function (a, b) {
      return a / b
    },
    pow: function (a, b) {
      return a ** b
    },
    inc: function (a) {
      return a + 1
    },
    dec: function (a) {
      return a - 1
    },

    // Logic
    equal: function (a, b) {
      if ((typeof a === 'function' ? a() : a) == (typeof b === 'function' ? b() : b)) {
        return "true"
      }
      return helpers.nil
    },
    if: function (i, t, e) {
      let condition = false
      if (typeof i === 'function') {
        let _i = i()
        condition = (!_i || (_i === helpers.nil) ? false : true)
      } else {
        condition = (!i || (i === helpers.nil) ? false : true)
      }
      if (condition) {
        return t
      } else {
        return e
      }
    },
    and: function (...items) { // Return first non-nil input if all inputs are non-nil
      let first_non_nil = helpers.nil
      for (var id in items) {
        if (!items[id] || items[id] === helpers.nil) {
          return helpers.nil
        } else if (first_non_nil === helpers.nil) {
          first_non_nil = items[id]
        }
      }
      return first_non_nil
    },
    or: function (...items) { // Return first non-null input
      for (var id in items) {
        if (!!items[id] && !(items[id] === helpers.nil)) {
          return items[id]
        }
      }
      return helpers.nil
    },

    // Clock
    // BUG: keeps returning undefined
    // time:  function () {
    //   return clock.time
    // },
    // beat:  function () {
    //   return clock.beat
    // },
    // pulse: function () {
    //   return clock.pulse
    // },

    // create clock & enter clock & trigger time The time is @( time ) & leave & time

    // Main

    // TODO: Convert to Errors
    vessel: function (id, field) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return field && target.data[field] ? target.data[field] : target
    },
    carry: function (id, target) {
      if (typeof id === 'function') { id = id() }
      const children = host.children()
      for (const i in children) {
        if (children[i].is(target)) { return true }
      }
      return helpers.nil
    },
    random: function (...items) {
      if (items.length === 1 && items[0] instanceof Array) {
        return items[0][Math.floor((Math.random() * items[0].length))]
      } else {
        return items[Math.floor((Math.random() * items.length))]
      }
    }
  }
  Lisp.call(this, input, lib)
}

module.exports = Wildcard
