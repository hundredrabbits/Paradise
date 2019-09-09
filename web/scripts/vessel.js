function Vessel (data) {
  this.data = data

  this.actions = {
    create: (q) => {
      const name = removeParticles(q)
      const id = paradise.next()
      const vessel = new Vessel({ id: id, name: name, owner: this.data.id, parent: this.parent().data.id })
      return paradise.add(vessel) ? `You created the ${vessel.data.name}.` : `You cannot create the ${vessel.data.name}.`
    },
    enter: (q) => {
      const target = this.find(this.sight(), q)
      if (!target) { return `You do not see ${q}.` }
      this.data.parent = target.data.id
      return `You entered the ${target.data.name}.`
    },
    leave: () => {
      const origin = this.parent().data.name
      this.data.parent = this.parent().parent().data.id
      return `You left the ${origin}.`
    },
    become: (q) => {
      const target = this.find(this.sight(), q)
      if (!target) { return `You do not see ${q}.` }
      client.vessel = target
      return `You became the ${target.data.name}`
    },
    take: (q) => {
      const target = this.find(this.sight(), q)
      if (!target) { return `You do not see ${q}.` }
      target.data.parent = this.data.id
      return `You took the ${target.data.name}.`
    },
    drop: (q) => {
      const target = this.find(this.inventory(), q)
      if (!target) { return `You do not carry ${q}.` }
      target.data.parent = this.parent().data.id
      return `You dropped the ${target.data.name}.`
    },
    move: (q) => {
      if (!q.indexOf(' in ') < 0) { return 'You must use the A in B format.' }
      const a = this.find(this.sight(), q.split(' in ')[0])
      const b = this.find(this.sight(), q.split(' in ')[1])
      if (!a || !b) { return 'You do not see these vessels.' }
      a.data.parent = b.data.id
      return `You moved the ${a.data.name} into ${b.data.name}.`
    },
    warp: (q) => {
      const target = this.find(paradise.vessels(), q)
      if (!target) { return `You cannot warp to ${q}.` }
      this.data.parent = target.data.id
      return `You warped to the ${target.data.name}.`
    },
    note: (q) => {
      this.parent().data.note = q
      return `You ${q !== '' ? 'added' : 'removed'} the ${this.parent().data.name} note.`
    },
    program: (q) => {
      this.parent().data.program = q
      return `You ${q !== '' ? 'added' : 'removed'} the ${this.parent().data.name} program.`
    },
    use: (q) => {
      const target = this.find(paradise.vessels(), q)
      if (!target) { return `You cannot use the ${q}.` }
      if (!target.data.program) { return `The ${target.data.name} has no program.` }
      return this.act(target.data.program)
    },
    learn: (q) => {
      const actions = Object.keys(this.actions)
      return `The available commands(${actions.length}) are ${andList(actions)}.`
    }
  }

  // Getters

  this.parent = () => {
    return paradise.read(this.data.parent)
  }

  this.owner = () => {
    return paradise.read(this.data.owner)
  }

  // Etcs

  this.sight = () => {
    const a = paradise.filter((vessel) => {
      return vessel.parent().data.id === this.parent().data.id && vessel.data.id !== this.data.id && vessel.data.id !== this.parent().data.id
    })
    return a
  }

  this.inventory = () => {
    const a = paradise.filter((vessel) => {
      return vessel.parent().data.id === this.data.id && vessel.data.id !== this.data.id && vessel.data.id !== this.parent().data.id
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
      if (vessel.data.name !== name) { continue }
      return vessel
    }
  }

  this.has = (name) => {
    return this.find(this.inventory(), name)
  }

  this.action = () => {
    if (this.data.program) { return 'use' }
    if (client.vessel.has(this.data.name)) { return 'drop' }
    return 'enter'
  }

  this.stem = () => {
    let i = 0
    let v = this.parent()
    while (!v.isParadox() || i < 20) {
      v = v.parent()
      i++
    }
    return v
  }

  this.toAction = () => {
    return `<a data-action='${this.action()} the ${this.data.name}' href='#${this.data.name}'>${this.action()} the ${this.data.name}</a>`
  }

  this.isParadox = () => {
    return this.data.id === this.parent().data.id
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
