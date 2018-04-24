const Vessel = require('./vessel')

function Paradise()
{
  this.world = [new Vessel().to_h(),new Vessel({name:"teacup"}).to_h()]

  this.find_ghost = function()
  {
    return new Vessel(this.world[0]);
  }

  this.find_visibles_for = function(vessel)
  {
    var a = []
    for(id in this.world){
      var vessel = new Vessel(this.world[id]);
      a.push(vessel)
    }
    return a
  }
}

module.exports = Paradise