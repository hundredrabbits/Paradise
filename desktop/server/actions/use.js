"use strict";

const Action = require(`../core/action`)

function Use(host)
{
  Action.call(this,host,"use");

  this.docs = "Trigger a vessel's program."
  
  this.operate = function(action,params)
  {
    if(!params){ return this.err_NOPARAM(); }

    let target = this.find(params,this.host.usables());

    if(!target){ return this.err_NOTARGET(params,"available"); }
    if(!target.usable()){ return `<p>${target} cannot be used.</p>`; }

    let cmd_rendered = this.render(target.data.program,params,target);
    this.host.cmd(cmd_rendered)

    if(target.data.reaction){
      let reaction_rendered = this.render(target.data.reaction,params,target);
      return `<p>${reaction_rendered}</p>`
    }
    
    return `<p>You used <action>${target}</action>.</p>`
  }
}

module.exports = Use