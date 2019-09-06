function Vessel (id, name, owner, parent) {
  this.id = id
  this.name = name
  this.owner = owner
  this.parent = parent

  // A

  this.actions = {
    create: (q) => {
      const name = removeParticles(q)
      const id = paradise.next()
      const vessel = new Vessel(id, name, this, this.parent)
      return paradise.add(vessel) ? `You created the ${vessel.name}.` : `You cannot create the ${vessel.name}.`
    },
    enter: (q) => {
      const target = this.find(this.sight(), q)
      if (!target) { return `You do not see ${q}.` }
      this.parent = target
      return `You entered the ${target.name}.`
    },
    leave: () => {
      const origin = this.parent.name
      this.parent = this.parent.parent
      return `You left the ${origin}.`
    },
    become: (q) => {
      const target = this.find(this.sight(), q)
      if (!target) { return `You do not see ${q}.` }
      client.vessel = target
      return `You became the ${target.name}`
    },
    take: (q) => {
      const target = this.find(this.sight(), q)
      if (!target) { return `You do not see ${q}.` }
      target.parent = this
      return `You took the ${target.name}.`
    },
    drop: (q) => {
      const target = this.find(this.inventory(), q)
      if (!target) { return `You do not carry ${q}.` }
      target.parent = this.parent
      return `You dropped the ${target.name}.`
    },
    move: (q) => {
      if (!q.indexOf(' in ') < 0) { return 'You must use the A in B format.' }
      const a = this.find(this.sight(), q.split(' in ')[0])
      const b = this.find(this.sight(), q.split(' in ')[1])
      if (!a || !b) { return 'You do not see these vessels.' }
      a.parent = b
      return `You moved the ${a.name} into ${b.name}.`
    },
    warp: (q) => {
      const target = this.find(paradise.vessels(), q)
      if (!target) { return `You cannot warp to ${q}.` }
      this.parent = target
      return `You warped to the ${target.name}.`
    },
    note: (q) => {
      this.parent.note = q
      return `You ${q !== '' ? 'added' : 'removed'} the ${this.parent.name} note.`
    },
    program: (q) => {
      this.parent.program = q
      return `You ${q !== '' ? 'added' : 'removed'} the ${this.parent.name} program.`
    },
    use: (q) => {
      const target = this.find(paradise.vessels(), q)
      if (!target) { return `You cannot use the ${q}.` }
      if (!target.program) { return `The ${target.name} has no program.` }
      return this.act(target.program)
    },
    learn: (q) => {
      const actions = Object.keys(this.actions)
      return `The available commands(${actions.length}) are ${andList(actions)}.`
    }
  }

  // Etcs

  this.sight = () => {
    const a = paradise.filter((vessel) => {
      return vessel.parent.id === this.parent.id && vessel.id !== this.id && vessel.id !== this.parent.id
    })
    return a
  }

  this.inventory = () => {
    const a = paradise.filter((vessel) => {
      return vessel.parent.id === this.id && vessel.id !== this.id && vessel.id !== this.parent.id
    })
    return a
  }

  this.act = (q) => {
    const params = `${q}`.trim().split(' ')
    const action = params.shift()
    if (!this.actions[action]) { return `You cannot do that.` }
    return this.actions[action](params.join(' '))
  }

  this.find = (arr, q) => {
    const name = removeParticles(q)
    for (const vessel of arr) {
      if (vessel.name !== name) { continue }
      return vessel
    }
  }

  function removeParticles (str) {
    const particles = ['a', 'the', 'an', 'at', 'in', 'into', 'to']
    return str.split(' ').filter((item) => {
      return particles.indexOf(item) < 0
    }).join(' ').trim()
  }

  function andList (arr) {
    return arr.reduce((acc, item, id) => {
      return acc + item + (id === arr.length - 2 ? ' and ' : id === arr.length - 1 ? ' ' : ', ')
    }, '').trim()
  }
}
