let Vessel = require('../vessel')

function Create(host)
{
  require(`../action`).call(this,host,"create");

  this.operate = function(params)
  {
    var parts = params.split(" ")
    var name = parts[parts.length-1]

    console.log(`Paradise size: ${this.host.parade.world.length}`)
    console.log(`Creating ${name}`)

    var vessel = new Vessel({
      name:name,
      owner:this.host.id,
      parent:this.host.data.parent
    });

    this.host.parade.add(vessel)

    console.log(`Paradise size: ${this.host.parade.world.length}`)
  }
}

module.exports = Create