function Vessel (id, name, owner, parent) {
  this.id = id
  this.name = name
  this.owner = owner
  this.parent = parent

  this.create = (q) => {
    const name = removeParticles(q)
    const id = paradise.next()
    const vessel = new Vessel(id, q, this, this.parent)
    paradise.add(vessel)
  }

  this.sight = () => {
    const a = Object.values(paradise.database).filter((vessel) => { 
      return vessel.parent.id === this.parent.id 
    })
    return a
  }

  function removeParticles (str) {
    const particles = ['a', 'the', 'an']
    return str.split(' ').filter((item) => {
      return particles.indexOf(item) < 0
    })
  }

  console.log('Created ', id, name, owner, parent)
}
