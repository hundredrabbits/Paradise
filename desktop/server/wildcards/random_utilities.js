'use strict'

const helpers = require('../core/helpers')

const _lib = [

  {
    props: ["random", ['...items'], 'Pick a random item.'],
    func:  function (context, ...items) {
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
      return items[Math.floor((Math.random() * items.length))]
    }
  },

  {
    props: ["randomf", [], 'Pick a random number between 0 and 1.'],
    func: function (context) {
      return Math.random()
    }
  },

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
      props = _lib[id].props
      out[props[0]] = {inputs: props[1], description: props[2]}
    }
    return out
  }
}

module.exports = exp
