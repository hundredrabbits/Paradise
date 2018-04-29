let Vessel = require('../vessel')

function Create(host)
{
  require(`../action`).call(this,host,"create");

  this.docs = "Create a new vessel at your current location. Vessel names and attributes must include less than 14 characters and be unique. "
  
  this.operate = function(params)
  {
    var parts = this.remove_articles(params).trim().split(" ")
    var attr  = parts[0] != parts[1] ? parts[0].toLowerCase() : null
    var name  = parts[1].toLowerCase()

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