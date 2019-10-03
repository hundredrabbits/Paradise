'use strict'

const helpers = require('../core/helpers')

const _lib = [
  // Functions go here

  // {
  //   props: [name, [inputs], description],
  //   func: function (context, inputs) {
  //     return value
  //   }
  // },
]

const exp = {
  lib: function (_host, _input, _query, _responder) {
    let out = {}
    for (var id in _lib) {
      const func = _lib[id].func
      const new_func = function (...given) {
        let args = []
        args.push({ host: _host, input: _input, query: _query, responder: _responder })
        args.push.apply(args, given)
        return func.apply(null, args)
      }
      out[_lib[id].props[0]] = new_func
    }

    return out
  },

  descriptions: function () {
    let out = {}
    for (var id in _lib) {
      const props = _lib[id].props
      out[props[0]] = { inputs: props[1], description: props[2] }
    }
    return out
  }
}

module.exports = exp
