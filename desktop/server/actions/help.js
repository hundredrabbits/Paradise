"use strict";

function Help(host)
{
  require(`../action`).call(this,host,"help");

  this.knowledge = {
    paradoxes: "Paradoxes are vessels folded onto themselves, existing within their own space. One could argue that Paradise itself is a paradox."
  }

  this.operate = function(params)
  {
    let parts = params.split(" ")
    let action = parts[parts.length-1].toLowerCase()

    try{
      let a = require(`./${action}`);
      let obj = new a()
      return `<img src='media/graphics/${obj.name}.png'/><h3>${obj.name}</h3><p>${obj.docs}</p>`
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
    let docs = this.documentation()
    let count = Object.keys(docs).length
    let list = ""
    let index = 0
    for(let id in docs){
      list += `<action data='help with ${id}'>${id.capitalize()}</action>${index == count-2 ? ' or ' : (index == count-1 ? '. ' : ', ')} `
      index += 1
    }
    return `<img src='media/graphics/default.png'/><p>Which action would you like help with? ${list}</p>`
  }
}

module.exports = Help