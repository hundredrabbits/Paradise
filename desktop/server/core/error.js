'use strict'

const basic = {
  name: 'err_GENERIC',
  text: 'An unknown error occurred.'
}

function Error (name = basic.name, text = basic.text) {
  this.name = name
  this.text = text

  this.to_a = function () {
    return this.name ? this.name.toString().replace('err_', '') : ''
  }

  this.toString = function () {
    return this.text
  }
}

module.exports = Error
