let Vessel = require('../vessel')

function Create(host)
{
  require(`../action`).call(this,host,"create");

  this.docs = "Hello there?"
  
  this.operate = function(params)
  {
    var parts = params.split(" ")
    var name = parts[parts.length-1]

    var vessel = new Vessel({
      name:name,
      owner:this.host.id,
      parent:this.host.data.parent
    });
    this.host.parade.add(vessel)
    
    return `You created ${vessel}.`
  }

}

module.exports = Create