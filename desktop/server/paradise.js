const Vessel = require('./vessel')

function Paradise()
{
  this.world = [
    new Vessel({name:"ghost",parent:1,note:"Well, well, hello there."}),
    new Vessel({name:"library",parent:1,note:"It's raining, still."})
  ]

  this.add = function(vessel)
  {
    console.log(`+ add ${vessel.name()}`)
    this.world.push(vessel)
    this.update()
  }

  this.query = function(q = "look")
  {
    return this.ghost().cmd(q)
  }

  this.update = function()
  {
    // Connect IDs
    for(id in this.world){
      this.world[id].parade = this
      this.world[id].id = parseInt(id)
    }
  }

  this.ghost = function()
  {
    this.update()
    return this.world[0];
  }

  this.walkthrough = function()
  {    
    console.log("---------------BASIC---------------\n")
    this.ghost().cmd("create a cupboard")
    this.ghost().cmd("become a ghost")
    this.ghost().cmd("enter the cupboard")
    this.ghost().cmd("leave")
    console.log("---------------ADVANCED---------------\n")
    this.ghost().cmd("help")
    this.ghost().cmd("help with drop")
    this.ghost().cmd("warp to 1")
    this.ghost().cmd("create a teacup")
    this.ghost().cmd("take the teacup")
    this.ghost().cmd("drop the teacup")
    console.log("---------------NARRATIVE---------------\n")
    this.ghost().cmd("move over the teacup")
    this.ghost().cmd("note it is raining in the cupboard.")
    this.ghost().cmd("transform into a cat")
    this.ghost().cmd("transmute into gold")
    console.log("---------------PROGRAM---------------\n")
    this.ghost().cmd("enter the teacup")
    this.ghost().cmd("program create a coffee")
    this.ghost().cmd("leave")
    this.ghost().cmd("inspect the teacup")
    this.ghost().cmd("use the teacup")
    this.ghost().cmd("cast the teacup")
  }
}

module.exports = Paradise