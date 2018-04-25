const Vessel = require('./vessel')

function Paradise()
{
  this.world = [new Vessel(),new Vessel({name:"teacup"})]

  this.ghost = function()
  {
    var v = new Vessel(this.world[0])
    v.parade = this
    return v;
  }
}

module.exports = new Paradise()