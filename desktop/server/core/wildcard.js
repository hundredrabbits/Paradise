'use strict'

const Lisp = require('./lisp')
const clock = require('./clock')
const helpers = require('./helpers')
const errors = require('./errors')
const lib = require('../wildcards').lib

// TODO: Allow access of documentation inworld (eg. `learn about @siblings`)

function Wildcard (host, input, query, responder) {
  Lisp.call(this, input, lib(host, input, query, responder))
}

module.exports = Wildcard
