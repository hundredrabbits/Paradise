function Action(host)
{
  this.host = host;

  this.run = function(params)
  {
    this.operate(params);

    var h = {}
    h.host = this.host;
    h.reaction = this.reaction();
    h.visibles = this.host.sight();
    return h
  }

  this.reaction = function()
  {
    return ""
  }

  this.operate = function()
  {
    console.log("Nothing to do..")
  }

  this.move = function(target)
  {
    console.log(`Moving $${this.host.id} into $${target.id}.`)
    this.host.data.parent = target.id
  }


  // Parsers

  this.find_target = function(target,a)
  {
    for(id in a){
      var vessel = a[id];
      if(vessel.is(target)){
        return vessel
      }
    }
    return null
  }

  String.prototype.to_base = function()
  {
    return this.toLowerCase().replace(/ /g,"_").replace(/[^0-9a-z\+]/gi,"").trim();
  }
}

module.exports = Action