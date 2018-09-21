"use strict";

function Transform(host)
{
  require(`../action`).call(this,host,"transform");

  this.docs = "Change your current vessel name."

  this.operate = function(action,params)
  {
    if(!params){ return this.err_NOPARAM(); }
    
    let sides = ` ${params} `.replace(" into "," in ").split(" in ")
    let target = sides[0].trim() ? this.find(sides[0],this.host.siblings()) : this.host;

    if(!target){ return this.err_NOTARGET(sides[0]); }

    let parts = this.remove_articles(sides[1]).trim().split(" ")
    let origin = `${target}`;

    if(!parts[0]){ return this.err_NOVALID(); }

    if(parts.length == 2){
      target.set("name",parts[1])
      target.set("attr",parts[0])
      return `<p>You transformed ${target.id != this.host.id ? origin+' ' : ''}into ${target}.</p>`
    }
    else if(parts.length == 1){
      target.set("name",parts[0]);
      return `<p>You transformed ${target.id != this.host.id ? origin+' ' : ''}into ${target}.</p>`
    }

    return this.err_NOVALID();
  }
}

module.exports = Transform