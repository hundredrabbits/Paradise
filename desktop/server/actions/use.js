"use strict";

const Action = require(`../core/action`)
const Wildcard = require('../core/wildcard')

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

    this.host.cmd(new Wildcard(this.host,target.data.program,params,target).toString(false))

    return target.data.reaction ? `<p>${new Wildcard(this.host,target.data.reaction,params,target).toString(false)}</p>` : `<p>You used <action>${target}</action>.</p>`
  }
}

module.exports = Use