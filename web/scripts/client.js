function Client (paradise) {
  this._el = document.createElement('div')
  this._input = document.createElement('input')
  this._location = document.createElement('h2')
  this._sight = document.createElement('p')
  this._response = document.createElement('p')
  this._inventory = document.createElement('ul')

  this.vessel = null

  this.install = (host = document.body) => {
    paradise.install()
    this._el.appendChild(this._location)
    this._el.appendChild(this._sight)
    this._el.appendChild(this._response)
    this._el.appendChild(this._inventory)
    this._el.appendChild(this._input)
    host.appendChild(this._el)

    this._input.onkeydown = (e) => { if (e.key === 'Enter') { this.validate(e.target.value) } }
  }

  this.start = (id = 0) => {
    this.become(id)
    paradise.start()
    this.update()
    this._input.value = 'create a test'
  }

  this.become = (id) => {
    this.vessel = paradise.read(id)
  }

  this.update = (response = 'idle') => {
    const visibles = this.vessel.sight()
    const children = this.vessel.inventory()
    this._location.innerHTML = `You are ${this.vessel.name}, in ${this.vessel.parent.name}.`
    this._sight.innerHTML = `<ul>${visibles.reduce((acc, item) => { return acc + '<li>' + item.name + '</li>' }, '')}</ul>`
    this._inventory.innerHTML = `<ul>${children.reduce((acc, item) => { return acc + '<li>' + item.name + '</li>' }, '')}</ul>`
    this._response.innerHTML = response
  }

  this.validate = (cmd) => {
    console.log('==============')
    const params = cmd.trim().split(' ')
    const action = params.shift()
    if (!this.vessel[action]) { return console.warn(`Unknown ${action}`, params) }
    const response = this.vessel[action](params.join(' '))
    this.update(response)
    this._input.value = ''
  }
}
