"use strict";

function Move(host)
{
  require(`../action`).call(this,host,"move");

  this.docs = "Move a visible vessel into another visible vessel."

  this.operate = function(action,params)
  {
    if(!params){ return this.err_NOPARAM(); }

    if(params.indexOf(" in ") < 0){ return `<p>You must use the word <action data='move the vessel1 in the vessel2'>in</action>.</p>`; }
    
    let parts = params.replace(" into "," in ").split(" in ");

    let target_a = this.find(parts[0],this.host.siblings());
    let target_b = this.find(parts[1],this.host.siblings());

    if(target_a && target_b){
      target_a.move(target_b);
      return `<p>You moved the ${target_a.name()} in the <action data='enter the ${target_b.name()}'>${target_b.name()}</action>.</p>`
    }
    else{
      return this.err_NOTARGET(params)
    }
  }
}

module.exports = Move