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

  this.query = function(id = 0,q = "look")
  {
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

  this.ghost = function(id)
  {
    this.update()
    return this.world[id];
  }
}

module.exports = Paradise