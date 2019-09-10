'use strict'

/* global Vessel */

function Paradise () {
  this.world = {}

  this.install = () => {
    this.clear()
  }

  this.start = () => {

  }

  this.clear = () => {
    this.world = {}
    this.add(new Vessel({ id: 0, name: 'library', owner: 0, parent: 0, note: 'welcome to paradise, you can edit this message with the note action. <br />to begin, make a new vessel with create.<br/>type learn to see the list of commands.' }))
    this.add(new Vessel({ id: 1, name: 'ghost', owner: 0, parent: 0, note: 'this is the library ghost vessel.' }))
  }

  this.add = (vessel) => {
    if (this.exists(vessel.data.name)) { return null }
    this.world[vessel.data.id] = vessel
    return vessel
  }

  this.find = (name) => {
    for (const vessel of this.vessels()) {
      if (vessel.data.name !== name) { continue }
      return vessel
    }
  }

  this.exists = (name) => {
    return !!this.find(name)
  }

  this.vessels = () => {
    return Object.values(this.world)
  }

  this.names = () => {
    return this.vessels().map((vessel) => { return vessel.name })
  }

  this.next = () => {
    for (var id = 0; id < 1000; id++) {
      if (!this.world[id]) { return id }
    }
  }

  this.filter = (fn) => {
    return this.vessels().filter(fn)
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
}
