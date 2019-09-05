function Client (paradise) {
  this._el = document.createElement('div')
  this._el.id = 'client'
  this._input = document.createElement('input')
  this._input.id = 'input'
  this._sight = document.createElement('p')
  this._sight.id = 'sight'
  this._inventory = document.createElement('ul')
  this._inventory.id = 'inventory'

  this.vessel = null

  this.install = (host = document.body) => {
    paradise.install()
    this._el.appendChild(this._sight)
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

  this.update = () => {
    const visibles = this.vessel.sight()
    this._sight.innerHTML = `You are ${this.vessel.name}, in ${this.vessel.parent.name}.`
    this._sight.innerHTML += `<ul>${visibles.reduce((acc, item) => { return acc + item.name + '<br/>' }, '')}</ul>`
  }

  this.validate = (cmd) => {
    console.log('==============')
    const params = cmd.trim().split(' ')
    const action = params.shift()
    if (!this.vessel[action]) { return console.warn(`Unknown ${action}`, params) }
    this.vessel[action](params.join(' '))
    this.update()
  }
}
