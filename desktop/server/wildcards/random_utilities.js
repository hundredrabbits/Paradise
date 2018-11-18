'use strict'

const helpers = require('../core/helpers')

const _lib = {

  random: function (context, ...items) {
    if (items.length === 1 && items[0] instanceof Array) {
      items = items[0]
    }
    return items[Math.floor((Math.random() * items.length))]
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
