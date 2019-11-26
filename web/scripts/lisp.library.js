'use strict'

function Library () {
  this.time = {
    now: () => {
      return Date.now()
    },
    new: (g) => {
      return new Date(g)
    },
    iso: (g) => {
      return (g ? new Date(g) : new Date()).toISOString()
    },
    'years-since': (q = '1986-03-22') => {
      return ((new Date() - new Date(q)) / 31557600000)
    },
    date: () => {
      var today = new Date()
      return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    },
    time: () => {
      var today = new Date()
      return today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    },
    toString: () => {
      return this.time.time()
    }
  }

  // str

  this.substr = (str, from, len) => {
    return `${str}`.substr(from, len)
  }

  this.split = (str, char) => {
    return `${str}`.split(char)
  }

  this.replace = (str, from, to) => {
    return `${str}`.replaceAll(from, to)
  }

  this.lc = (str) => {
    return `${str}`.toLowerCase()
  }

  this.tc = (str) => {
    return str.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
  }

  this.uc = (str) => {
    return `${str}`.toUpperCase()
  }

  this.cc = (str) => {
    return `${str}`.substr(0, 1).toUpperCase() + str.substr(1)
  }

  // arr

  this.map = (arr, fn) => {
    return arr.map((val, id, arr) => fn)
  }

  this.filter = (arr, name) => {
    return arr.filter(window[name])
  }

  this.sort = (arr, name) => {
    return arr.sort(window[name])
  }

  this.reduce = (arr, fn, acc = '') => {
    return arr.reduce((acc, val, id, arr) => fn, acc)
  }

  this.concat = (...arr) => {
    return arr.reduce((acc, item) => { return `${acc}${item}` }, '')
  }

  this.join = (arr, ch = '') => {
    return arr.join(ch)
  }

  this.splice = (arr, index, length) => {
    return arr.splice(index, length)
  }

  this.slice = (arr, index, length) => {
    return arr.slice(index, length)
  }

  this.reverse = (arr) => {
    return arr.reverse()
  }

  this.for = (arr, fn) => {
    return arr.reduce((acc, item) => { acc.push(fn(item)); return acc }, [])
  }

  this.rest = ([_, ...arr]) => {
    return arr
  }

  this.len = (arr) => {
    return arr.length
  }

  this.index = (arr, item) => {
    return arr.indexOf(item)
  }

  this.pry = (arr, name) => {
    return arr.map((val) => { return val[name] })
  }

  this.uniq = (arr) => {
    return arr.filter((value, index, self) => { return self.indexOf(value) === index })
  }

  this.like = (arr, target) => {
    return arr.filter((val) => { return val.indexOf(target) > -1 })
  }

  this.until = (arr, fn) => {
    for (const item of arr) {
      if (fn(item)) { return item }
    }
  }

  this.random = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  // obj

  this.set = (obj, key, val) => {
    obj[key] = val
  }

  this.get = (obj, key) => {
    return obj[key]
  }

  this.keys = (obj) => {
    return obj ? Object.keys(obj) : []
  }

  this.values = (obj) => {
    return obj ? Object.values(obj) : []
  }

  this.entries = (obj) => {
    return obj ? Object.entries(obj) : []
  }

  this.tunnel = (obj, ...keys) => {
    return keys.reduce((acc, key) => { return key && acc && acc[key] ? acc[key] : null }, obj)
  }

  // logic

  this.gt = (a, b) => {
    return a > b
  }

  this.lt = (a, b) => {
    return a < b
  }

  this.eq = (a, b) => {
    return a === b
  }

  this.neq = (a, b) => {
    return a !== b
  }

  this.and = (...args) => {
    for (const arg of args) {
      if (!arg) { return arg }
    }
    return args[args.length - 1]
  }

  this.or = (...args) => {
    for (const arg of args) {
      if (arg) { return arg }
    }
    return args[args.length - 1]
  }

  this.either = (...args) => {
    for (const arg of args) {
      if (arg) { return arg }
    }
    return null
  }

  // Math

  this.add = (...args) => { // Adds values.
    return args.reduce((sum, val) => sum + val)
  }

  this.sub = (...args) => { // Subtracts values.
    return args.reduce((sum, val) => sum - val)
  }

  this.mul = (...args) => { // Multiplies values.
    return args.reduce((sum, val) => sum * val)
  }

  this.div = (...args) => { // Divides values.
    return args.reduce((sum, val) => sum / val)
  }

  this.mod = (a, b) => { // Returns the modulo of a and b.
    return a % b
  }

  this.rand = (min,max) => {
    return Math.floor(Math.random() * (max - min) ) + min
  }

  this.clamp = (val, min, max) => { // Clamps a value between min and max.
    return Math.min(max, Math.max(min, val))
  }

  this.floor = (item) => {
    return Math.floor(item)
  }

  this.ceil = (item) => {
    return Math.ceil(item)
  }

  this.step = (val, step) => {
    return Math.round(val / step) * step
  }

  this.match = (source, items) => {
    const filtered = items.filter((val) => { return source[val.toUpperCase()] })
    return filtered.map((val) => { return source[val.toUpperCase()] })
  }

  this.fix = (...items) => {
    return items[0].toFixed(items[1])
  }

  this.debug = (item) => {
    return console.info(item)
  }

  // Special

  this.action = (action, name) => {
    return `<a href='#' data-action='${action}'>${name || action}</a>`
  }
}
