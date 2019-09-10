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
    this._input.value = 'create a machine'
    this._input.focus()
    // this.walkthrough.runAll('basics')
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

function isValid (name) {
  return !!name.match(/^[a-z ]+$/) && name.length >= 3 || name.length <= 24
}
