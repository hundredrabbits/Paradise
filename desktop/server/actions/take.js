"use strict";

function Take(host)
{
  require(`../action`).call(this,host,"take");

  this.docs = "Move a visible vessel into a child vessel."

  this.requires_params = true;
  
  this.operate = function(params)
  {
    let target = this.find(params,this.host.siblings());

    if(target){
      target.move(this.host)
      return `<p>You took ${target.particle()} <action data='drop the ${target.name()}'>${target.name()}</action>.</p>`
    }
    else{
      return this.err_NOTARGET(params)
    }
  }
}

module.exports = Take