'use strict'

const helpers = require('../core/helpers')

const mathematics = {

  // Add numbers together
  add: function (...items) {
    if (items.length === 1 && items[0] instanceof Array) {
      items = items[0]
    }
    return items.reduce((a, b) => a + b, 0)
  },
  // Subtract b from a
  sub: function (a, b) {
    return a - b
  },
  // Multiply numbers together
  mult: function (...items) {
    if (items.length === 1 && items[0] instanceof Array) {
      items = items[0]
    }
    return items.reduce((a, b) => a * b, 1)
  },
  // Divide a by b
  div: function (a, b) {
    return a / b
  },
  // Raise a to the power of b
  pow: function (a, b) {
    return a ** b
  },
  // Increment a
  inc: function (a) {
    return a + 1
  },
  // Decrement a
  dec: function (a) {
    return a - 1
  },

}

module.exports = mathematics
