'use strict'

const helpers = require('../core/helpers')

const string_utilities = {

  // Concatenate strings
  concat: function (separator = '', ...items) {
    if (items.length === 1 && items[0] instanceof Array) {
      items = items[0]
    }
    return items.reduce((a, b) => a.toString() + separator + b.toString())
  },
  // Lowercase
  lc: function (str) {
    return str ? `${str}`.toLowerCase() : ''
  },
  // Sentence case
  // TODO: Use helpers
  cc: function (str) {
    return str ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : ''
  },
  // Upper case
  uc: function (str) {
    return str ? `${str}`.toUpperCase() : ''
  },
  // Title case
  tc: function (str) {
    return str ? str.toTitleCase() : ''
  },
  // Format a string to be an action
  format: function (word, settings) {
    return settings ? `<action data='${settings}'>${word}</action>` : `<action>${word}</action>`
  },

}

module.exports = string_utilities
