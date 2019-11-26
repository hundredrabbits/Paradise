'use strict'

const helpers = require('../core/helpers')
const clock = require('../core/clock')

const _lib = [

  {
    props: ['time', [], 'Return the current time in Desamber format.'],
    func: function (context) {
      return clock.time
    }
  },

  {
    props: ['beat', [], 'Return the current beat in Desamber format.'],
    func: function (context) {
      return clock.beat
    }
  },

  {
    props: ['pulse', [], 'Return the current pulse in Desamber format.'],
    func: function (context) {
      return clock.pulse
    }
  }

  // create clock & enter clock & trigger time The time is @( time ) & leave & time

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
