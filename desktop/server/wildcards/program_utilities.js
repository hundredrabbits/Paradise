'use strict'

const helpers = require('../core/helpers')

const _lib = [

  // Use sparingly!
  // BUG: Can crash / hang if recursion occurs
  {
    props: ["query", [], 'The query that caused this evaluation.'],
    func: function (context) {
      return context.query ? context.query : helpers.nil
    }
  },

  {
    props: ["responder", [], 'The vessel that performed this evaluation.'],
    func: function (context) {
      return context.responder ? context.responder.id : helpers.nil
    }
  },

  {
    props: ["success", [], 'Whether this vessel\'s (self) previous action succeded'],
    func: function (context) {
      return !context.host.data.last_error ? 'true' : helpers.nil
    }
  },

  {
    props: ["error", [], 'The error raised by this vessel\'s last action, or nil otherwise'],
    func: function (context) {
      return context.host.data.last_error ? context.host.data.last_error.to_a() : helpers.nil
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
      const props = _lib[id].props
      out[props[0]] = {inputs: props[1], description: props[2]}
    }
    return out
  }
}

module.exports = exp
