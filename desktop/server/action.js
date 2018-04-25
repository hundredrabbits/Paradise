function Action(host,name)
{
  this.name = name;
  this.host = host;
  this.docs = `No documentation for '${name}'`

  this.run = function(params = "")
  {
    console.log(`${this.name}->${params}`)
    this.operate(params);

    var h = {}
    h.host = this.host;
    h.reaction = this.reaction();
    console.log("")
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