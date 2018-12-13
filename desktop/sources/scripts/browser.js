'use strict'

function Browser (paradise) {
  Client.call(this, paradise)

  this.theme = new Theme({
    background: '#ffffff',
    f_high: '#000000',
    f_med: '#999999',
    f_low: '#cccccc',
    f_inv: '#000000',
    b_high: '#999999',
    b_med: '#cccccc',
    b_low: '#efefef',
    b_inv: '#ffffff'
  })

  this.controller = new Controller()
  this.walkthrough = new Walkthrough()
  this.speaker = new Speaker()

  this.el = null
  this.input = null
  this.h1 = null
  this.passive = null
  this.note = null
  this.view = null
  this.tips = null
  this.action = null
  this.reaction = null

  this.visibles = []

  this.install = function (host) {
    this.theme.install(document.body)
  }

  this.start = function () {
    this.theme.start()

    this.el = document.body
    this.h1 = document.getElementById('h1')
    this.passive = document.getElementById('passive')
    this.note = document.getElementById('note')
    this.view = document.getElementById('view')
    this.tips = document.getElementById('tips')
    this.action = document.getElementById('action')
    this.input = new Commander(document.getElementById('input'), document.getElementById('hint'))
    this.reaction = document.getElementById('reaction')

    // Events
    this.input.el.oninput = (key) => { this.input.update(key); this.speaker.play('click2') }
    this.input.el.onkeydown = (key) => { if (key.key == 'Tab') { this.input.complete() } }
    this.input.el.onkeyup = (key) => { if (key.key == 'Enter') { this.input.validate(); this.speaker.play('click4') } }

    // Resume?

    this.resume()
    this.query()
  }

  this.update = function (sight) {
    this.save()

    this.el.className = 'loading'
    this.h1.innerHTML = sight.header
    this.passive.innerHTML = sight.passive ? sight.passive : '<action data="learn about passive">Learn</action>'

    this.view.className = sight.view ? 'visible' : 'hidden'
    this.view.innerHTML = sight.view ? sight.view : ''

    this.reaction.className = sight.reaction ? 'visible' : 'hidden'
    this.reaction.innerHTML = sight.reaction ? sight.reaction : ''

    this.note.className = sight.note ? 'visible' : 'hidden'
    this.note.innerHTML = sight.note ? sight.note : ''

    this.action.className = sight.action ? 'visible' : 'hidden'
    this.action.innerHTML = sight.action ? sight.action : ''

    this.tips.innerHTML = sight.tips.reduce((acc, val) => { return `${acc}<ln>${val}</ln>` }, '')

    this.input.update()
    setTimeout(() => { this.el.className = 'ready' }, 250)
  }

  //

  this.import = function () {
    const paths = dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'Paradise World', extensions: ['teapot'] }] })

    if (!paths) { console.log('Nothing to load'); return }

    fs.readFile(paths[0], 'utf-8', (err, data) => {
      if (err) { alert('An error ocurred reading the file :' + err.message); return }
      paradise.import(JSON.parse(data))
      setTimeout(() => { client.query(); client.speaker.play('click1') }, 500)
    })
  }

  this.export = function () {
    dialog.showSaveDialog({ title: 'Save World', filters: [{ name: 'Teapot Format', extensions: ['teapot'] }] }, (fileName) => {
      if (fileName === undefined) { return }
      fs.writeFileSync(fileName, paradise.export())
    })
  }

  this.save = function () {
    localStorage.setItem('world', JSON.stringify(paradise.to_a()))
  }

  this.load = function () {
    return JSON.parse(localStorage.getItem('world'))
  }

  this.save_string = function () {
    return JSON.stringify(paradise.to_a())
  }

  this.load_string = function (str) {
    paradise.import(JSON.parse(str))
  }

  this.resume = function () {
    this.reset()

    const previous = this.load()

    if (previous) {
      console.info('Loaded world')
      if(localStorage.getItem('vessel')){
        this.id = parseInt(localStorage.getItem('vessel'))  
      }
      paradise.import(previous)
    } else {
      console.info('New world')
      paradise.reset()
    }
  }

  // Misc

  this.reset = function () {
    console.warn('-- APOCALYPSE --')
    this.theme.reset()
    paradise.reset()
    setTimeout(() => { this.query(); this.speaker.play('click1') }, 250)
  }

  this.change_vessel = function (id) {
    this.id = id
    this.query()
    localStorage.setItem('vessel', `${id}`)
  }

  document.onclick = function (event) {
    if (event === undefined) { event = window.event }

    const target = 'target' in event ? event.target : event.srcElement

    if (target.tagName.toLowerCase() == 'action') {
      const action = target.getAttribute('data') ? target.getAttribute('data') : target.textContent
      browser.input.inject(action)
    }
  }
}
