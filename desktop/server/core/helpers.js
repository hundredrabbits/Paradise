'use strict'

const _helpers = {
  nil: function() {
    this.toString = function() {
      return 'nil'
    }
  }
}

module.exports = _helpers
