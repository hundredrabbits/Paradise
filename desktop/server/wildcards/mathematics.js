'use strict'

const helpers = require('../core/helpers')

const _lib = {

  // Add numbers together
  add: function (context, ...items) {
    if (items.length === 1 && items[0] instanceof Array) {
      items = items[0]
    }
    return items.reduce((a, b) => a + b, 0)
  },
  // Subtract b from a
  sub: function (context, a, b) {
    return a - b
  },
  // Multiply numbers together
  mult: function (context, ...items) {
    if (items.length === 1 && items[0] instanceof Array) {
      items = items[0]
    }
    return items.reduce((a, b) => a * b, 1)
  },
  // Divide a by b
  div: function (context, a, b) {
    return a / b
  },
  // Raise a to the power of b
  pow: function (context, a, b) {
    return a ** b
  },
  // Increment a
  inc: function (context, a) {
    return a + 1
  },
  // Decrement a
  dec: function (context, a) {
    return a - 1
  },

}

function lib (host, input, query, responder) {
  let out = {}
  for (var name in _lib) {
    const func = _lib[name]
    const new_func = function () {
      return func({host: host, input: input, query: query, responder: responder})
    }
    out[name] = new_func
  }

  return out
}

module.exports = lib
