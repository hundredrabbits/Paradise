"use strict";

function Usage(host)
{
  require(`../action`).call(this,host,"usage");

  this.docs = 'Usage sets an action word to a program vessel. You can also set a custom reaction to a program use by adding a short sentence after the usage action word.'

  this.operate = function(params)
  {
    let parts = params.split(" ")
    let action = parts[0]
    let reaction = params.replace(action,"").trim()

    this.host.parent().set("usage",action.toLowerCase())
    if(reaction){
      this.host.parent().set("reaction",reaction)
    }
    return params.trim() == "" ? `<p>You removed the usage of ${this.host.parent()}.` : `<p>You set the usage of ${this.host.parent()} to '${action}'${reaction ? ', with the "'+reaction+'" reaction' : ''}.</p>`
  }
}

module.exports = Usage