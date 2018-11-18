'use strict'

const helpers = require('../core/helpers')

// TODO: Move to helpers.js
function objCombine(obj, variable) {
  for (let key of Object.keys(obj)) {
    if (!variable[key]) variable[key] = {};

    for (let innerKey of Object.keys(obj[key]))
      variable[key][innerKey] = obj[key][innerKey];
  }
}

const groups = [
  'mathematics',
  'logic',

  'vessels',

  'string_utilities',
  'list_utilities',
  'program_utilities',
  'random_utilities',
  'clock_utilities',
]

let lib = {}

for (var id in groups) {
  const group = require(`./${groups[id]}`)
  objCombine(group, lib)
}

module.exports = lib
