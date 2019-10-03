'use strict'

const helpers = require('../core/helpers')

const _lib = [

  {
    props: ['tostring', ['a'], 'Convert "a" to a string. Does not work on nil.'],
    func: function (context, a) {
      if (a && !(a === helpers.nil) && a.toString) {
        return a.toString()
      } else {
        return helpers.nil
      }
    }
  },

  {
    props: ['pretty', ['a', 'number_commas = true'], 'Convert "a" to a string and make it human readable.'],
    func: function (context, a, number_commas = true) {
      if (!a || a === helpers.nil) { // BUG: Returns nil when a === 0
        return 'nil' // REVIEW: "nil" or nil?
      } else if (typeof a === 'string') {
        return a
      } else if (typeof a === 'number') {
        if (number_commas === helpers.nil) {
          return a.toString()
        } else {
          let parts = a.toString().split('.')
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          return parts.join('.')
        }
      } else if (a instanceof Array) {
        return `[${a.join(', ')}]` // REVIEW: Should we use square-bracket format? Or is another format better for WildcardLISP?
        // TODO: Recurse over all list items?
      } else if (typeof a === 'function') {
        return 'nil' // REVIEW: "nil" or nil?
        // REVIEW: Should return nil?
      } else if (a.toString) {
        return a.toString()
      } else {
        return 'nil' // REVIEW: "nil" or nil?
      }
    }
  },

  {
    props: ['concats', ['...items'], 'Concatenate strings.'],
    func: function (context, separator = '', ...items) {
      if (items.length === 1 && items[0] instanceof Array) {
        items = items[0]
      }
      return items.reduce((a, b) => a.toString() + separator + b.toString())
    }
  },

  {
    props: ['lc', ['string'], 'Return the lowercase of the string.'],
    func: function (context, str) {
      return str ? `${str}`.toLowerCase() : ''
    }
  },

  // TODO: Use helpers
  {
    props: ['cc', ['string'], 'Return the sentence case of the string.'],
    func: function (context, str) {
      str = str.toString()
      return str ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : ''
    }
  },

  {
    props: ['uc', ['string'], 'Return the uppercase of the string.'],
    func: function (context, str) {
      return str ? `${str}`.toUpperCase() : ''
    }
  },

  {
    props: ['tc', ['string'], 'Return the titlecase of the string.'],
    func: function (context, str) {
      return str ? str.toTitleCase() : ''
    }
  },

  {
    props: ['format', ['word', 'settings'], 'Format a string to be an action. It will appear as "word" and will prefill "settings" when clicked.'],
    func: function (context, word, settings) {
      return settings ? `<action data='${settings}'>${word}</action>` : `<action>${word}</action>`
    }
  }

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
