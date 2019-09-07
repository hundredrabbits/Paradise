/* global paradise */

function Client (paradise) {
  this._el = document.createElement('div')
  this._input = document.createElement('input')
  this._location = document.createElement('h2')
  this._sight = document.createElement('ul')
  this._note = document.createElement('ul')
  this._response = document.createElement('p')
  this._inventory = document.createElement('ul')
  this._program = document.createElement('pre')

  this.vessel = null

  this.install = (host = document.body) => {
    paradise.install()
    this._el.appendChild(this._location)
    this._el.appendChild(this._sight)
    this._el.appendChild(this._note)
    this._el.appendChild(this._response)
    this._el.appendChild(this._inventory)
    this._el.appendChild(this._input)
    this._el.appendChild(this._program)
    host.appendChild(this._el)

    this._input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        this.validate(e.target.value)
      }
    }

    document.onclick = (e) => {
      if (e.target.getAttribute('data-action')) {
        this.action(e.target.getAttribute('data-action'))
      }
    }
  }

  this.start = (id = 0) => {
    this.become(id)
    paradise.start()
    this.update()
    this._input.value = 'create a machine'
    this._input.focus()
  }

  this.become = (id) => {
    this.vessel = paradise.read(id)
  }

  this.action = (str) => {
    this._input.value = str
    this._input.focus()
  }

  this.update = (response = '') => {
    const visibles = this.vessel.sight()
    const children = this.vessel.inventory()
    this._location.innerHTML = `You are ${this.vessel.name}, in ${this.vessel.parent.name}.`
    this._note.innerHTML = this.vessel.parent.note ? this.vessel.parent.note : ''
    this._program.innerHTML = this.vessel.parent.program ? this.vessel.parent.program : ''
    this._sight.innerHTML = visibles.reduce((acc, vessel) => {
      return acc + '<li>' + vessel.toAction() + '</li>'
    }, '')
    this._inventory.innerHTML = children.reduce((acc, vessel) => {
      return acc + '<li>' + vessel.toAction() + '</li>'
    }, '')
    this._response.innerHTML = response
  }

  this.validate = (cmd) => {
    console.log('==============')
    const response = this.vessel.act(cmd)
    this.update(response)
    this._input.value = ''
  }
}
