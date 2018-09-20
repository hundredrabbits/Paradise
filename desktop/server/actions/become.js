"use strict";

function Become(host)
{
  require(`../action`).call(this,host,"become");

  this.docs = "Become a visible vessel."
  
  this.operate = function(params)
  {
    if(!params){ return this.err_NOPARAM(); }

    let target = this.find(params,this.host.siblings());

    if(target){
      client.change_vessel(target.id)
    }
    else{
      return this.err_NOTARGET(params)
    }
  }
}

module.exports = Become