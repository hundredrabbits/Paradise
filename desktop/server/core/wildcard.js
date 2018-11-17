'use strict'

const Lisp = require('./lisp')
const clock = require('./clock')
const helpers = require('./helpers')
const errors = require('./errors')

// TODO: Document all wildcards
// TODO: Allow access of documentation inworld (eg. `learn about @siblings`)

function Wildcard (host, input, query, responder) {
  const lib = {

    // Sights

    // Returns the current vessel's ID
    self: function () {
      return host.id
    },
    // Returns the vessel's parent's ID
    parent: function () {
      return host.parent().id
    },
    // Returns the current vessel's stem
    stem: function () {
      return host.stem().id
    },

    // TODO: usables  - takes list, returns list

    // Returns the given vessel's siblings
    siblings: function (id = host.id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.siblings().map(function (sibling) {
        return sibling.id
      })
    },
    // Returns the given vessel's children
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

    // Is the given vessel a paradox?
    is_paradox: function (id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.is_paradox() ? 'true' : helpers.nil
    },

    // Is the given vessel a program?
    is_program: function (id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.is_program() ? 'true' : helpers.nil
    },

    // Is the given vessel usable?
    is_usable: function (id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.usable() ? 'true' : helpers.nil
    },

    // Is the given vessel passive?
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

    // Concatenate strings
    concat: function (separator = '', ...items) {
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
      return items.reduce((a, b) => a.toString() + separator + b.toString())
    },
    // Lowercase
    lc: function (str) {
      return str ? `${str}`.toLowerCase() : ''
    },
    // Sentence case
    // TODO: Use helpers
    cc: function (str) {
      return str ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : ''
    },
    // Upper case
    uc: function (str) {
      return str ? `${str}`.toUpperCase() : ''
    },
    // Title case
    tc: function (str) {
      return str ? str.toTitleCase() : ''
    },
    // Format a string to be an action
    format: function (word, settings) {
      return settings ? `<action data='${settings}'>${word}</action>` : `<action>${word}</action>`
    },

    // Programming

    // The query that caused this evaluation
    // Use sparingly
    query: function () {
      return query ? query : helpers.nil
    },
    // The vessel that caused this evaluation
    responder: function () {
      return responder ? responder.id : helpers.nil
    },
    // Whether this vessel's previous action succeded
    success: function () {
      return !host.data.last_error ? 'true' : helpers.nil
    },
    // The error raised by this vessel's last action, or `nil` otherwise
    error: function () {
      return host.data.last_error ? host.data.last_error.to_a() : helpers.nil
    },

    // Arithmetic

    // Add numbers together
    add: function (...items) {
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
      return items.reduce((a, b) => a + b, 0)
    },
    // Subtract b from a
    sub: function (a, b) {
      return a - b
    },
    // Multiply numbers together
    mult: function (...items) {
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
      return items.reduce((a, b) => a * b, 1)
    },
    // Divide a by b
    div: function (a, b) {
      return a / b
    },
    // Raise a to the power of b
    pow: function (a, b) {
      return a ** b
    },
    // Increment a
    inc: function (a) {
      return a + 1
    },
    // Decrement a
    dec: function (a) {
      return a - 1
    },

    // Logic
    // Does a equal b? ('true' if yes, `nil` if no)
    equal: function (a, b) {
      if ((typeof a === 'function' ? a() : a) == (typeof b === 'function' ? b() : b)) {
        return "true"
      }
      return helpers.nil
    },
    // If `i` then `t` else `e`
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
    // Return first non-nil input if all inputs are non-nil
    and: function (...items) {
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
    // Return first non-nil input (or `nil` if there are none)
    or: function (...items) {
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
    // TODO: Add proper error handling

    // Transform a sequence of inputs into a list
    list: function (...items) {
      if (!items) {
        return helpers.nil
      }
      return items
    },

    // Push an element to the end of a list
    // REVIEW: Which order should element and list be in?
    push: function (element, list) {
      if (!element || !list) {
        return helpers.nil
      }
      list.push(element)
      return list
    },

    // Pop an element from the end of a list
    pop: function (list) {
      if (!list) {
        return helpers.nil
      }
      return list.pop()
    },

    // Get an element from a list
    // REVIEW: Which order should index and list be in?
    get: function (index, list) {
      if (!index || !list) {
        return helpers.nil
      }
      return list[index]
    },

    // Set an element of a list
    // REVIEW: Which order should index, value, and list be in?
    set: function (index, value, list) {
      if (!index || !value || !list) {
        return helpers.nil
      }
      list[index] = value
      return list
    },

    // The length of a list
    length: function (list) {
      if (!list) {
        return helpers.nil
      }
      return list.length
    },

    // Generate a list.
    // `range length` - list starts at zero and is made of `length` increasing numbers
    // `range start end` - list ranges from `start` to `end` (inclusive at start, exclusive at end)
    // eg.
    // `range 5`   -> [0, 1, 2, 3, 4]
    // `range 3 7` -> [3, 4, 5, 6]
    range: function (a, b) {
      let start, end
      if (!!a && !b) { // If start is defined but not end
        start = 0
        end = a
      } else if (!!a && !!b) {
        start = a
        end = b
      } else {
        // error
      }
      if (isNaN(parseInt(start)) || isNaN(parseInt(end)) || parseInt(start) > parseInt(end)) {
        // error
      }
      const size = (end - start)
      return [...Array(size).keys()].map(i => i + start)
    },

    // TODO: contains(list, thing)
    // TODO: a concat for lists - or maybe if all args are lists, it concats those, and if all args are strings, it concats those.

    // Iterate over list elements
    // eg. `create chair & create table & echo @( map siblings ( lambda (id) ( vessel id name ) ) )`
    map: function (list, func) {
      if (typeof list === 'function') {
        list = list()
      }

      if (list instanceof Array) {
        return list.map(func)
      }
    },

    // Main

    // TODO: Convert to Errors

    // Return the data field `field` of the specified vessel by ID
    vessel: function (id, field) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return field && target.data[field] ? target.data[field] : target
    },
    // Return `true` if the vessel 'id' is carrying the target
    carry: function (id, target) {
      if (typeof id === 'function') { id = id() }
      const children = host.children()
      for (const i in children) {
        if (children[i].is(target)) { return `true` }
      }
      return helpers.nil
    },
    // Return a random number from a list or a sequence of inputs
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
