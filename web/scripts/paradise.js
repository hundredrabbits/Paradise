'use strict'

/* global Vessel */

function Paradise () {
  this.world = {}

  this.start = () => {
    this.world = {}
    this.add(new Vessel({ id: 0, name: 'library', owner: 0, parent: 0, note: 'welcome to paradise, you can edit this message with the note action. <br />to begin, make a new vessel with create.<br/>type learn to see the list of commands.' }))
    this.add(new Vessel({ id: 1, name: 'ghost', owner: 0, parent: 0, note: 'this is the library ghost vessel.' }))
  }

  this.add = (vessel) => {
    if (this.find(vessel.data.name, this.vessels())) { return }
    this.world[vessel.data.id] = vessel
    return vessel
  }

  this.find = (q, arr = this.vessels()) => {
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

  this.filter = (fn) => {
    return this.vessels().filter(fn)
  }

  this.next = () => {
    for (var id = 0; id < 10000; id++) {
      if (!this.world[id]) { return id }
    }
  }

  this.vessels = () => {
    return Object.values(this.world)
  }

  this.import = (json) => {
    const db = {}
    for (const vessel of JSON.parse(json)) {
      db[vessel.id] = new Vessel(vessel)
    }
    this.world = db
  }

  this.export = () => {
    const a = []
    for (const vessel of this.vessels()) {
      a.push(vessel.data)
    }
    return JSON.stringify(a)
  }

  function removeParticles (str) {
    const particles = ['a', 'the', 'an', 'at', 'in', 'into', 'to', 'by']
    return `${str}`.split(' ').filter((item) => {
      return particles.indexOf(item) < 0
    }).join(' ').trim()
  }
}
