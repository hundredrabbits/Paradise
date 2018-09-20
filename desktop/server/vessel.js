"use strict";

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
    let parts = str.split(" ")
    return this.act(parts.splice(0,1)[0],parts.join(' '))
  }

  this.act = function(a,p)
  {
    const responder = this.response(a)
    const action = new responder(this)    
    return action.run(p,a)
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

  this.set = function(key,value)
  {
    this.data[key] = value;
  }

  this.move = function(target)
  {
    this.set("parent",target.id)
  }

  this.parent = function()
  {
    return this.parade.world[this.data.parent]
  }

  this.owner = function()
  {
    return this.parade.world[this.data.owner]
  }

  this.is_circular = function()
  {
    // find Root
    let known = []
    let v = this.parent()
    let i = 0
    while(i < 50){
      if(v.is_paradox()){ return false; }
      if(known.indexOf(v.id) > -1){ return true; }
      known.push(v.id)
      v = v.parent()
      i += 1
    }
    return false;
  }

  this.stem = function()
  {
    // find Root
    let known = []
    let v = this.parent()
    let i = 0
    while(i < 50){
      if(v.parent().is_paradox() || known.indexOf(v.id) > -1){
        return v
        break;
      }
      i += 1
      known.push(v.id)
    }
    return this;
  }

  // Helpers

  this.is = function(str)
  {
    let parts = str.split(" ")
    let last_word = parts[parts.length-1].toLowerCase();

    if(last_word == this.data.name){
      return true;
    }
    return false;
  }

  this.siblings = function()
  {
    let a = []
    for(let id in this.parade.world){
      let vessel = this.parade.world[id];
      if(vessel.parent().id == this.parent().id && vessel.id != this.id){
        a.push(vessel)
      }
    }
    return a
  }

  this.children = function()
  {
    let a = []
    for(let id in this.parade.world){
      let vessel = this.parade.world[id];
      if(vessel.parent().id == this.id && vessel.id != this.id){
        a.push(vessel)
      }
    }
    return a
  }

  this.usables = function()
  {
    let a = []
    a = a.concat(this.siblings())
    a = a.concat(this.children())
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

  this.to_h = function()
  {
    return this.data
  }

  this.to_a = function(show_particle = true)
  {     
    return `${show_particle ? this.particle()+" " : ''}<action data='${this.action()}'>${this.name()}</action>`
  }

  this.particle = function()
  {
    if(this.data.attr){ return "the"; }
    let letter = this.data.name.substr(0,1).toLowerCase();
    return letter == "a" || letter == "e" || letter == "i" || letter == "o" || letter == "u" ? "an" : "a"
  }

  this.name = function()
  {
    return `${this.data.attr ? this.data.attr+' ' : ''}${this.data.name}`
  }

  this.type = function()
  {
    if(this.data.program){ return `program` }
    if(this.data.note){ return `location` }

    return `vessel`
  }

  this.usable = function()
  {
    return this.trigger() !== false;
  }

  this.trigger = function()
  {
    if(this.data.trigger) {
      return this.data.trigger.indexOf(" ") > -1 ? this.data.trigger.split(" ")[0] : this.data.trigger;
    }
    if(this.is_program()) {
      return 'use';
    }
    return false;
  }

  this.passive = function()
  {
    if(this.trigger() != "passive"){ return; }
    if(!this.data.reaction){ return; }

    return this.data.reaction;
  }

  this.action = function()
  {
    let action = `warp into the ${this.name()}`

    // Inventory
    if(this.data.parent == this.parade.ghost().id){
      if(this.is_program()){
        action = `${this.trigger()} ${this.name()}`
      }
      else{
        action = `drop the ${this.name()}`        
      }
    }
    else if(this.data.parent == this.parade.ghost().data.parent){ // Is Visible
      if(this.is_program()){
        action = `${this.trigger()} ${this.name()}`
      }
      else{
        action = `enter the ${this.name()}`  
      }
    }

    return action
  }

  this.toString = function()
  {
    return `${this.particle()} ${this.name()}`;
  }
}

module.exports = Vessel