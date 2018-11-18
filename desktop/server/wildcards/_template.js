'use strict'

const helpers = require('../core/helpers')

const _lib = {
  // Functions go here
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
