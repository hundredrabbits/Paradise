'use strict'

const helpers = require('../core/helpers')

const _lib = [

  // TODO: Add proper error handling

  {
    props: ['list', ['...items'], 'Transform a sequence of inputs into a list.'],
    func: function (context, ...items) {
      if (!items) {
        return helpers.nil
      }
      return items
    }
  },

  // REVIEW: Which order should element and list be in?
  {
    props: ['push', ['element', 'list'], 'Push an element to the end of a list.'],
    func: function (context, element, list) {
      if (!element || !list) {
        return helpers.nil
      }
      list.push(element)
      return list
    }
  },

  {
    props: ['pop', ['list'], 'Pop an element from the end of a list.'],
    func: function (context, list) {
      if (!list) {
        return helpers.nil
      }
      return list.pop()
    }
  },

  // REVIEW: Which order should index and list be in?
  {
    props: ['get', ['index', 'list'], 'Get an element from a list.'],
    func: function (context, index, list) {
      if (!index || !list) {
        return helpers.nil
      }
      return list[index]
    }
  },

  // REVIEW: Which order should index, value, and list be in?
  {
    props: ['set', ['index', 'value', 'list'], 'Set an element of a list.'],
    func: function (context, index, value, list) {
      if (!index || !value || !list) {
        return helpers.nil
      }
      list[index] = value
      return list
    }
  },

  {
    props: ['length', ['list'], 'Get the length of a list.'],
    func: function (context, list) {
      if (!list) {
        return helpers.nil
      }
      return list.length
    }
  },

  // TODO: add error checking
  {
    props: ['concatl', ['...items'], 'Concatenate a sequence of lists.'],
    func: function (context, ...items) {
      let out = []
      for (var id in items) {
        out.concat(items[id])
      }
      return out
    }
  },

  // eg.
  // `range 5`   -> [0, 1, 2, 3, 4]
  // `range 3 7` -> [3, 4, 5, 6]
  {
    props: ['range', ['a', 'b'], 'Generate a list. Accepts two formats: <code>range length</code> and <code>range start end</code>. The <code>end</code> value is not included.'],
    func: function (context, a, b) {
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
    }
  },

  // TODO: contains(list, thing)

  // eg. `create chair & create table & echo @( map siblings ( lambda (id) ( vessel id name ) ) )`
  {
    props: ['map', ['list', 'function'], 'Iterate over list elements. The return values of the function will modify the list values.'],
    func: function (context, list, func) {
      if (typeof list === 'function') {
        list = list()
      }

      if (list instanceof Array) {
        return list.map(func)
      }
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
