'use strict'

const Action = require(`../core/action`)
const errors = require('../core/errors')

function Inventory (host) {
  Action.call(this, host, 'inventory')

  this.docs = 'View the contents of your inventory.'

  this.operate = function () {
    // 'a, b, c, and d' if true
    // 'a, b, c and d' if false
    const oxford_comma = true

    const children = this.host.children()

    if (children.length == 0) {
      return errors.NOCHANGE('You are not carrying any vessels.')
    }

    let output = '<p>You are carrying '

    // For each carried item:
    for (var id in children) {
      if (id == 0) {
        // If it is the first one, add it to the output
        output += children[id].to_a()
      } else if (id < children.length - 1) {
        // If it is not first or last, add it with  a comma before
        output += `, ${children[id].to_a()}`
      } else {
        // If it is the last, add an 'and' before it
        if (id != 1 && oxford_comma) {
          output += ', and '
        } else {
          output += ' and '
        }
        output += children[id].to_a()
      }
    }

    output += '.</p>'
    return output
  }
}

module.exports = Inventory
