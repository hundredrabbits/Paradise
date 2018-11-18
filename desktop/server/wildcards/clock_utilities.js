'use strict'

const helpers = require('../core/helpers')


const _lib = {

  // Clock
  // BUG: keeps returning undefined
  time:  function (context) {
    return clock.time
  },
  beat:  function (context) {
    return clock.beat
  },
  pulse: function (context) {
    return clock.pulse
  },

  // create clock & enter clock & trigger time The time is @( time ) & leave & time

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
