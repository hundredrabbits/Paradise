'use strict'

const helpers = require('../core/helpers')

const _lib = [

  {
    props: ['equal', ['a', 'b'], 'Return "true" if a is b, or nil otherwise.'],
    func: function (context, a, b) {
      if ((typeof a === 'function' ? a() : a) == (typeof b === 'function' ? b() : b)) {
        return 'true'
      }
      return helpers.nil
    }
  },

  {
    props: ['if', ['condition', 'then', 'else'], 'If condition is not nil, return "then". Otherwise, return "else".'],
    func: function (context, i, t, e) {
      let condition = false
      if (typeof i === 'function') {
        const _i = i()
        condition = (!(!_i || (_i === helpers.nil)))
      } else {
        condition = (!(!i || (i === helpers.nil)))
      }
      if (condition) {
        return t
      } else {
        return e
      }
    }
  },

  {
    props: ['and', ['...items'], 'Return first non-nil input if all inputs are non-first_non_nil (or nil if there are none).'],
    func: function (context, ...items) {
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
      let first_non_nil = helpers.nil
      for (var id in items) {
        if (!items[id] || items[id] === helpers.nil) {
          return helpers.nil
        } else if (first_non_nil === helpers.nil) {
          first_non_nil = items[id]
        }
      }
      return first_non_nil
    }
  },

  {
    props: ['or', ['...items'], 'Return first non-nil input (or nil if there are none).'],
    func: function (context, ...items) {
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
      for (var id in items) {
        if (!!items[id] && !(items[id] === helpers.nil)) {
          return items[id]
        }
      }
      return helpers.nil
    }
  }

]

const exp = {
  lib: function (_host, _input, _query, _responder) {
    const out = {}
    for (var id in _lib) {
      const func = _lib[id].func
      const new_func = function (...given) {
        const args = []
        args.push({ host: _host, input: _input, query: _query, responder: _responder })
        args.push.apply(args, given)
        return func.apply(null, args)
      }
      out[_lib[id].props[0]] = new_func
    }

    return out
  },

  descriptions: function () {
    const out = {}
    for (var id in _lib) {
      const props = _lib[id].props
      out[props[0]] = { inputs: props[1], description: props[2] }
    }
    return out
  }
}

module.exports = exp
