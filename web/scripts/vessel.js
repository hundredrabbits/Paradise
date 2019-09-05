function Vessel (id, name, owner, parent) {
  this.id = id
  this.name = name
  this.owner = owner
  this.parent = parent

  // A

  this.create = (q) => {
    const name = removeParticles(q)
    const id = paradise.next()
    const vessel = new Vessel(id, name, this, this.parent)
    return paradise.add(vessel) ? 'You created something.' : 'You cannot create that thing.'
  }

  this.enter = (q) => {
    const target = this.find(this.sight(), q)
    if (!target) { return 'You do not see that thing.' }
    this.parent = target
    return `You entered the ${target.name}.`
  }

  this.leave = () => {
    this.parent = this.parent.parent
    return 'You left something.'
  }

  this.become = (q) => {
    const target = this.find(this.sight(), q)
    if (!target) { return 'You do not see that thing.' }
    client.vessel = target
    return `You became the ${target.name}`
  }

  // B

  this.take = (q) => {
    const target = this.find(this.sight(), q)
    if (!target) { return 'You do not see that thing.' }
    target.parent = this
    return `You took the ${target.name}.`
  }

  this.drop = (q) => {
    const target = this.find(this.inventory(), q)
    if (!target) { return 'You do not carry that thing.' }
    target.parent = this.parent
    return `You dropped the ${target.name}.`
  }

  this.move = (q) => {
    if (!q.indexOf(' in ') < 0) { return 'You must use the A in B format.' }
    const a = this.find(this.sight(), q.split(' in ')[0])
    const b = this.find(this.sight(), q.split(' in ')[1])
    if (!a || !b) { return 'You do not see these vessels.' }
    a.parent = b
    return `You moved the ${a.name} into ${b.name}.`
  }

  this.warp = (q) => {
    const target = this.find(paradise.vessels(), q)
    if (!target) { return 'There is no vessel with that name.' }
    this.parent = target
    return `You warped to the ${target.name}.`
  }

  // Etcs

  this.sight = () => {
    const a = paradise.filter((vessel) => {
      return vessel.parent.id === this.parent.id && vessel.id !== this.id
    })
    return a
  }

  this.inventory = () => {
    const a = paradise.filter((vessel) => {
      return vessel.parent.id === this.id && vessel.id !== this.id
    })
    return a
  }

  this.find = (arr, q) => {
    const name = removeParticles(q)
    for (const vessel of arr) {
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
