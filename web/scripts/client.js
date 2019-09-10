'use strict'

/* global Walkthrough */

function Client (paradise) {
  this._el = document.createElement('div')
  this._input = document.createElement('input')
  this._location = document.createElement('h2')
  this._sight = document.createElement('ul')
  this._note = document.createElement('p')
  this._response = document.createElement('p')
  this._inventory = document.createElement('ul')
  this._program = document.createElement('pre')
  this._footer = document.createElement('p')

  this.walkthrough = null
  this.vessel = null

  this.install = (host = document.body) => {
    this.walkthrough = new Walkthrough(this, paradise)
    this._el.appendChild(this._location)
    this._el.appendChild(this._sight)
    this._el.appendChild(this._note)
    this._el.appendChild(this._response)
    this._el.appendChild(this._inventory)
    this._el.appendChild(this._input)
    this._el.appendChild(this._program)
    this._el.appendChild(this._footer)
    host.appendChild(this._el)

    this._input.onkeydown = (e) => {
      if (e.key === 'Enter') { return this.validate(e.target.value) }
      if (e.key === 's' && e.ctrlKey) { return this.export() }
    }

    document.onclick = (e) => {
      if (!e.target.getAttribute('data-action')) { return }
      this._input.value = e.target.getAttribute('data-action')
      this._input.focus()
    }
  }

  this.start = (id = 1) => {
    paradise.start()
    this.vessel = paradise.world[id]
    this.update()
    this._input.value = 'create a quiet machine'
    this._input.focus()
    // this.walkthrough.run('all')
  }

  this.update = (response = '') => {
    const visibles = this.vessel.sight()
    const children = this.vessel.inventory()
    const stem = this.vessel.stem()
    this._location.innerHTML = this.vessel.isParadox() ? `you are the ${this.vessel.data.name}^.` : `you are a ${this.vessel.data.name}, in the ${this.vessel.parent().data.name}.`
    this._note.innerHTML = this.vessel.parent().data.note ? this.vessel.parent().data.note : ''
    this._program.innerHTML = this.vessel.parent().data.program ? this.vessel.parent().data.program : ''
    this._sight.innerHTML = visibles.reduce((acc, vessel) => {
      return acc + '<li>' + vessel.toAction() + '</li>'
    }, '')
    this._inventory.innerHTML = children.reduce((acc, vessel) => {
      return acc + '<li>' + vessel.toAction() + '</li>'
    }, '')
    this._response.innerHTML = response
    this._footer.innerHTML = `<i>${stem ? stem.data.name : 'circular universe^'}:${this.vessel.parent().data.id}:${this.vessel.data.id}</i>`
    console.log(response)
  }

  this.validate = (cmd) => {
    if (cmd.indexOf('&') > -1) {
      for (const c of cmd.split('&')) { this.validate(c) }
      return
    }
    console.info('> ' + cmd)
    const response = this.vessel.act(cmd)
    this.update(response)
    this._input.value = ''
  }

  this.export = () => {
    const output = paradise.export()
    window.open('data:application/json;' + (window.btoa ? 'base64,' + btoa(output) : output))
  }
}
