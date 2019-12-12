'use strict'

const lainLibrary = {
  // str

  substr: (str, from, len) => {
    return `${str}`.substr(from, len)
  },

  split: (str, char) => {
    return `${str}`.split(char)
  },

  replace: (str, from, to) => {
    return `${str}`.replaceAll(from, to)
  },

  lc: (str) => {
    return `${str}`.toLowerCase()
  },

  tc: (str) => {
    return `${str}`.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
  },

  uc: (str) => {
    return `${str}`.toUpperCase()
  },

  cc: (str) => {
    return `${str}`.substr(0, 1).toUpperCase() + `${str}`.substr(1)
  },

  // arr

  map: (arr, fn) => {
    return arr.map((val, id, arr) => fn)
  },

  filter: (arr, name) => {
    return arr.filter(window[name])
  },

  sort: (arr, name) => {
    return arr.sort(window[name])
  },

  reduce: (arr, fn, acc = '') => {
    return arr.reduce((acc, val, id, arr) => fn, acc)
  },

  concat: (...arr) => {
    return arr.reduce((acc, item) => { return `${acc}${item}` }, '')
  },

  join: (arr, ch = '') => {
    return arr ? arr.join(ch) : arr
  },

  splice: (arr, index, length) => {
    return arr.splice(index, length)
  },

  slice: (arr, index, length) => {
    return arr.slice(index, length)
  },

  reverse: (arr) => {
    return arr.reverse()
  },

  for: (arr, fn) => {
    return arr.reduce((acc, item) => { acc.push(fn(item)); return acc }, [])
  },

  rest: ([_, ...arr]) => {
    return arr
  },

  len: (arr) => {
    return arr.length
  },

  index: (arr, item) => {
    return arr.indexOf(item)
  },

  pry: (arr, name) => {
    return arr.map((val) => { return val[name] })
  },

  'pry-method': (arr, name, param) => {
    return arr.map((val) => { return val[name](param) })
  },

  uniq: (arr) => {
    return arr.filter((value, index, self) => { return self.indexOf(value) === index })
  },

  like: (arr, target) => {
    return arr.filter((val) => { return val.indexOf(target) > -1 })
  },

  until: (arr, fn) => {
    for (const item of arr) {
      if (fn(item)) { return item }
    }
  },

  random: (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
  },

  // obj

  set: (obj, key, val) => {
    obj[key] = val
  },

  get: (obj, key) => {
    return obj[key]
  },

  keys: (obj) => {
    return obj ? Object.keys(obj) : []
  },

  values: (obj) => {
    return obj ? Object.values(obj) : []
  },

  entries: (obj) => {
    return obj ? Object.entries(obj) : []
  },

  tunnel: (obj, ...keys) => {
    return keys.reduce((acc, key) => { return key && acc && acc[key] ? acc[key] : null }, obj)
  },

  // logic

  gt: (a, b) => {
    return a > b
  },

  lt: (a, b) => {
    return a < b
  },

  eq: (a, b) => {
    return a === b
  },

  neq: (a, b) => {
    return a !== b
  },

  and: (...args) => {
    for (const arg of args) {
      if (!arg) { return arg }
    }
    return args[args.length - 1]
  },

  or: (...args) => {
    for (const arg of args) {
      if (arg) { return arg }
    }
    return args[args.length - 1]
  },

  either: (...args) => {
    for (const arg of args) {
      if (arg) { return arg }
    }
    return null
  },

  // Math

  add: (...args) => { // Adds values.
    return args.reduce((sum, val) => sum + val)
  },

  sub: (...args) => { // Subtracts values.
    return args.reduce((sum, val) => sum - val)
  },

  mul: (...args) => { // Multiplies values.
    return args.reduce((sum, val) => sum * val)
  },

  div: (...args) => { // Divides values.
    return args.reduce((sum, val) => sum / val)
  },

  mod: (a, b) => { // Returns the modulo of a and b.
    return a % b
  },

  rand: (val) => {
    return Math.floor(Math.random() * val)
  },

  clamp: (val, min, max) => { // Clamps a value between min and max.
    return Math.min(max, Math.max(min, val))
  },

  floor: (item) => {
    return Math.floor(item)
  },

  ceil: (item) => {
    return Math.ceil(item)
  },

  step: (val, step) => {
    return Math.round(val / step) * step
  },

  match: (source, items) => {
    const filtered = items.filter((val) => { return source[val.toUpperCase()] })
    return filtered.map((val) => { return source[val.toUpperCase()] })
  },

  fix: (...items) => {
    return items[0].toFixed(items[1])
  },

  debug: (item) => {
    console.log(item)
    return item
  },

  time: {
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
      var today = new Date()
      return today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    }
  },

  // Special

  action: (action, name) => {
    return `<a href='#' data-action='${action}'>${name || action}</a>`
  }
}
