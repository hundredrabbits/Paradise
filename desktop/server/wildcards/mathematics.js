'use strict'

const helpers = require('../core/helpers')

const _lib = [

  {
    props: ["add", ['...items'], 'Sum the items.'],
    func: function (context, ...items) {
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
      return items.reduce((a, b) => a + b, 0)
    }
  },

  {
    props: ["sub", ['a', 'b'], 'Subtract a from b.'],
    func: function (context, a, b) {
      return b - a
    }
  },

  {
    props: ["mult", ['...items'], 'Multiply the items.'],
    func: function (context, ...items) {
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
      return items.reduce((a, b) => a * b, 1)
    }
  },

  {
    props: ["div", ['a', 'b'], 'Divide the a by b.'],
    func: function (context, a, b) {
      return a / b
    }
  },

  {
    props: ["pow", ['a', 'b'], 'Raise a to the power of b.'],
    func:
    function (context, a, b) {
      return a ** b
    }
  },

  {
    props: ["inc", ['a'], 'Increment a.'],
    func: function (context, a) {
      return a + 1
    }
  },

  {
    props: ["dec", ['a'], 'Decrement a.'],
    func: function (context, a) {
      return a - 1
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
