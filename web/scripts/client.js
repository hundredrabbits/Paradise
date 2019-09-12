'use strict'

/* global Walkthrough */

function Client (paradise) {
  this._form = document.createElement('form')
  this._input = document.createElement('input')
  this._location = document.createElement('h2')
  this._sight = document.createElement('ul')
  this._note = document.createElement('p')
  this._response = document.createElement('p')
  this._inventory = document.createElement('ul')
  this._program = document.createElement('pre')
  this._footer = document.createElement('p')

  this._input.setAttribute('size', 48)
  this._form.setAttribute('onsubmit', 'return client.validate(client._input.value)')

  this.walkthrough = null
  this.vessel = null

  this.install = (host = document.body) => {
    this.walkthrough = new Walkthrough(this, paradise)
    host.appendChild(this._location)
    host.appendChild(this._sight)
    host.appendChild(this._note)
    host.appendChild(this._response)
    host.appendChild(this._inventory)
    host.appendChild(this._form)
    this._form.appendChild(this._input)
    this._form.appendChild(document.createElement('br'))
    host.appendChild(this._program)
    host.appendChild(this._footer)

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
    this._input.value = 'create a tool & take the tool' // 'create a machine & create a box & move the machine in the box'
    this._input.focus()
    // this.walkthrough.run('basics')
  }

  this.update = (response = '') => {
    const visibles = this.vessel.sight()
    const children = this.vessel.inventory()
    const stem = this.vessel.stem()
    this._location.innerHTML = this.vessel.isParadox() ? `you are the ${this.vessel.data.name}^.` : `you are a ${this.vessel.data.name}, in the ${this.vessel.parent().data.name}.`
    this._note.innerHTML = this.vessel.parent().data.note ? this.vessel.parent().data.note : ''
    this._program.innerHTML = this.vessel.parent().data.program ? this.vessel.parent().data.program : ''
    this._sight.innerHTML = visibles.reduce((acc, vessel) => { return acc + '<li>' + vessel.toAction() + '</li>' }, '')
    this._inventory.innerHTML = children.reduce((acc, vessel) => { return acc + '<li>' + vessel.toAction() + '</li>' }, '')
    this._response.innerHTML = response
    this._footer.innerHTML = `<i>${stem ? stem.data.name : 'circular universe^'}:${this.vessel.parent().data.id}:${this.vessel.data.id}</i>`
  }

  this.validate = (cmd) => {
    if (cmd.indexOf('&') > -1) {
      for (const c of cmd.split('&')) {
        this.validate(c.trim())
      }
      return
    }
    const response = this.vessel.act(cmd)
    this.update(response)
    console.info('> ' + cmd + ' : ' + response)
    this._input.value = ''
  }

  this.export = () => {
    const output = paradise.export()
    window.open('data:application/json;' + (window.btoa ? 'base64,' + btoa(output) : output))
  }
}
