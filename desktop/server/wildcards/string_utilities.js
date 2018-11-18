'use strict'

const helpers = require('../core/helpers')

const _lib = {

  // Concatenate strings
  concats: function (context, separator = '', ...items) {
    if (items.length === 1 && items[0] instanceof Array) {
      items = items[0]
    }
    return items.reduce((a, b) => a.toString() + separator + b.toString())
  },
  // Lowercase
  lc: function (context, str) {
    return str ? `${str}`.toLowerCase() : ''
  },
  // Sentence case
  // TODO: Use helpers
  cc: function (context, str) {
    return str ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : ''
  },
  // Upper case
  uc: function (context, str) {
    return str ? `${str}`.toUpperCase() : ''
  },
  // Title case
  tc: function (context, str) {
    return str ? str.toTitleCase() : ''
  },
  // Format a string to be an action
  format: function (context, word, settings) {
    return settings ? `<action data='${settings}'>${word}</action>` : `<action>${word}</action>`
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
