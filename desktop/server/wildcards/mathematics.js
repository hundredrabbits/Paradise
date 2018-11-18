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
  // Subtract a from b
  sub: function (context, a, b) {
    return b - a
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

function lib (_host, _input, _query, _responder) {
  let out = {}
  for (var name in _lib) {
    const func = _lib[name]
    const new_func = function (...given) {
      let args = []
      args.push({host: _host, input: _input, query: _query, responder: _responder})
      args.push.apply(args, given)
      return func.apply(null, args)
    }
    out[name] = new_func
  }

  return out
}

module.exports = lib
