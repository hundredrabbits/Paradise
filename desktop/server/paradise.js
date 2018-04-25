const Vessel = require('./vessel')

function Paradise()
{
  this.world = [
    new Vessel({name:"ghost",parent:0}),
    new Vessel({name:"cupboard",parent:0}),
    new Vessel({name:"teacup",parent:0})]

  this.add = function(vessel)
  {
    console.log(`+ add ${vessel.to_s()}`)
    this.world.push(vessel)
    this.update()
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
    this.ghost().cmd("create a table")
    this.ghost().cmd("enter the table")
    this.ghost().cmd("leave the table")
    console.log("---------------ADVANCED---------------\n")
    this.ghost().cmd("move over the table")
    this.ghost().cmd("warp to 0")
    this.ghost().cmd("transform into a cat")
    this.ghost().cmd("transmute into gold")
    console.log("---------------NARRATIVE---------------\n")
    this.ghost().cmd("note it is raining.")
    this.ghost().cmd("inspect")
    this.ghost().cmd("take the table")
    this.ghost().cmd("drop the table")
    console.log("---------------PROGRAM---------------\n")
    this.ghost().cmd("create a machine")
    this.ghost().cmd("enter the machine")
    this.ghost().cmd("program create a coffee")
    this.ghost().cmd("leave")
    this.ghost().cmd("use the machine")
    this.ghost().cmd("call the machine")
    this.ghost().cmd("cast the machine on the teapot")
  }
}

module.exports = Paradise