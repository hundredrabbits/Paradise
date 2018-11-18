'use strict'

function Clock () {
  const clock = this

  this.time = function () {
    const d = new Date(); const e = new Date(d)
    const msSinceMidnight = e - d.setHours(0, 0, 0, 0)
    const val = (msSinceMidnight / 864) * 10
    return `${parseInt(val)}`
  }

  this.toString = function () {
    const t = this.time()
    return `${t.substr(0, 3)}:${t.substr(3, 3)}`
  }

  this.beat = function () {
    return this.time().substr(0, 3)
  }

  this.pulse = function () {
    return this.time().substr(3, 3)
  }
}

module.exports = Clock
