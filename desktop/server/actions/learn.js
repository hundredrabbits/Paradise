"use strict";

function Learn(host)
{
  require(`../action`).call(this,host,"learn");

  this.knowledge = {
    paradoxes: "<b>Paradoxes</b> are vessels folded onto themselves, existing within their own space. One could argue that Paradise itself is a paradox.",
    passive: "The <b>Passive</b> <action data='learn to trigger'>trigger</action>, is used to add dynamic content to the browser."
  }

  this.operate = function(action,params)
  {
    let parts = params.split(" ")
    let target = parts[parts.length-1].toLowerCase()

    try{
      let a = require(`./${target}`);
      let obj = new a()
      return `<img src='media/graphics/${obj.name}.png'/><p>${obj.docs}</p>`
    }
    catch(err){
      return this.default(target)
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
    let index = 2
    for(let id in docs){
      if(id == "learn"){ continue; }
      list += `<action data='learn to ${id}'>${id.capitalize()}</action>${index == count-1 ? ' or ' : (index == count ? '. ' : ', ')} `
      index += 1
    }
    return `<img src='media/graphics/default.png'/><p>Which action would you like to <aciton data='learn'>learn</action>? ${list}</p>`
  }

  this.documentation = function()
  {
    let actions = {}
    let _actions = {
      create:require('./create'),
      become:require('./become'),
      enter:require('./enter'),
      leave:require('./leave'),

      warp:require('./warp'),
      take:require('./take'),
      drop:require('./drop'),
      move:require('./move'),

      learn:require('./learn'),
      note:require('./note'),
      transform:require('./transform'),
      inspect:require('./inspect'),

      trigger:require('./trigger'),
      program:require('./program'),
      use:require('./use'),
      cast:require('./cast'),
    }
    for(let id in _actions){
      let action = new _actions[id]
      actions[id] = action.docs
    }
    return actions
  }
}

module.exports = Learn