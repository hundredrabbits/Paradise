'use strict'

const helpers = require('../core/helpers')

const _lib = [

  {
    props: ["vessel", ['id', 'field'], 'Return the data field `field` of the specified vessel by ID.'],
    func: function (context, id, field) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = context.host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return field && target.data[field] ? target.data[field] : target
    }
  },

  {
    props: ["carry", ['id', 'target'], 'Return "true" if the vessel "id" is carrying the target (or nil if not).'],
    func: function (context, id, target) {
      if (typeof id === 'function') { id = id() }
      const children = context.host.children()
      for (const i in children) {
        if (children[i].is(target)) { return `true` }
      }
      return helpers.nil
    }
  },

  {
    props: ["self", [], 'The current vessel\'s ID.'],
    func: function (context) {
      return context.host.id
    }
  },

  // TODO These should take vessel IDs
  {
    props: ["parent", [], 'The vessel\'s parent\'s ID.'],
    func: function (context) {
      return context.host.parent().id
    }
  },

  {
    props: ["stem", [], 'The current vessel\'s stem'],
    func: function (context) {
      return context.host.stem().id
    }
  },

  // TODO: usables  - takes list, returns list

  {
    props: ["siblings", ['id'], 'The given vessel\'s siblings'],
    func: function (context, id) {
      if (!id) { id = context.host.id }
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = context.host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.siblings().map(function (sibling) {
        return sibling.id
      })
    }
  },

  {
    props: ["children", ['id'], 'The given vessel\'s children'],
    func: function (context, id) {
      if (!id) { id = context.host.id }
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = context.host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.children().map(function (child) {
        return child.id
      })
    }
  },

  // TODO: clean up the id checks; put in helpers.js

  {
    props: ["is_paradox", ['id'], 'Is the given vessel a paradox?'],
    func: function (context, id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = context.host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.isParadox() ? 'true' : helpers.nil
    }
  },

  {
    props: ["is_program", ['id'], 'Is the given vessel a program?'],
    func: function (context, id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = context.host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.is_program() ? 'true' : helpers.nil
    }
  },

  {
    props: ["is_usable", ['id'], 'Is the given vessel usable?'],
    func: function (context, id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = context.host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.usable() ? 'true' : helpers.nil
    }
  },

  {
    props: ["is_passive", ['id'], 'Is the given vessel passive?'],
    func: function (context, id) {
      if (typeof id === 'function') { id = id() }
      if (typeof id !== 'number') { return '(error:misformated function)' }
      const target = context.host.paradise.world[id]
      if (!target) { return `(error:unknown vessel-${id})` }
      return target.passive() ? 'true' : helpers.nil
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
