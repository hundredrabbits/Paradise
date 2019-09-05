function Paradise () {
  this.database = {}

  this.install = () => {
    const library = new Vessel(this.next(), 'library')
    library.owner = library
    library.parent = library
    this.add(library)
    library.create('ghost')
  }

  this.start = () => {

  }

  this.add = (vessel) => {
    if (this.names().indexOf(vessel.name) > -1) { return console.warn('duplicate') }
    console.log(`Adding ${vessel.name}, in ${vessel.parent.name}`)
    this.database[vessel.id] = vessel
  }

  this.find = (name) => {
    for (vessel of this.vessels()) {
      if (vessel.name !== name) { continue }
      return vessel
    }
  }

  this.vessels = () => {
    return Object.values(this.database)
  }

  this.read = (id) => {
    return this.database[id]
  }

  this.write = () => {

  }

  this.names = () => {
    return this.vessels().map((vessel) => { return vessel.name })
  }

  this.next = () => {
    for (var i = 0; i < 1000; i++) {
      if (!this.read(i)) { return i }
    }
  }

  this.filter = (fn) => {
    return this.vessels().filter(fn)
  }
}
