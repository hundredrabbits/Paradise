let basic = {
  name: "ghost",
  attr: "hungry",
  parent: 0,
  owner: -1,
}

function Vessel(data = basic)
{
  this.parade = null;
  this.data = data;

  this.act = function(action,params)
  {
    const responder = this.response(action)
    return new responder(this).run(params)
  }

  this.response = function(action)
  {
    try{
      return require(`./actions/${action}`);
    }
    catch(ex){
      return require(`./action`);
    } 
    return require(`./action`);
  }

  this.parent = function()
  {
    console.log("Parent:",this.data.parent,this.parade) // TODO
  }

  this.sight = function()
  {
    console.log("Sight:")
    var siblings = this.siblings();
    return siblings
  }

  this.siblings = function()
  {
    var a = []
    for(id in this.parade.world){
      var vessel = this.parade.world[id];
      if(vessel.parent().id == this.host.parent.id){
        a.push(vessel)
      }
    }
    return a
  }

  this.to_h = function()
  {
    return {
      name: this.name,
      attr: this.attr
    }
  }
}

module.exports = Vessel