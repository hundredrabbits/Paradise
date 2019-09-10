'use strict'

/* global paradise */

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
    },
    invalid: (q) => {
      return `you cannot use "${q}".`
    }
  }

  this.actions = {
    create: (q) => {
      if (!q) { return this.errors.incomplete() }
      const name = removeParticles(q)
      if (paradise.find(name)) { return this.errors.duplicate(name) }
      if (!name.isAlpha()) { return this.errors.invalid(name) }
      const id = paradise.next()
      paradise.add(new Vessel({ id: id, name: name, owner: this.data.id, parent: this.parent().data.id }))
      return `you created the ${name}.`
    },
    enter: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = this.find(this.sight(), q)
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
      const target = this.find(this.sight(), q)
      if (!target) { return this.errors.unseen(q) }
      client.vessel = target
      return `you became the ${target}`
    },
    take: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = this.find(this.sight(), q)
      if (!target) { return this.errors.unseen(q) }
      target.data.parent = this.data.id
      return `you took the ${target}.`
    },
    drop: (q) => {
      if (!q) { return this.errors.incomplete() }
      const target = this.find(this.inventory(), q)
      if (!target) { return this.errors.unseen(q) }
      target.data.parent = this.parent().data.id
      return `you dropped the ${target}.`
    },
    warp: (q) => {
      if (!q) { return this.errors.incomplete() }
      const id = q.split(' ').pop()
      const target = !isNaN(id) && paradise.world[id] ? paradise.world[id] : this.find(paradise.vessels(), q)
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
      const a = this.find(this.reach(), parts[0])
      const b = this.find(this.reach(), parts[1])
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
      const target = parts[0] ? this.find(this.reach(), parts[0]) : this
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
      const target = this.find(paradise.vessels(), q)
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

  // selector

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

  this.action = () => {
    if (this.data.program) { return 'use' }
    if (client.vessel.find(client.vessel.inventory(), this.data.name)) { return 'drop' }
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

  this.isParadox = () => {
    return this.data.id === this.parent().data.id
  }

  this.toAction = () => {
    return `<a data-action='${this.action()} the ${this}' href='#${this}'>${this.action()} the ${this}</a>`
  }

  this.toString = () => {
    return `${this.data.name}`
  }

  function findRelation (str, words = ['in', 'inside', 'into', 'out', 'outside', 'at', 'to']) {
    for (const word of words) {
      if (` ${str} `.indexOf(` ${word} `) > -1) {
        return word
      }
    }
  }

  function createRelation (str) {
    const padded = ` ${str.trim()} `
    if (padded.indexOf(' in ') > -1 || padded.indexOf(' inside ') > -1 || padded.indexOf(' into ') > -1) { return 'inside' }
    if (padded.indexOf(' out ') > -1 || padded.indexOf(' outside ') > -1 || padded.indexOf(' at ') > -1 || padded.indexOf(' to ') > -1) { return 'outside' }
  }

  function removeParticles (str) {
    const particles = ['a', 'the', 'an', 'at', 'in', 'into', 'to', 'by']
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

String.prototype.toAlpha = function () { return this.replace(/[^a-z ]/gi, '').trim() }
String.prototype.toAlphanum = function () { return this.replace(/[^0-9a-z ]/gi, '') }
String.prototype.isAlpha = function () { return !!this.match(/^[a-z ]+$/) }
String.prototype.isAlphanum = function () { return !!this.match(/^[A-Za-z0-9 ]+$/) }
