"use strict";

const Action = require(`../core/action`)

function Note(host)
{
  Action.call(this,host,"note");

  this.docs = "Add a description to the current parent vessel."

  this.operate = function(action,params)
  {
    if(!this.host.parent().data.note && params.trim() == ""){ return this.err_NOVALID(); }

    const is_update = !this.host.parent().data.note ? false : true;

    this.host.parent().set("note",params)

    return `<p>You ${params == "" ? 'removed the' : is_update ? 'updated the' : 'added a'} description to <action>${this.host.parent()}</action>.</p>`
  }
}

module.exports = Note