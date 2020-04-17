'use strict'

/* global paradise */

function Action (name, docs, flags, fn) {
  this.name = name
  this.flags = flags
  this.docs = docs
  this.fn = fn

  this.run = function (host, q) {
    let input = q
    let target = null
    let relation = null
    let cast = null
    // Filters
    if (this.flag('words')) { input = removeParticles(input) }
    // Checks
    if (this.flag('isunique') && this.find(input)) { return `You cannot create another ${input}.` }
    if (this.flag('isvalid') && !isValid(input)) { return `You cannot create the ${input}.` }
    if (this.flag('isnotparadox') && host.parent().isParadox()) { return 'You cannot leave a paradox.' }
    if (this.flag('isnotempty') && !input) { return 'You cannot use this action without parameter.' }
    // Targets
    if (this.flag('visible')) { target = this.find(q, host.sight()) }
    if (this.flag('inventory')) { target = this.find(q, host.inventory()) }
    if (this.flag('distant')) { target = this.find(q, paradise.vessels()) }
    if (this.flag('target') && !target) { return 'You do not see the target vessel.' }

    if (this.flag('relation')) { relation = createRelation(input) }

    if (this.flag('cast')) {
      relation = findRelation(input)
      const parts = input.split(` ${relation} `)
      target = this.find(parts[0], host.sight())
      cast = this.find(parts[1], host.sight())
      if (!target) { return `Missing ${parts[0]}.` }
      if (!cast) { return `Missing ${parts[1]}.` }
    }

    return this.fn(input, target, relation, cast)
  }

  this.find = (q, arr = paradise.vessels()) => {
    const name = removeParticles(q)
    for (const vessel of arr) {
      if (vessel.data.name !== name) { continue }
      return vessel
    }
    for (const vessel of arr) {
      if (vessel.data.name.indexOf(name) < 0) { continue }
      return vessel
    }
  }

  this.flag = (id) => {
    return this.flags.indexOf(id) >= 0
  }

  function isValid (name) {
    return !!name.match(/^[a-z ]+$/) && name.length >= 3 && name.length <= 24
  }

  function findRelation (str, words = ['in', 'inside', 'into', 'out', 'outside', 'at', 'to']) {
    for (const word of words) {
      if (` ${str} `.indexOf(` ${word} `) > -1) {
        return word
      }
    }
  }

  function createRelation (str) {
    const padded = ` ${str.trim()} `
    if (padded.indexOf(' in ') > -1 || padded.indexOf(' inside ') > -1 || padded.indexOf(' into ') > -1) { return 'inside' }
    if (padded.indexOf(' out ') > -1 || padded.indexOf(' outside ') > -1 || padded.indexOf(' at ') > -1 || padded.indexOf(' to ') > -1) { return 'outside' }
  }

  function removeParticles (str) {
    const particles = ['a', 'the', 'an', 'at', 'in', 'into', 'to', 'by']
    return `${str}`.split(' ').filter((item) => {
      return particles.indexOf(item) < 0
    }).join(' ').trim()
  }
}
