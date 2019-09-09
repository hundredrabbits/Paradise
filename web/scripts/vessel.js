function Vessel (data) {
  this.data = data

  this.errors = {
    incomplete: () => {
      return `you cannot do that.`
    },
    unseen: (q) => {
      return `you do not see ${q}.`
    },
    duplicate: (q) => {
      return `you cannot create another ${q}.`
    },
    unknown: (q) => {
      return `you cannot ${q}.`
    }
  }

  this.actions = {
    create: (q) => {
      if (!q) { return this.errors.incomplete() }
      const name = removeParticles(q)
      if (paradise.exists(name)) { return this.errors.duplicate(name) }
      const id = paradise.next()
      const vessel = new Vessel({ id: id, name: name, owner: this.data.id, parent: this.parent().data.id })
      return paradise.add(vessel) ? `you created the ${vessel.data.name}.` : `you cannot create the ${vessel.data.name}.`
    },
    enter: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = this.find(this.sight(), q)
      if (!target) { return this.errors.unseen(q) }
      this.data.parent = target.data.id
      return `You entered the ${target.data.name}.`
    },
    leave: () => {
      const origin = this.parent().data.name
      this.data.parent = this.parent().parent().data.id
      return `you left the ${origin}.`
    },
    become: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = this.find(this.sight(), q)
      if (!target) { return this.errors.unseen(q) }
      client.vessel = target
      return `you became the ${target.data.name}`
    },
    take: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = this.find(this.sight(), q)
      if (!target) { return this.errors.unseen(q) }
      target.data.parent = this.data.id
      return `you took the ${target.data.name}.`
    },
    drop: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = this.find(this.inventory(), q)
      if (!target) { return this.errors.unseen(q) }
      target.data.parent = this.parent().data.id
      return `you dropped the ${target.data.name}.`
    },
    move: (q) => {
      if (!q) { return this.errors.incomplete() }
      if (!q.indexOf(' in ') < 0) { return 'you must use the A in B format.' }
      const a = this.find(this.sight(), q.split(' in ')[0])
      const b = this.find(this.sight(), q.split(' in ')[1])
      if (!a || !b) { return 'you do not see these vessels.' }
      a.data.parent = b.data.id
      return `you moved the ${a.data.name} into ${b.data.name}.`
    },
    warp: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = this.find(paradise.vessels(), q)
      if (!target) { return `you cannot warp to ${q}.` }
      this.data.parent = target.data.id
      return `you warped to the ${target.data.name}.`
    },
    note: (q) => {
      this.parent().data.note = q
      return `you ${q !== '' ? 'added' : 'removed'} the ${this.parent().data.name} note.`
    },
    program: (q) => {
      this.parent().data.program = q
      return `you ${q !== '' ? 'added' : 'removed'} the ${this.parent().data.name} program.`
    },
    use: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = this.find(paradise.vessels(), q)
      if (!target) { return this.errors.unseen(q) }
      if (!target.data.program) { return `the ${target.data.name} has no program.` }
      return this.act(target.data.program)
    },
    learn: (q) => {
      const actions = Object.keys(this.actions)
      return `the available commands(${actions.length}) are ${andList(actions)}.`
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
    if (!this.actions[action]) { return this.errors.unknown(action) }
    return this.actions[action](params.join(' '))
  }

  this.find = (arr, q) => {
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
