'use strict'

function Lisp (lib = {}) {
  const TYPES = { identifier: 0, number: 1, string: 2, bool: 3, symbol: 4 }

  const Context = function (scope, parent) {
    this.scope = scope
    this.parent = parent
    this.get = function (identifier) {
      if (identifier in this.scope) {
        return this.scope[identifier]
      } else if (this.parent !== undefined) {
        return this.parent.get(identifier)
      }
    }
  }

  const special = {
    let: function (input, context) {
      const letContext = input[1].reduce(function (acc, x) {
        acc.scope[x[0].value] = interpret(x[1], context)
        return acc
      }, new Context({}, context))
      return interpret(input[2], letContext)
    },
    def: function (input, context) {
      const identifier = input[1].value
      if (context.scope[identifier]) { console.warn(`Redefining variable: ${identifier}`) }
      const value = input[2].type === TYPES.string && input[3] ? input[3] : input[2]
      context.scope[identifier] = interpret(value, context)
      return value
    },
    defn: function (input, context) {
      const identifier = input[1].value
      if (context.scope[identifier]) { console.warn(`Redefining function: ${identifier}`) }
      const fnParams = input[2].type === TYPES.string && input[3] ? input[3] : input[2]
      const fnBody = input[2].type === TYPES.string && input[4] ? input[4] : input[3]
      context.scope[identifier] = function () {
        const lambdaArguments = arguments
        const lambdaScope = fnParams.reduce(function (acc, x, i) {
          acc[x.value] = lambdaArguments[i]
          return acc
        }, {})
        return interpret(fnBody, new Context(lambdaScope, context))
      }
    },
    'λ': function (input, context) {
      return function () {
        const lambdaArguments = arguments
        const lambdaScope = input[1].reduce(function (acc, x, i) {
          acc[x.value] = lambdaArguments[i]
          return acc
        }, {})
        return interpret(input[2], new Context(lambdaScope, context))
      }
    },
    if: function (input, context) {
      if (interpret(input[1], context)) {
        return interpret(input[2], context)
      }
      return input[3] ? interpret(input[3], context) : []
    },
    __obj: function (input, context) {
      const obj = {}
      for (let i = 1; i < input.length; i += 2) {
        obj[interpret(input[i], context)] = interpret(input[i + 1], context)
      }
      return obj
    }
  }

  const interpretList = function (input, context) {
    if (input.length > 0 && input[0].value in special) {
      return special[input[0].value](input, context)
    }
    const list = []
    for (let i = 0; i < input.length; i++) {
      if (input[i].type === TYPES.symbol) {
        if (input[i].host) {
          const host = context.get(input[i].host)
          if (host) {
            list.push(host[input[i].value])
          }
        } else {
          list.push(obj => obj[input[i].value])
        }
      } else {
        list.push(interpret(input[i], context))
      }
    }
    return list[0] instanceof Function ? list[0].apply(undefined, list.slice(1)) : list
  }

  const interpret = function (input, context) {
    if (!input) { console.warn('Lisp', 'error', context.scope); return null }
    if (context === undefined) {
      return interpret(input, new Context(lib))
    } else if (input instanceof Array) {
      return interpretList(input, context)
    } else if (input.type === TYPES.identifier) {
      return context.get(input.value)
    } else if (input.type === TYPES.number || input.type === TYPES.symbol || input.type === TYPES.string || input.type === TYPES.bool) {
      return input.value
    }
  }

  const categorize = function (input) {
    if (!isNaN(parseFloat(input))) {
      return { type: TYPES.number, value: parseFloat(input) }
    } else if (input[0] === '"' && input.slice(-1) === '"') {
      return { type: TYPES.string, value: input.slice(1, -1) }
    } else if (input[0] === ':') {
      return { type: TYPES.symbol, value: input.slice(1) }
    } else if (input.indexOf(':') > 0) {
      return { type: TYPES.symbol, host: input.split(':')[0], value: input.split(':')[1] }
    } else if (input === 'true' || input === 'false') {
      return { type: TYPES.bool, value: input === 'true' }
    } else {
      return { type: TYPES.identifier, value: input }
    }
  }

  const parenthesize = function (input, list) {
    if (list === undefined) { return parenthesize(input, []) }
    const token = input.shift()
    if (token === undefined) {
      return list.pop()
    } else if (token === '{') {
      input.unshift('__obj')
      list.push(parenthesize(input, []))
      return parenthesize(input, list)
    } else if (token === '(') {
      list.push(parenthesize(input, []))
      return parenthesize(input, list)
    } else if (token === ')' || token === '}') {
      return list
    } else {
      return parenthesize(input, list.concat(categorize(token)))
    }
  }

  const tokenize = function (input) {
    const i = input.replace(/^\;.*\n?/gm, '').split('"')
    return i.map(function (x, i) {
      return i % 2 === 0 ? x.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').replace(/\{/g, ' { ').replace(/\}/g, ' } ') : x.replace(/ /g, '!ws!')
    }).join('"').trim().split(/\s+/).map(function (x) { return x.replace(/!ws!/g, ' ') })
  }

  this.parse = function (input) {
    return parenthesize(tokenize(input))
  }

  this.run = (input, host, guest) => {
    lib.host = host
    lib.guest = guest
    return interpret(this.parse(`(${input})`))
  }
}

function findSegs (str) {
  const segments = []
  let seq = 0
  let len = 0
  let from = null
  for (const c of str) {
    if (c === '(') {
      if (seq === 0) { from = len } ;
      seq += 1
    }
    if (c === ')') {
      if (seq === 1) { segments.push(str.substr(from, len - from + 1)) }
      seq -= 1
    }
    len += 1
  }
  return segments
}

String.prototype.template = function (host, guest) {
  let str = `${this}`
  for (const seg of findSegs(str)) {
    str = str.replace(seg, `${interpreter.run(seg, host, guest)}`)
  }
  return str
}
