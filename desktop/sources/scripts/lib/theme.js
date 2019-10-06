'use strict'

function Theme (default_theme = null) {
  const themer = this

  this.el = document.createElement('style')
  this.el.type = 'text/css'

  this.callback
  this.active

  this.collection = {
    noir: { background: '#222', f_high: '#fff', f_med: '#ccc', f_low: '#999', f_inv: '#fff', b_high: '#888', b_med: '#666', b_low: '#444', b_inv: '#000' },
    pale: { background: '#fff', f_high: '#000', f_med: '#999', f_low: '#ccc', f_inv: '#000', b_high: '#999', b_med: '#ccc', b_low: '#efefef', b_inv: '#fff' },
    default: default_theme
  }

  if (!this.collection.default) { this.collection.default = this.collection.pale }

  this.install = function (host = document.body, callback) {
    console.log('Theme', 'Installing..')
    host.appendChild(this.el)
    this.callback = callback
  }

  this.start = function () {
    console.log('Theme', 'Starting..')
    const storage = is_json(localStorage.theme) ? JSON.parse(localStorage.theme) : this.collection.default
    this.load(!storage.background ? this.collection.default : storage)
  }

  this.save = function (theme) {
    console.log('Theme', 'Saving..')
    this.active = theme
    localStorage.setItem('theme', JSON.stringify(theme))
  }

  this.load = function (theme, fall_back = this.collection.noir) {
    if (!theme || !theme.background) { console.warn('Theme', 'Not a theme', theme); return }

    this.save(theme)
    this.apply(theme)

    if (this.callback) {
      this.callback()
    }
  }

  this.apply = function (theme) {
    this.el.innerHTML = `
    :root {
      --background: ${theme.background};
      --f_high: ${theme.f_high};
      --f_med: ${theme.f_med};
      --f_low: ${theme.f_low};
      --f_inv: ${theme.f_inv};
      --b_high: ${theme.b_high};
      --b_med: ${theme.b_med};
      --b_low: ${theme.b_low};
      --b_inv: ${theme.b_inv};
    }`
  }

  this.parse = function (any) {
    if (any && any.background) { return any } else if (any && any.data) { return any.data } else if (any && is_json(any)) { return JSON.parse(any) } else if (any && is_html(any)) { return this.extract(any) }

    return null
  }

  this.extract = function (text) {
    const svg = new DOMParser().parseFromString(text, 'text/xml')

    try {
      return {
        'background': svg.getElementById('background').getAttribute('fill'),
        'f_high': svg.getElementById('f_high').getAttribute('fill'),
        'f_med': svg.getElementById('f_med').getAttribute('fill'),
        'f_low': svg.getElementById('f_low').getAttribute('fill'),
        'f_inv': svg.getElementById('f_inv').getAttribute('fill'),
        'b_high': svg.getElementById('b_high').getAttribute('fill'),
        'b_med': svg.getElementById('b_med').getAttribute('fill'),
        'b_low': svg.getElementById('b_low').getAttribute('fill'),
        'b_inv': svg.getElementById('b_inv').getAttribute('fill')
      }
    } catch (err) {
      console.warn('Theme', 'Incomplete SVG Theme', err)
    }
  }

  this.reset = function () {
    console.log('Theme', 'Resetting..')
    this.load(this.collection.default)
  }

  // Defaults

  this.pale = function () {
    this.load(this.collection.pale)
  }

  this.noir = function () {
    this.load(this.collection.noir)
  }

  this.invert = function () {
    this.load(this.active.background == this.collection.noir.background ? this.collection.pale : this.collection.noir)
  }

  // Drag

  this.drag = function (e) {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  this.drop = function (e) {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files[0]

    if (!file || !file.name) { console.warn('Theme', 'Unnamed file.'); return }
    if (file.name.indexOf('.thm') < 0 && file.name.indexOf('.svg') < 0) { console.warn('Theme', 'Skipped, not a theme'); return }

    const reader = new FileReader()
    reader.onload = function (e) {
      themer.load(themer.parse(e.target.result))
    }
    reader.readAsText(file)
  }

  window.addEventListener('dragover', this.drag)
  window.addEventListener('drop', this.drop)

  function is_json (text) { try { JSON.parse(text); return true } catch (error) { return false } }
  function is_html (text) { try { new DOMParser().parseFromString(text, 'text/xml'); return true } catch (error) { return false } }
}
