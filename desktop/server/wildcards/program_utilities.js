'use strict'

const helpers = require('../core/helpers')

const _lib = {

  // The query that caused this evaluation
  // Use sparingly!
  query: function (context) {
    return context.query ? context.query : helpers.nil
  },
  // The vessel that caused this evaluation
  responder: function (context) {
    return context.responder ? context.responder.id : helpers.nil
  },
  // Whether this vessel's previous action succeded
  success: function (context) {
    return !context.host.data.last_error ? 'true' : helpers.nil
  },
  // The error raised by this vessel's last action, or `nil` otherwise
  error: function (context) {
    returncontext. host.data.last_error ? context.host.data.last_error.to_a() : helpers.nil
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
