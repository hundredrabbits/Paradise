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
    // TODO: usables  - takes list, returns list
    siblings: function (id = host.id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.siblings().map(function (sibling) {
        return sibling.id
      })
    },
    children: function (id = host.id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.children().map(function (child) {
        return child.id
      })
    },

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
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
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
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
      return items.reduce((a, b) => a + b, 0)
    },
    sub: function (a, b) {
      return a - b
    },
    mult: function (...items) {
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
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
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
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
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
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

    // List utilities
    // TODO: Add error handling in the slightest because this is awful and hacky

    // Transform a sequence of inputs into a list
    list: function (...items) {
      return items
    },

    // Push an element to the end of a list
    // REVIEW: Which order should element and list be in?
    push: function (element, list) {
      list.push(element)
      return list
    },

    // Pop an element from the end of a list
    pop: function (list) {
      return list.pop()
    },

    // Get an element from a list
    // REVIEW: Which order should index and list be in?
    get: function (index, list) {
      return list[index]
    },

    // Set an element of a list
    // REVIEW: Which order should index, value, and list be in?
    set: function (index, value, list) {
      list[index] = value
      return list
    },

    // The length of a list
    length: function (list) {
      return list.length
    },

    // Iterate over list elements
    map: function (list, func) {
      if (typeof list === 'function') {
        list = list()
      }
      console.log(list);
      console.log(func);

      if (list instanceof Array) {
        return list.map(func)
      }
    },

    // BUG:
    // create chair & create table & echo @( map siblings ( lambda id ( vessel id name ) ) )
    // fails

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
        items = items[0]
      }
      return items[Math.floor((Math.random() * items.length))]
    },
  }
  Lisp.call(this, input, lib)
}

module.exports = Wildcard
