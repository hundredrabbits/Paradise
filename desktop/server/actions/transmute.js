"use strict";

function Transmute(host)
{
  require(`../action`).call(this,host,"transmute");

  this.docs = "Change your current vessel's, or a target vessel's, attribute."
  
  this.operate = function(action,params)
  {
    if(!params){ return this.err_NOPARAM(); }
    
    let parts = this.remove_articles(params).split(" ")
    let attr = parts[parts.length-1].toLowerCase()
    let target = parts.length > 2 ? this.find_target(this.host.siblings(),parts[0],null) : this.host
    if(!target){ return this.err_NOTARGET(parts[0]); }
    let origin = target.data.attr
    
    target.set("attr",attr != "anything" ? attr : '')
    return `<p>You transmuted ${target.id != this.host.id ? origin : ''} into <action>${attr}</action>.</p>`
  }
}

module.exports = Transmute