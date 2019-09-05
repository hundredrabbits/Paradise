function Vessel (id, name, owner, parent) {
  this.id = id
  this.name = name
  this.owner = owner
  this.parent = parent

  this.create = (q) => {
    const name = removeParticles(q)
    const id = paradise.next()
    const vessel = new Vessel(id, name, this, this.parent)
    paradise.add(vessel)
  }

  this.enter = (q) => {
    const name = removeParticles(q)
    const target = this.target(name)
    if (!target) { return console.warn('Cannot find', name) }
    this.parent = target
  }

  this.sight = () => {
    const a = paradise.filter((vessel) => {
      return vessel.parent.id === this.parent.id
    })
    return a
  }

  this.target = (name) => {
    for (const vessel of this.sight()) {
      if (vessel.name !== name) { continue }
      return vessel
    }
  }

  function removeParticles (str) {
    const particles = ['a', 'the', 'an']
    return str.split(' ').filter((item) => {
      return particles.indexOf(item) < 0
    }).join(' ').trim()
  }

  console.log('Created', id, name, owner, parent)
}
