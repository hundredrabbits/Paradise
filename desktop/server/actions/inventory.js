'use strict'

const Action = require(`../core/action`)

function Inventory (host) {
  Action.call(this, host, 'inventory')

  this.docs = "View the contents of your inventory."

  this.operate = function () {
    const oxford_comma = true

    const children = this.host.children()

    if (children.length == 0) {
      return 'You are not carrying any vessels.'
    }

    let output = 'You are carrying '

    for (var id in children) {
      if (id == 0) {
        output += children[id].to_a()
      } else if (id < children.length - 1) {
        output += `, ${children[id].to_a()}`
      } else {
        if (id != 1 && oxford_comma) {
          output += ', and '
        } else {
          output += ' and '
        }
        output += children[id].to_a()
      }
    }

    output += '.'
    return output
  }
}

module.exports = Inventory
