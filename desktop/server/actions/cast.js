"use strict";

const Action = require(`../core/action`)

function Cast(host)
{
  Action.call(this,host,"cast");

  this.docs = "Move a child vessel into the parent vessel."

  this.operate = function(action,params)
  {
    if(!params){ return this.err_NOPARAM(); }
    
    let parts = this.remove_articles(params).trim().split(" ")
    let spell_name = `${parts[0]} ${parts[1]}`
    let spell = this.find(spell_name)

    if(!spell){ return `<p>Unknown spell ${spell_name}.</p>`; }
    if(!spell.is_program()){ return `<p>The ${spell.name()} is not a program.</p>`; }

    let target = this.find(parts[parts.length-1],this.host.siblings())

    target.cmd(spell.data.program);

    return `<p>You casted the ${spell.name()} on ${target.name()}.</p>`
  }
}

module.exports = Cast