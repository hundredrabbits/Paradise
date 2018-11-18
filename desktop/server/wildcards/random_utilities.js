'use strict'

const helpers = require('../core/helpers')

const _random_utilities = {

  random: function (...items) {
    if (items.length === 1 && items[0] instanceof Array) {
      items = items[0]
    }
    return items[Math.floor((Math.random() * items.length))]
  },

}

function random_utilities (host, input, query, responder) {
  return _random_utilities
}

module.exports = random_utilities
