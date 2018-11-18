'use strict'

const helpers = require('../core/helpers')

const _lib = {

  // TODO: Add proper error handling

  // Transform a sequence of inputs into a list
  list: function (context, ...items) {
    if (!items) {
      return helpers.nil
    }
    return items
  },

  // Push an element to the end of a list
  // REVIEW: Which order should element and list be in?
  push: function (context, element, list) {
    if (!element || !list) {
      return helpers.nil
    }
    list.push(element)
    return list
  },

  // Pop an element from the end of a list
  pop: function (context, list) {
    if (!list) {
      return helpers.nil
    }
    return list.pop()
  },

  // Get an element from a list
  // REVIEW: Which order should index and list be in?
  get: function (context, index, list) {
    if (!index || !list) {
      return helpers.nil
    }
    return list[index]
  },

  // Set an element of a list
  // REVIEW: Which order should index, value, and list be in?
  set: function (context, index, value, list) {
    if (!index || !value || !list) {
      return helpers.nil
    }
    list[index] = value
    return list
  },

  // The length of a list
  length: function (context, list) {
    if (!list) {
      return helpers.nil
    }
    return list.length
  },

  // TODO: add error checking
  // Concatenate lists
  concatl: function (context, ...items) {
    let out = []
    for (var id in items) {
      out.concat(items[id])
    }
    return out
  },

  // Generate a list.
  // `range length` - list starts at zero and is made of `length` increasing numbers
  // `range start end` - list ranges from `start` to `end` (inclusive at start, exclusive at end)
  // eg.
  // `range 5`   -> [0, 1, 2, 3, 4]
  // `range 3 7` -> [3, 4, 5, 6]
  range: function (context, a, b) {
    let start, end
    if (!!a && !b) { // If start is defined but not end
      start = 0
      end = a
    } else if (!!a && !!b) {
      start = a
      end = b
    } else {
      // error
    }
    if (isNaN(parseInt(start)) || isNaN(parseInt(end)) || parseInt(start) > parseInt(end)) {
      // error
    }
    const size = (end - start)
    return [...Array(size).keys()].map(i => i + start)
  },

  // TODO: contains(list, thing)
  // TODO: a concat for lists - or maybe if all args are lists, it concats those, and if all args are strings, it concats those.

  // Iterate over list elements
  // eg. `create chair & create table & echo @( map siblings ( lambda (id) ( vessel id name ) ) )`
  map: function (context, list, func) {
    if (typeof list === 'function') {
      list = list()
    }

    if (list instanceof Array) {
      return list.map(func)
    }
  }

}

function lib (_host, _input, _query, _responder) {
  let out = {}
  for (var name in _lib) {
    const func = _lib[name]
    const new_func = function (...given) {
      let args = []
      args.push({ host: _host, input: _input, query: _query, responder: _responder })
      args.push.apply(args, given)
      return func.apply(null, args)
    }
    out[name] = new_func
  }

  return out
}

module.exports = lib
