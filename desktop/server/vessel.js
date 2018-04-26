let basic = {
  name: "ghost",
  attr: "hungry",
  parent: 0,
  owner: -1,
}

function Vessel(data = basic)
{
  this.parade = null
  this.data = data;

  this.cmd = function(str)
  {
    var parts = str.split(" ")
    return this.act(parts.splice(0,1)[0],parts.join(' '))
  }

  this.act = function(action,params)
  {
    const responder = this.response(action)
    return new responder(this).run(params)
  }

  this.set = function(key,value)
  {
    console.log(`- set ${this.name()} ${key}='${value}'`)
    this.data[key] = value;
  }

  this.move = function(target)
  {
    this.set("parent",target.id)
  }

  this.response = function(action)
  {
    try{
      return require(`./actions/${action}`);
    }
    catch(err){
      return require(`./action`);
    } 
  }

  this.parent = function()
  {
    return this.parade.world[this.data.parent]
  }

  // Helpers

  this.is = function(str)
  {
    var parts = str.split(" ")
    var last_word = parts[parts.length-1].toLowerCase();

    if(last_word == this.data.name){
      return true;
    }
    return false;
  }

  this.siblings = function()
  {
    var a = []
    for(id in this.parade.world){
      var vessel = this.parade.world[id];
      if(vessel.is_paradox()){
        continue;
      }
      if(vessel.parent().id == this.parent().id && vessel.id != this.id){
        a.push(vessel)
      }
    }
    return a
  }

  this.children = function()
  {
    var a = []
    for(id in this.parade.world){
      var vessel = this.parade.world[id];
      if(vessel.parent().id == this.id && vessel.id != this.id){
        a.push(vessel)
      }
    }
    return a
  }

  // Checks

  this.is_paradox = function()
  {
    return this.parent().id == this.id ? true : false
  }

  this.is_program = function()
  {
    return this.data.program ? true : false
  }

  // Formatters

  this.debug = function()
  {
    return this.data
  }

  this.to_h = function()
  {
    return {
      name: this.name,
      attr: this.attr
    }
  }

  this.particle = function()
  {
    if(this.data.attr){ return "the"; }
    var letter = this.data.name.substr(0,1).toLowerCase();
    return letter == "a" || letter == "e" || letter == "i" || letter == "o" || letter == "u" ? "an" : "a"
  }

  this.name = function()
  {
    return `${this.particle()} ${this.data.attr ? this.data.attr+' ' : ''}${this.data.name}`
  }

  this.type = function()
  {
    return this.data.program ? 'program' : 'location'
  }

  this.action = function()
  {
    return this.data.program ? `use ${this.name()}` : `enter ${this.name()}`
  }

  this.toString = function()
  {
    var article = this.data.attr ? "the" : "a"

    return `${article ? article+' ' : ''}<action class='${this.type()}' data='${this.action()}'>${this.name()}</action>`;
  }
}

module.exports = Vessel