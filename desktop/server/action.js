"use strict";

const Wildcard = require('./wildcard')

function Action(host,name)
{
  this.name = name;
  this.host = host;
  this.docs = `No documentation for '${name}'`

  this.run = function(params = "",action_name = null)
  {
    let reaction = this.operate(params,action_name);

    let h = {
      sight: {
        h1:this.header(),
        page:this.page(),
        note:this.note(),
        view:this.view(),
        tips:this.tips(),
        reaction: reaction,
        action: this.action(),
        inventory: this.host.children()
      },
      docs: this.documentation(),
      visibles: this.visibles()
    }
    return h
  }
  
  this.operate = function(params,action)
  {
    if(!action){ return ""; }
  
    // Check if is custom action
    let siblings = this.host.siblings()
    for(let id in siblings){
      let v = siblings[id];
      if(v.usage() != action){ continue; }
      if(v.is_program()){ this.host.cmd(new Wildcard(v.data.program,params).toString(false)); }
      return v.data.reaction ? `<p>${new Wildcard(v.data.reaction,params).toString(false)}</p>` : `<p>You used the ${v.name()} to ${v.data.program}.</p>`
    }

    // Otherwise..
    if(params == ""){ return ""; }
    return `<p>Unknown action, to see a list of available actions, type <action data='learn'>learn</action>.</p>`
  }

  this.change_vessel = function(params)
  {
    return null;
  }

  // Parsers

  this.find = function(params,a = this.host.parade.world)
  {
    let parts = this.remove_articles(params).toLowerCase().split(" ")
    let is_any = parts[0] == "any"
    let attr  = parts[parts.length-2] != parts[parts.length-1] && !is_any ? parts[parts.length-2] : null
    let name  = parts[parts.length-1]
    let is_numeric = parseInt(name) > -1

    if(is_numeric){ return this.find_id(a,parseInt(name)); }

    if(name == "anywhere" || name == "anything"){ return this.find_random(a); }
    if(name == "myself" || name == "self"){ return this.host; }

    return is_any ? this.find_any(a,attr,name) : this.find_target(a,attr,name);
  } 

  this.find_id = function(a,target)
  {
    for(let id in a){
      if(a[id].id == target){
        return a[id]
      }
    }
    return null
  }

  this.find_any = function(a,attr,name)
  {
    let candidates = []
    for(let id in a){
      let v = a[id]
      if(v.data.name != name){ continue; }
      candidates.push(v);
    }
    let id = Math.floor((Math.random() * candidates.length));
    return candidates[id]
  }

  this.find_target = function(a,attr,name)
  {
    // With attr
    for(let id in a){
      let v = a[id]
      if(v.data.name != name){ continue; } 
      if(attr && v.data.attr != attr){ continue; } 
      return v
    }

    // Without attr
    for(let id in a){
      let v = a[id]
      if(v.data.name != name){ continue; }
      return v
    }
  }

  this.find_random = function(a)
  {
    let id = Math.floor((Math.random() * a.length));
    return a[id]
  }

  // Formatters

  this.header = function()
  {
    if(this.host.is_paradox()){
      return `You are the <action data='learn about paradoxes'>paradox</action> of ${this.host.particle()} ${this.host.name()}.`  
    }
    if(this.host.parent().is_paradox()){
      return `You are ${this.host.particle()} <action data='warp to ${this.host.id}'>${this.host.name()}</action> in ${this.host.parent().particle()} ${this.host.parent().name()}.`
    }
    return `You are ${this.host.particle()} <action data='warp to ${this.host.id}'>${this.host.name()}</action> in ${this.host.parent().particle()} <action data='leave'>${this.host.parent().name()}</action>.`
  }

  this.view = function()
  {
    let siblings = this.host.siblings()
    if(siblings.length > 4){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()}, ${siblings[2].to_a()} and <action data='inspect'>${siblings.length-3} other vessels</action>.` }
    if(siblings.length == 4){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()}, ${siblings[2].to_a()} and <action data='inspect'>1 other vessel</action>.` }
    if(siblings.length == 3){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()} and ${siblings[2].to_a()}.` }
    if(siblings.length > 1){ return `You see ${siblings[0].to_a()} and ${siblings[1].to_a()}.` }
    if(siblings.length > 0){ return `You see ${siblings[0].to_a()}.` }
    return "You see nothing."
  }

  this.page = function()
  {
    let v = this.host.parent().stem()

    return this.host.parent().is_circular() ? `•` : `— <action data='warp to ${v.id}'>${v.name()}</action> —`
  }

  this.note = function()
  {
    return this.host.parent().data.note ? new Wildcard(this.host.parent().data.note).toString() : ''
  }

  this.action = function()
  {
    let siblings = this.host.siblings()

    for(let id in siblings){
      let v = siblings[id];
      if(!v.is_program()){ continue; }
      return `Would you like to <action data='${v.usage()} the ${v.name()}'>${v.usage()} with the ${v.name()}</action>?`;
    }
    return null
  }

  this.documentation = function()
  {
    let actions = {}
    let _actions = {
      learn:require('./actions/learn'),

      inventory:require('./actions/inventory'),

      create:require('./actions/create'),
      become:require('./actions/become'),
      enter:require('./actions/enter'),
      leave:require('./actions/leave'),

      warp:require('./actions/warp'),
      take:require('./actions/take'),
      drop:require('./actions/drop'),
      move:require('./actions/move'),

      note:require('./actions/note'),
      transform:require('./actions/transform'),
      transmute:require('./actions/transmute'),

      usage:require('./actions/usage'),
      inspect:require('./actions/inspect'),

      program:require('./actions/program'),
      use:require('./actions/use'),
      cast:require('./actions/cast'),
    }
    for(let id in _actions){
      let action = new _actions[id]
      actions[id] = action.docs
    }
    return actions
  }

  this.tips = function()
  {
    let a = []
    // Paradox
    if(this.host.is_paradox()){
      a.push("Your vessel is a <action data='learn about paradoxes'>paradox</action>, you cannot leave.")
    }
    // Paradox
    if(this.host.parent().is_paradox()){
      a.push(`The ${this.host.parent().name()} vessel is a <action data='learn about paradoxes'>paradox</action>, you cannot leave.`)
    }
    // Empty
    if(this.host.siblings().length < 1){
      a.push("This vessel is empty, why don't you <action data='create '>create</action> something.")
    }
    // Note/Program
    if(!this.host.parent().data.note && !this.host.parent().is_program()){
      a.push("This vessel has no description, you should <action data='note '>add one</action>.")
    }
    // Note/Program
    if(this.host.parent().is_program()){
      a.push(`This vessel has the <code>${this.host.parent().data.program}</code> program.`)
    }
    // Note/Program
    if(this.host.parent().usage()){
      a.push(`This vessel grants the <action>${this.host.parent().usage()}</action> action.`)
    }

    //Find custom actions
    let siblings = this.host.siblings()
    for(let id in siblings){
      let v = siblings[id];
      if (v.usable())
      {
        a.push(`The ${v.name()} vessel grants you the <action data='${v.usage()}'>${v.usage()}</action> action.`)
      }
    }

    return a
  }

  this.visibles = function()
  {
    let a = []
    a = a.concat(this.host.siblings())
    a = a.concat(this.host.children())
    return a
  }

  this.err_NOTARGET = function(params,type = "visible")
  {
    let target = this.remove_articles(params);
    return `<p>There is no ${type} <action>${target}</action>. <action data='learn to ${this.name}'>Learn to ${this.name}</action>?</p>`
  }

  this.remove_articles = function(str)
  {
    let s = ` ${str} `;
    s = s.replace(/ a /g,' ')
    s = s.replace(/ an /g,' ')
    s = s.replace(/ the /g,' ')
    s = s.replace(/ of /g,' ')
    s = s.replace(/ some /g,' ')
    s = s.replace(/ one /g,' ')
    s = s.replace(/ two /g,' ')
    return s.trim()
  }

  String.prototype.to_base = function()
  {
    return this.toLowerCase().replace(/ /g,"_").replace(/[^0-9a-z\+]/gi,"").trim();
  }

  String.prototype.capitalize = function()
  {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  }
}

module.exports = Action
