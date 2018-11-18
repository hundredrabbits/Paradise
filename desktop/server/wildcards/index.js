'use strict'

const helpers = require('../core/helpers')

// TODO: Move to helpers.js

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

const _groups = [
  'mathematics',
  'logic',

  'vessels',

  'string_utilities',
  'list_utilities',
  'program_utilities',
  'random_utilities',
  'clock_utilities',
]

let groups = []

for (var id in _groups) {
  const group = require(`./${_groups[id]}`)
  groups.push(group)
}

function lib (host, input, query, responder) {
  let _lib = {}
  for (var id in groups) {
    const group = groups[id]
    _lib = merge_options(_lib, group(host, input, query, responder))
  }
  return _lib
}

module.exports = lib
