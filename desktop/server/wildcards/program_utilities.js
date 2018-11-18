'use strict'

const helpers = require('../core/helpers')

const program_utilities = {

  // The query that caused this evaluation
  // Use sparingly!
  query: function () {
    return query ? query : helpers.nil
  },
  // The vessel that caused this evaluation
  responder: function () {
    return responder ? responder.id : helpers.nil
  },
  // Whether this vessel's previous action succeded
  success: function () {
    return !host.data.last_error ? 'true' : helpers.nil
  },
  // The error raised by this vessel's last action, or `nil` otherwise
  error: function () {
    return host.data.last_error ? host.data.last_error.to_a() : helpers.nil
  },

}

module.exports = program_utilities
