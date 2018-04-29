let Vessel = require('../vessel')

function Create(host)
{
  require(`../action`).call(this,host,"create");

  this.docs = "Create a new vessel at your current location. Vessel names and attributes must include less than 14 characters and be unique. "
  
  this.operate = function(params)
  {
    var parts = this.remove_articles(params).trim().split(" ")
    var attr  = parts[parts.length-2] && parts[parts.length-2] != parts[parts.length-1] ? parts[parts.length-2].toLowerCase() : null
    var name  = parts[parts.length-1].toLowerCase()

    if(name == ""){ return `<p>You must give a name to your vessel, for more details on how to create, type <action data='help with create'>help</action>.</p>`; }

    var data = {
      name:name,
      attr:attr,
      owner:this.host.id,
      parent:this.host.data.parent
    }

    var vessel = new Vessel(data);
    var success = this.host.parade.add(vessel)
    
    return !success ? `<p>A visible vessel with that name already exists.</p>` : `<p>You created a <action data='enter the ${vessel.name()}'>${vessel.name()}</action> in the ${this.host.parent().name()}.</p>`
  }

}

module.exports = Create