let Vessel = require('../vessel')

function Create(host)
{
  require(`../action`).call(this,host,"create");

  this.docs = "Create a new vessel at your current location. Vessel names and attributes must include less than 14 characters and be unique. "
  
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
    
    return `<p>You created <action data='enter the ${vessel.name()}'>${vessel}</action> in the ${this.host.parent().name()}.</p>`
  }

}

module.exports = Create