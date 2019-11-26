'use strict'

const helpers = require('../core/helpers')

// TODO: Move to helpers.js

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
function merge_options (obj1, obj2) {
  var obj3 = {}
  for (var attrname in obj1) { obj3[attrname] = obj1[attrname] }
  for (var attrname in obj2) { obj3[attrname] = obj2[attrname] }
  return obj3
}

const _groups = {
  mathematics: 'Mathematics wildcards. Used for manipulation of numbers.',
  logic: 'Logic wildcards. Used for program flow.',

  vessels: 'Vessel wildcards. Used to find vessels and their properties.',

  string_utilities: 'String wildcards. Used to transform strings of text.',
  list_utilities: 'List wildcards. Used to perform operations on lists.',
  program_utilities: 'Program utilities. Used to interact with the current program.',
  random_utilities: 'Random utilities. Used to generate and use random numbers.',
  clock_utilities: 'Clock utilities. Used to find and use the current time.'
}

const groups = []

for (var name in _groups) {
  const group = require(`./${name}`)
  groups.push(group)
}

const exp = {
  lib: function (host, input, query, responder) {
    let _lib = {}
    for (var id in groups) {
      const group = groups[id]
      _lib = merge_options(_lib, group.lib(host, input, query, responder))
    }
    return _lib
  },

  descriptions: function () {
    let _desc = {}
    for (var id in groups) {
      const group = groups[id]
      _desc = merge_options(_desc, group.descriptions())
    }
    return _desc
  },

  groups: _groups
}

module.exports = exp
