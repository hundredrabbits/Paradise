'use strict'

const _nil = function() {
  this.toString = function() {
    return 'nil'
  }
}

const _helpers = {
  nil: new _nil()
}

module.exports = _helpers
