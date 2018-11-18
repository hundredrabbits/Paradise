'use strict'

const helpers = require('../core/helpers')

const vessels = {

  // Return the data field `field` of the specified vessel by ID
  vessel: function (id, field) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return field && target.data[field] ? target.data[field] : target
  },
  // Return `true` if the vessel 'id' is carrying the target
  carry: function (id, target) {
    if (typeof id === 'function') { id = id() }
    const children = host.children()
    for (const i in children) {
      if (children[i].is(target)) { return `true` }
    }
    return helpers.nil
  },

  // Returns the current vessel's ID
  self: function () {
    return host.id
  },
  // Returns the vessel's parent's ID
  parent: function () {
    return host.parent().id
  },
  // Returns the current vessel's stem
  stem: function () {
    return host.stem().id
  },

  // TODO: usables  - takes list, returns list

  // Returns the given vessel's siblings
  siblings: function (id = host.id) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.siblings().map(function (sibling) {
      return sibling.id
    })
  },
  // Returns the given vessel's children
  children: function (id = host.id) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.children().map(function (child) {
      return child.id
    })
  },

  // TODO: clean up the id checks; put in helpers.js

  // Is the given vessel a paradox?
  is_paradox: function (id) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.is_paradox() ? 'true' : helpers.nil
  },

  // Is the given vessel a program?
  is_program: function (id) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.is_program() ? 'true' : helpers.nil
  },

  // Is the given vessel usable?
  is_usable: function (id) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.usable() ? 'true' : helpers.nil
  },

  // Is the given vessel passive?
  is_passive: function (id) {
    if (typeof id === 'function') { id = id() }
    if (typeof id !== 'number') { return '(error:misformated function)' }
    const target = host.paradise.world[id]
    if (!target) { return `(error:unknown vessel-${id})` }
    return target.passive() ? 'true' : helpers.nil
  },

}

module.exports = vessels
