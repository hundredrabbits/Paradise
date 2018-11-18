'use strict'

const helpers = require('../core/helpers')

const _lib = {

  // Return the data field `field` of the specified vessel by ID
  vessel: function (context, id, field) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = context.host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return field && target.data[field] ? target.data[field] : target
  },
  // Return `true` if the vessel 'id' is carrying the target
  carry: function (context, id, target) {
    if (typeof id === 'function') { id = id() }
    const children = context.host.children()
    for (const i in children) {
      if (children[i].is(target)) { return `true` }
    }
    return helpers.nil
  },

  // Returns the current vessel's ID
  self: function (context) {
    return context.host.id
  },
  // TODO These should take vessl IDs
  // Returns the vessel's parent's ID
  parent: function (context) {
    return context.host.parent().id
  },
  // Returns the current vessel's stem
  stem: function (context) {
    return context.host.stem().id
  },

  // TODO: usables  - takes list, returns list

  // Returns the given vessel's siblings
  siblings: function (context, id) {
    if (!id) { id = context.host.id }
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = context.host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.siblings().map(function (sibling) {
      return sibling.id
    })
  },
  // Returns the given vessel's children
  children: function (context, id) {
    if (!id) { id = context.host.id }
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = context.host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.children().map(function (child) {
      return child.id
    })
  },

  // TODO: clean up the id checks; put in helpers.js

  // Is the given vessel a paradox?
  is_paradox: function (context, id) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = context.host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.is_paradox() ? 'true' : helpers.nil
  },

  // Is the given vessel a program?
  is_program: function (context, id) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = context.host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.is_program() ? 'true' : helpers.nil
  },

  // Is the given vessel usable?
  is_usable: function (context, id) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = context.host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.usable() ? 'true' : helpers.nil
  },

  // Is the given vessel passive?
  is_passive: function (context, id) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = context.host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.passive() ? 'true' : helpers.nil
  },

}

function lib (_host, _input, _query, _responder) {
  let out = {}
  for (var name in _lib) {
    const func = _lib[name]
    const new_func = function (...given) {
      let args = []
      args.push({host: _host, input: _input, query: _query, responder: _responder})
      args.push.apply(args, given)
      return func.apply(null, args)
    }
    out[name] = new_func
  }

  return out
}

module.exports = lib
