function Inspect(host)
{
  require(`../action`).call(this,host,"inspect");

  this.docs = `Inspect a vessel to see its program, precise location and various details. An excellent tool to find issues with vessels.`;

  this.operate = function(params)
  {
    if(params.trim() == ""){ return `<p>Huh?! For more details on how to inspect, type <action data='help with inspect'>help</action>.</p>`; }

    var target = this.find(params,this.host.siblings());

    if(target){
      return `<p>You are inspecting <action>${target}</action>. ${this.make_location(target)}</p>`
    }
    else{
      return this.err_NOTARGET(params)
    }
  }

  this.make_location = function(target)
  {
    var html = ""

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