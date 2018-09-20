"use strict";

function Drop(host)
{
  require(`../action`).call(this,host,"drop");

  this.docs = "Move a child vessel into the parent vessel."

  this.operate = function(params)
  {
    if(!params){ return this.err_NOPARAM(); }
    
    let target = this.find(params,this.host.children());

    if(target){
      target.move(this.host.parent())
      return `<p>You dropped ${target.particle()} <action data='take the ${target.name()}'>${target.name()}</action>.</p>`
    }
    else{
      return this.err_NOTARGET(params,"inventory")
    }
  }
}

module.exports = Drop