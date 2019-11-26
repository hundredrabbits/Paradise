'use strict'

/* global paradise Action client */

function Vessel (data) {
  this.data = data

  this.actions = {
    create: new Action('create', 'Create a new vessel at your current location.', 'words isunique isvalid isnotempty',
      (name) => {
        paradise.add(new Vessel({ id: paradise.next(), name: name, owner: this.data.id, parent: this.parent().data.id }))
        return `you created the ${name}.`
      }),
    enter: new Action('enter', 'Enter a visible vessel.', 'words visible target isnotempty',
      (name, target) => {
        this.data.parent = target.data.id
        return `you entered the ${target}.`
      }),
    leave: new Action('leave', 'Exit the parent vessel.', 'isnotparadox',
      () => {
        const origin = this.parent().data.name
        this.data.parent = this.parent().parent().data.id
        return `you left the ${origin}.`
      }),
    become: new Action('become', 'Become a visible vessel.', 'visible target isnotempty',
      (name, target) => {
        client.vessel = target
        return `you became the ${target}`
      }),
    take: new Action('take', 'Move a visible vessel into a child vessel.', 'visible target isnotempty',
      (name, target) => {
        target.data.parent = this.data.id
        return `you took the ${target}.`
      }),
    drop: new Action('drop', 'Move a child vessel into the parent vessel.', 'inventory target isnotempty',
      (name, target) => {
        target.data.parent = this.parent().data.id
        return `you dropped the ${target}.`
      }),
    warp: new Action('warp', 'Move to a distant vessel.', 'distant target relation isnotempty',
      (name, target, relation) => {
        this.data.parent = relation === 'outside' ? target.parent().data.id : target.data.id
        return target.data.id === client.vessel.data.id ? `you warped ${relation} yourself.` : `you warped ${relation} the ${target}.`
      }),
    note: new Action('note', 'Add a description to the current parent vessel.', '',
      (name) => {
        this.parent().data.note = name
        return `you modified the note of the ${this.parent()}.`
      }),
    pass: new Action('pass', 'Add a passive note to the current parent vessel.', '',
      (name) => {
        this.parent().data.passive = name
        return `you modified the passive message ${this.parent()}.`
      }),
    program: new Action('program', 'Add an automation program to a vessel, making it available to the use command.', '',
      (name) => {
        this.parent().data.program = name
        return `you modified the program of the ${this.parent()}.`
      }),
    learn: new Action('learn', 'Read documentation for each action, or see a list of action.', 'words',
      (name) => {
        return this.actions[name] ? name + ': ' + this.actions[name].docs : `the available commands are: ${andList(Object.keys(this.actions))}. to see the documentation for a specific command, use "learn to move".`
      }),
    use: new Action('use', 'Trigger a vessel\'s program.', 'isnotempty visible target',
      (name, target) => {
        if (!target.data.program) { return `the ${target} has no program.` }
        return this.act(target.data.program)
      }),
    transform: new Action('transform', 'Change your current vessel name.', 'isnotempty words isunique isvalid',
      (name, target) => {
        this.data.name = name
        return `you transformed into a ${name}.`
      }),
    move: new Action('move', 'Move a visible vessel into another visible vessel.', 'isnotempty cast',
      (name, target, relation, cast) => {
        target.data.parent = cast.data.id
        return `you moved the ${target} into ${cast}.`
      })
  }

  this.act = (q) => {
    const params = `${q}`.trim().split(' ')
    const action = params.shift()
    if (!action) { return '' }
    if (!this.actions[action]) { return `you cannot ${action}` }
    return this.actions[action].run(this, params.join(' '))
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
    if (this.parent().data.id === client.vessel.data.id) { return 'drop' }
    if (this.data.passive) { return 'take' }
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
    return `<a data-action='${this.action()} the ${this}' href='#${this}'>${this.action()} the ${this}</a> ${this.data.pass ? this.data.pass : ''}`.trim()
  }

  this.toString = () => {
    return `${this.data.name}`
  }

  function andList (arr) {
    return arr.reduce((acc, item, id) => {
      return acc + item + (id === arr.length - 2 ? ' and ' : id === arr.length - 1 ? ' ' : ', ')
    }, '').trim()
  }
}
