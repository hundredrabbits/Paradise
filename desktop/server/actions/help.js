function Help(host)
{
  require(`../action`).call(this,host,"help");

  this.knowledge = {
    paradoxes: "Paradoxes are vessels folded onto themselves, existing within their own space. One could argue that Paradise itself is a paradox."
  }

  this.operate = function(params)
  {
    var parts = params.split(" ")
    var action = parts[parts.length-1].toLowerCase()

    try{
      var a = require(`./${action}`);
      var obj = new a()
      return `<img src='media/graphics/inspect.png'/><h3>${obj.name}</h3><p>${obj.docs}</p>`
    }
    catch(err){
      return this.default(action)
    }
  }

  this.default = function(key)
  {
    if(key){
      if(this.knowledge[key]){
        return `<p>${this.knowledge[key]}</p>`;
      }
      else{
        return `Unknown term '${key}'.`  
      }
    }
    else{
      return this.general();
    }
  }

  this.general = function()
  {
    var docs = this.documentation()
    var count = Object.keys(docs).length
    var list = ""
    var index = 0
    for(id in docs){
      list += `<action data='help with ${id}'>${id.capitalize()}</action>${index == count-2 ? ' or ' : (index == count-1 ? '. ' : ', ')} `
      index += 1
    }
    return `<p>Which action would you like help with? ${list}</p>`
  }
}

module.exports = Help