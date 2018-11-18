'use strict'

const helpers = require('../core/helpers')

const _lib = {

  random: function (context, ...items) {
    if (items.length === 1 && items[0] instanceof Array) {
      items = items[0]
    }
    return items[Math.floor((Math.random() * items.length))]
  },

  randomf: function (context) {
    return Math.random()
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
