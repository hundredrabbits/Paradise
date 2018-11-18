'use strict'

const helpers = require('../core/helpers')

const _logic = {

  // Does a equal b? ('true' if yes, `nil` if no)
  equal: function (a, b) {
    if ((typeof a === 'function' ? a() : a) == (typeof b === 'function' ? b() : b)) {
      return "true"
    }
    return helpers.nil
  },
  // If `i` then `t` else `e`
  if: function (i, t, e) {
    let condition = false
    if (typeof i === 'function') {
      let _i = i()
      condition = (!_i || (_i === helpers.nil) ? false : true)
    } else {
      condition = (!i || (i === helpers.nil) ? false : true)
    }
    if (condition) {
      return t
    } else {
      return e
    }
  },
  // Return first non-nil input if all inputs are non-nil
  and: function (...items) {
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
  },
  // Return first non-nil input (or `nil` if there are none)
  or: function (...items) {
    if (items.length === 1 && items[0] instanceof Array) {
      items = items[0]
    }
    for (var id in items) {
      if (!!items[id] && !(items[id] === helpers.nil)) {
        return items[id]
      }
    }
    return helpers.nil
  },

}

function logic (host, input, query, responder) {
  return _logic
}

module.exports = logic
