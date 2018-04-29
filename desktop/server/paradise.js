const Vessel = require('./vessel')

function Paradise()
{
  this.game = require('./game')

  this.reset = function()
  {
    this.import([{name:"ghost",parent:1,owner:0,note:"Well, well, hello there."},{name:"library",attr:"ceramic",parent:1,owner:1,note:"Hi @full, welcome to the @_full, a persistent vessel and stem to this world. Type <action data='help'>help</action> to get started."}]);
  }

  this.load = function()
  {
    var previous = this.game.load()
    
    if(previous){
      console.info("Loaded world")
      this.import(previous)
    }
    else{
      console.info("New world")
      this.reset();
    }
  }
  
  // Start

  this.import = function(json)
  {
    var a = []
    for(id in json){
      var vessel = new Vessel(json[id])
      a.push(vessel)
    }
    this.world = a;
  }

  this.export = function()
  {
    var a = []

    for(id in this.world){
      var json = this.world[id].to_h()
      a.push(json)
    }
    return JSON.stringify(a)
  }

  this.add = function(vessel)
  {
    if(this.exists(vessel)){
      console.log(`+ duplicate ${vessel.name()}`)
      return false;
    }
    console.log(`+ add ${vessel.name()}`)
    this.world.push(vessel)
    this.update()
    return true;
  }

  this.exists = function(target)
  {
    for(id in this.world){
      var v = this.world[id]
      if(v.data.name != target.data.name){ continue; }
      if(v.data.attr != target.data.attr){ continue; }
      if(v.data.parent != target.data.parent){ continue; }
      return true
    }
    return false
  }

  this.query = function(id = 0,q = "look")
  {
    this.game.save(this)
    return this.ghost(id).cmd(q)
  }

  this.update = function()
  {
    // Connect IDs
    for(id in this.world){
      this.world[id].parade = this
      this.world[id].id = parseInt(id)
    }
  }

  this.ghost = function(id = client.id)
  {
    this.update()
    return this.world[id];
  }

  this.random = function()
  {
    var id = Math.floor((Math.random() * this.world.length));
    return this.world[id]
  }

  this.to_h = function()
  {
    var a = []
    // Connect IDs
    for(id in this.world){
      a.push(this.world[id].to_h())
    }
    return a
  }

  this.load();
}

module.exports = Paradise