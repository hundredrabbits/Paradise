"use strict";

function Enter(host)
{
  require(`../action`).call(this,host,"enter");

  this.docs = "Enter a visible vessel."
  
  this.operate = function(params)
  {
    if(params.trim() == ""){ return `<p>Huh?! For more details on how to move, type <action data='help with enter'>help</action>.</p>`; }

    let target = this.find(params,this.host.siblings());

    if(target){
      this.host.move(target)
      return `<p>You entered the <action>${target.name()}</action>.</p>`
    }
    else{
      return this.err_NOTARGET(params)
    }
  }
}

module.exports = Enter