'use strict'

/* global Vessel */

function Paradise () {
  this.world = {}

  this.start = () => {
    this.world = {}
    this.add(new Vessel({ id: 0, name: 'library', owner: 0, parent: 0, note: 'welcome to the (host), you can edit this message with the (action "note a new description" "note") action. to begin, make a new vessel with (action "create a new vessel" "create"). type (action "learn") to see the list of commands.' }))
    this.add(new Vessel({ id: 1, name: 'ghost', owner: 0, parent: 0, note: 'this is the library ghost vessel.' }))
  }

  this.add = (vessel) => {
    this.world[vessel.data.id] = vessel
    return vessel
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

  this.name = () => {
    return this.vessels()[0].data.name
  }

  // IO

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
}
