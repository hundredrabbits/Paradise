'use strict'

/* global paradise */

function Vessel (data) {
  this.data = data

  this.errors = {
    incomplete: () => {
      return `you cannot do that.`
    },
    unseen: (q) => {
      return `you do not see that vessel.`
    },
    duplicate: (q) => {
      return `you cannot create another ${q}.`
    },
    unknown: (q) => {
      return `you cannot ${q}.`
    },
    unexist: (q) => {
      return `you cannot find that vessel.`
    },
    invalid: (q, type = 'vessel name') => {
      return `you cannot use the ${type} "${q}".`
    }
  }

  this.actions = {
    create: (q) => {
      if (!q) { return this.errors.incomplete() }
      const name = removeParticles(q)
      if (!isValid(name)) { return this.errors.invalid(name) }
      if (paradise.find(name)) { return this.errors.duplicate(name) }
      paradise.add(new Vessel({
        id: paradise.next(),
        name: name,
        owner: this.data.id,
        parent: this.parent().data.id
      }))
      return `you created the ${name}.`
    },
    enter: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = paradise.find(q, this.sight())
      if (!target) { return this.errors.unseen(q) }
      this.data.parent = target.data.id
      return `you entered the ${target}.`
    },
    leave: () => {
      if (this.parent().isParadox()) { return `you cannot leave a paradox.` }
      const origin = this.parent().data.name
      this.data.parent = this.parent().parent().data.id
      return `you left the ${origin}.`
    },
    become: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = paradise.find(q, this.sight())
      if (!target) { return this.errors.unseen(q) }
      client.vessel = target
      return `you became the ${target}`
    },
    take: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = paradise.find(q, this.sight())
      if (!target) { return this.errors.unseen(q) }
      target.data.parent = this.data.id
      return `you took the ${target}.`
    },
    drop: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = paradise.find(q, this.inventory())
      if (!target) { return this.errors.unseen(q) }
      target.data.parent = this.parent().data.id
      return `you dropped the ${target}.`
    },
    warp: (q) => {
      if (!q) { return this.errors.incomplete() }
      const id = q.split(' ').pop()
      const target = !isNaN(id) && paradise.world[id] ? paradise.world[id] : paradise.find(q, paradise.vessels())
      if (!target) { return this.errors.unexist(q) }
      const relation = createRelation(q)
      if (!relation) { return this.errors.unknown(q) }
      if (relation === 'outside') {
        this.data.parent = target.parent().data.id
      } else if (relation === 'inside') {
        this.data.parent = target.data.id
      }
      return target.data.id === client.vessel.data.id ? `you warped ${relation} yourself.` : `you warped ${relation} the ${target}.`
    },
    move: (q) => {
      if (!q) { return this.errors.incomplete() }
      const relation = findRelation(q)
      if (!relation) { return this.errors.incomplete(q) }
      const parts = q.split(relation)
      const a = paradise.find(parts[0], this.reach())
      const b = paradise.find(parts[1], this.reach())
      if (!a) { return this.errors.unseen(parts[0]) }
      if (!b) { return this.errors.unseen(parts[1]) }
      a.data.parent = b.data.id
      return `you moved the ${a} into ${b}.`
    },
    transform: (q) => {
      if (!q) { return this.errors.incomplete() }
      const relation = findRelation(q)
      if (!relation) { return this.errors.incomplete(q) }
      const parts = q.split(relation)
      const target = parts[0] ? paradise.find(parts[0], this.reach()) : this
      if (!target) { return this.errors.unseen(q) }
      const before = target.data.name
      const name = removeParticles(parts[1])
      if (paradise.find(name)) { return this.errors.duplicate(name) }
      target.data.name = name
      return parts[0] ? `you transformed the ${before} into a ${name}.` : `you transformed into a ${name}.`
    },
    note: (q) => {
      this.parent().data.note = q
      return `you ${q !== '' ? 'added' : 'removed'} the ${this.parent()} note.`
    },
    program: (q) => {
      this.parent().data.program = q
      return `you ${q !== '' ? 'added' : 'removed'} the ${this.parent()} program.`
    },
    use: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = paradise.find(q, paradise.vessels())
      if (!target) { return this.errors.unseen(q) }
      if (!target.data.program) { return `the ${target} has no program.` }
      return this.act(target.data.program)
    },
    learn: (q) => {
      const actions = Object.keys(this.actions)
      return `the ${actions.length} available commands are: ${andList(actions)}.`
    }
  }

  this.act = (q) => {
    const params = `${q}`.trim().split(' ')
    const action = params.shift()
    if (!action) { return '' }
    if (!this.actions[action]) { return this.errors.unknown(action) }
    return this.actions[action](params.join(' '))
  }

  // access

  this.parent = () => {
    return paradise.world[this.data.parent]
  }

  this.owner = () => {
    return paradise.world[this.data.owner]
  }

  this.action = () => {
    if (this.data.program) { return 'use' }
    if (paradise.find(this.data.name, client.vessel.inventory())) { return 'drop' }
    return 'enter'
  }

  this.stem = () => {
    const known = []
    let v = this
    while (v.isParadox() !== true) {
      if (known.indexOf(v.data.id) >= 0) { return null }
      known.push(v.data.id)
      v = v.parent()
    }
    return v
  }

  // selector

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

  this.reach = () => {
    return [].concat(this.sight()).concat(this.inventory())
  }

  // tools

  this.isParadox = () => {
    return this.data.id === this.parent().data.id
  }

  this.toAction = () => {
    return `<a data-action='${this.action()} the ${this}' href='#${this}'>${this.action()} the ${this}</a>`
  }

  this.toString = () => {
    return `${this.data.name}`
  }
}
