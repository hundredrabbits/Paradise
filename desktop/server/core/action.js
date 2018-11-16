'use strict'

const Wildcard = require('./wildcard')
const Error = require('./error')
const pluralize = require('pluralize')

function Action (host, name) {
  this.name = name
  this.host = host
  this.docs = `No documentation for '${name}'`

  this.run = function (action = this.name, params = null) {
    const _reaction = this.operate(action, params)
    const _header = this._header()
    const _note = this._note()
    const _view = this._view()
    const _tips = this._tips()
    const _passive = this._passive()
    const cli = (_reaction ? _reaction.toString() : null) || `${_header ? _header + '\n\n' : ''}${_note ? _note + '\n\n' : ''}${_view ? '> ' + _view : ''}`

    const h = {
      header: _header,
      note: _note,
      view: _view,
      tips: _tips,
      reaction: _reaction,
      action: this.action(),
      cli: cli.replace(/\<br \/\>/g, '\n').replace(/(<([^>]+)>)/ig, ''),
      passive: _passive
    }
    return h
  }

  this.operate = function (action, params) {
    // Check if is custom action
    const siblings = this.host.siblings()
    for (const id in siblings) {
      const v = siblings[id]
      if (v.trigger() != action) { continue }
      if (v.is_program()) {
        this.host.cmd(this.render(v.data.program, params, v))
      }
      return v.data.reaction ? `<p>${this.render(v.data.reaction, params, v)}</p>` : `<p>You used the ${v.name()} to ${v.data.program}.</p>`
    }
    return this.err_UNKNOWN()
  }

  this.change_vessel = function (params) {
    return null
  }

  // Parsers

  this.find = function (params, a = this.host.paradise.world) {
    const parts = this.remove_articles(params).toLowerCase().split(' ')
    const is_any = parts[0] == 'any'
    const attr = parts[parts.length - 2] != parts[parts.length - 1] && !is_any ? parts[parts.length - 2] : null
    const name = parts[parts.length - 1]
    const is_numeric = parseInt(name) > -1

    if (is_numeric) { return this.find_id(a, parseInt(name)) }

    if (name == 'anywhere' || name == 'anything') { return this.find_random(a) }
    if (name == 'myself' || name == 'self') { return this.host }

    return is_any ? this.find_any(a, attr, name) : this.find_target(a, attr, name)
  }

  this.find_id = function (a, target) {
    for (const id in a) {
      if (a[id].id == target) {
        return a[id]
      }
    }
    return null
  }

  this.find_any = function (a, attr, name) {
    const candidates = []
    for (const id in a) {
      const v = a[id]
      if (v.data.name != name) { continue }
      candidates.push(v)
    }
    const id = Math.floor((Math.random() * candidates.length))
    return candidates[id]
  }

  this.find_target = function (a, attr, name) {
    // With attr
    for (const id in a) {
      const v = a[id]
      if (v.data.name != name) { continue }
      if (attr && v.data.attr != attr) { continue }
      return v
    }

    // Without attr
    for (const id in a) {
      const v = a[id]
      if (v.data.name != name) { continue }
      return v
    }
  }

  this.find_random = function (a) {
    const id = Math.floor((Math.random() * a.length))
    return a[id]
  }

  // Formatters

  this._header = function () {
    if (this.host.is_paradox()) {
      return `You are the <action data='learn about paradoxes'>paradox</action> of ${this.host.particle()} ${this.host.name()}.`
    }
    if (this.host.parent().is_paradox()) {
      return `You are ${this.host.particle()} <action data='warp to ${this.host.id}'>${this.host.name()}</action> in ${this.host.parent().particle()} ${this.host.parent().name()}.`
    }
    return `You are ${this.host.particle()} <action data='warp to ${this.host.id}'>${this.host.name()}</action> in ${this.host.parent().particle()} <action data='leave'>${this.host.parent().name()}</action>.`
  }

  this._note = function () {
    const parent = this.host.parent()
    return parent.data.note ? this.render(parent.data.note) : ''
  }

  /**
   * Pretty-prints the current view.
   * Brevity thresholds:
   * @param {Array} brevity_thresholds [threshold_1, threshold_2]
   *
   * For a number of visible objects, if below threshold_1, output like so:
   *   You see a teapot, a ceramic mug, a green saucer, and a blue saucer.
   * Else if below threshold_2:
   *   You see a ceramic mug, a green saucer, a teapot, and a blue saucer. (Randomised order each time)
   * Else:
   *   You see a teapot, a mug, and 2 saucers. (Removed attributes and combines similar objects, as well as randomised order)
   */
  this._view = function (brevity_thresholds = [5, 10]) {
    const oxford_comma = true

    let siblings = this.host.siblings().slice()
    let text_pieces = []

    let brevity_level = null
    if (siblings.length == 0) {
      return
    } else if (siblings.length < brevity_thresholds[0]) {
      brevity_level = "detailed"
    } else if (siblings.length < brevity_thresholds[1]) {
      brevity_level = "glance"
    } else {
      brevity_level = "brief"
    }

    /**
     * Shuffles array in place.
     * @param {Array} a items An array containing the items.
     *
     * TODO: Move somewhere reasonable
     */
    function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }

    if (brevity_level != "detailed") {
      siblings = shuffle(siblings)
    }

    if (brevity_level == "brief") {
      let obj_types = {}
      for (const id in siblings) {
        if (!!obj_types[siblings[id].data.name]) {
          obj_types[siblings[id].data.name] += 1
        } else {
          obj_types[siblings[id].data.name] = 1
        }
      }
      for (var obj in obj_types) {
        if (obj_types[obj] == 1) {
          text_pieces.push("aeiou".indexOf(obj.substr(0, 1).toLowerCase()) > -1 ? `an ${obj}` : `a ${obj}`)
        } else {
          text_pieces.push(pluralize(obj, obj_types[obj], true)) // eg. 5 saucers
        }
      }
    } else {
      for (const id in siblings) {
        text_pieces.push(siblings[id].to_a())
      }
    }

    let output = 'You see '

    for (var id in text_pieces) {
      if (id == 0) {
        output += text_pieces[id]
      } else if (id < text_pieces.length - 1) {
        output += `, ${text_pieces[id]}`
      } else {
        if (id != 1 && oxford_comma) {
          output += ', and '
        } else {
          output += ' and '
        }
        output += text_pieces[id]
      }
    }

    output += '.'
    return output
  }

  this._passive = function () {
    const children = this.host.children()
    let html = ''
    for (const id in children) {
      const p = children[id].passive()
      html += p ? `${this.render(p).toString(false)} | ` : ''
    }

    return html.substr(0, html.length - 2).trim()
  }

  this.action = function () {
    const siblings = this.host.siblings()

    for (const id in siblings) {
      const v = siblings[id]
      if (!v.is_program()) { continue }
      return `Would you like to <action data='${v.trigger()} the ${v.name()}'>${v.trigger()} the ${v.name()}</action>?`
    }
    return null
  }

  this._tips = function () {
    const a = []
    // Paradox
    if (this.host.is_paradox()) {
      a.push('Your vessel is a paradox, you may not leave.')
    }
    // Paradox
    if (this.host.parent().is_paradox()) {
      a.push(`The ${this.host.parent().name()} is a paradox, you may not leave.`)
    }
    // Empty
    if (this.host.siblings().length < 1) {
      a.push(`The ${this.host.parent().name()} is empty, why don't you <action>create</action> something.`)
    }
    // Note/Program
    if (!this.host.parent().data.note && !this.host.parent().is_program()) {
      a.push(`The ${this.host.parent().name()} has no description, you should add a <action>note</action>.`)
    }
    // Note/Program
    if (this.host.parent().is_program()) {
      a.push(`The ${this.host.parent().name()} has the "${this.host.parent().data.program}" program.`)
    }

    // Find custom actions
    const siblings = this.host.siblings()
    for (const id in siblings) {
      const v = siblings[id]
      if (!v.usable()) { continue }
      a.push(`The ${v.name()} grants you the "<action>${v.trigger()}</action>" action.`)
    }

    return a
  }

  this.visibles = function () {
    return [].concat(this.host.siblings()).concat(this.host.children())
  }

  this.remove_articles = function (str) {
    let s = ` ${str} `
    s = s.replace(/ a /g, ' ')
    s = s.replace(/ an /g, ' ')
    s = s.replace(/ the /g, ' ')
    s = s.replace(/ of /g, ' ')
    s = s.replace(/ some /g, ' ')
    s = s.replace(/ one /g, ' ')
    s = s.replace(/ two /g, ' ')
    return s.trim()
  }

  this.render = function (str, query = null, responder = null) {
    str = str.replace(/\-\-/g, '<br />').replace(/ \&\& /g, ' & ')

    if (str.indexOf('@(') < 0) { return str } // No Templating

    while (str.indexOf('@(') > -1) {
      const segment = this.extract(str)
      try {
        str = str.replace(`@${segment}`, `${new Wildcard(this.host, segment, query, responder)}`)
      } catch (err) {
        str = str.replace(`@${segment}`, segment)
        console.warn(err)
      }
    }
    return str
  }

  this.extract = function (str) {
    const from = str.indexOf('@(')
    const segment = str.substr(from, str.length - from)

    let opening = 0
    let closing = 0
    let i = 0

    while (i < segment.length) {
      const ch = segment[i]
      if (ch == '(') { opening++ }
      if (ch == ')') { closing++ }
      if (opening > 0 && closing > 0 && opening == closing) {
        return str.substr(from + 1, i)
      }
      i++
    }
    return str
  }

  // Errors
  // TODO: Move to errors.js

  this.err_NOTARGET = function (params, type = 'visible') {
    const target = this.remove_articles(params)
    return new Error('err_NOTARGET', `<p>There is no ${type} vessel "${target}". ${this.err_LEARN()}</p>`)
  }

  this.err_NOPARAM = function () {
    return new Error('err_NOPARAM', `<p>The ${this.name} action requires more information. ${this.err_LEARN()}</p>`)
  }

  this.err_NOVALID = function () {
    return new Error('err_NOVALID', `<p>Invalid use of the "${this.name}" action. ${this.err_LEARN()}</p>`)
  }

  this.err_UNKNOWN = function () {
    return new Error('err_UNKNOWN', `<p>Unknown action, to see a list of available actions, type "<action data='learn'>learn</action>".</p>`)
  }

  this.err_LEARN = function () {
    return new Error('err_LEARN', `For more details on how to ${this.name}, type "<action data='learn to ${this.name}'>learn to ${this.name}</action>".`)
  }

  // Helpers
  // TODO: Move somewhere rational & clean up (not everything uses these)

  String.prototype.to_base = function () { return this.toLowerCase().replace(/ /g, '_').replace(/[^0-9a-z\+]/gi, '').trim() }
  String.prototype.capitalize = function () { return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase() }
}

module.exports = Action
