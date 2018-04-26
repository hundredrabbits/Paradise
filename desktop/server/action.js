function Action(host,name)
{
  this.name = name;
  this.host = host;
  this.docs = `No documentation for '${name}'`

  this.run = function(params = "")
  {
    this.operate(params);

    var h = {
      sight: {
        h1:`You are ${this.host} in ${this.host.parent()}.`,
        page:`-${this.host.parent().id}-`,
        note:`${this.host.parent().data.note}`,
        view:`You see..`,
        tips:`<ln>No tips..</ln>`,
        reaction: this.reaction()
      },
      docs : {
        drop: "something"
      }
    }
    return h
  }

  this.reaction = function()
  {
    return ""
  }

  this.operate = function()
  {
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