const Vessel = require('./vessel')

function Paradise()
{
  this.world = [
    new Vessel({name:"ghost",parent:1,note:"Well, well, hello there."}),
    new Vessel({name:"library",parent:1,note:"It's raining in the library, as it always did and ever will. "})
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
}

module.exports = Paradise