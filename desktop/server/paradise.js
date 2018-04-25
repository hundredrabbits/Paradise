const Vessel = require('./vessel')

function Paradise()
{
  this.world = [
    new Vessel({name:"ghost",parent:0}),
    new Vessel({name:"cupboard",parent:0}),
    new Vessel({name:"teacup",parent:0})]

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