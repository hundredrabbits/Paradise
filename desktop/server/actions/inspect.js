"use strict";

const Action = require(`../core/action`)

function Inspect(host)
{
  Action.call(this,host,"inspect");

  this.docs = `Inspect a vessel to see its program, precise location and various details. An excellent tool to find issues with vessels.`;

  this.operate = function(action,params)
  {
    if(params.trim() == ""){ return this.inspect_parent(); }

    const target = this.find(params,this.host.siblings());

    if(target){
      return `<p>You are inspecting <action>${target}</action>#${target.id}. ${this.make_location(target)}</p>`
    }
    else{
      return this.err_NOTARGET(params)
    }
  }

  this.inspect_parent = function()
  {
    return `<p>${this.make_location()}</p>`
  }

  this.make_location = function(target = this.host.parent())
  {
    if(target.parent().is_paradox()){
      return `The ${target.name()} ${target.type()}, located in the ${target.parent().name()} ${target.parent().type()} paradox, was created by ${target.owner()}.`
    }
    if(target.is_paradox()){
      return `The ${target.name()} ${target.type()} paradox was created by ${target.owner()}.`
    }
    return `The ${target.name()} ${target.type()}, located in the ${target.parent().name()} ${target.parent().type()}, part of the ${target.stem().name()} constellation, was created by ${target.owner()}.`
  }
}

module.exports = Inspect