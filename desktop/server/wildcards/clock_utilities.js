'use strict'

const clock = require('../core/clock');
const helpers = require('../core/helpers')

const _clock_utilities = {

  // Clock
  // BUG: keeps returning undefined
  time:  function () {
    return clock.time
  },
  beat:  function () {
    return clock.beat
  },
  pulse: function () {
    return clock.pulse
  },

  // create clock & enter clock & trigger time The time is @( time ) & leave & time

}

function clock_utilities (host, input, query, responder) {
  return _clock_utilities
}

module.exports = clock_utilities
