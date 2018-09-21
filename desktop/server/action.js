"use strict";

const Wildcard = require('./wildcard')

function Action(host,name)
{
  this.name = name;
  this.host = host;
  this.docs = `No documentation for '${name}'`

  this.run = function(action = this.name,params = null)
  {
    let _reaction = this.operate(action,params);
    let _header = this._header();
    let _note = this._note();
    let _view = this._view();
    let _tips = this.tips();

    let cli = _reaction ? _reaction : `${_header ? _header+'\n\n' : ''}${_note ? _note+'\n\n' : ''}${_view ? '> '+_view : ''}`;
    let passive = this._passive();

    let h = {
      sight: {
        h1:_header,
        note:_note,
        view:_view,
        tips:_tips,
        reaction: _reaction,
        action: this.action(),
        cli: cli.replace(/(<([^>]+)>)/ig,''),
        passive: passive
      },
      visibles: this.visibles()
    }
    return h
  }
  
  this.operate = function(action,params)
  {  
    // Check if is custom action
    let siblings = this.host.siblings()
    for(let id in siblings){
      let v = siblings[id];
      if(v.trigger() != action){ continue; }
      if(v.is_program()){ this.host.cmd(new Wildcard(this.host,v.data.program,params).toString(false)); }
      return v.data.reaction ? `<p>${new Wildcard(this.host,v.data.reaction,params).toString(false)}</p>` : `<p>You used the ${v.name()} to ${v.data.program}.</p>`
    }
    return this.err_UNKNOWN();
  }

  this.change_vessel = function(params)
  {
    return null;
  }

  // Parsers

  this.find = function(params,a = this.host.paradise.world)
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

  this._header = function()
  {
    if(this.host.is_paradox()){
      return `You are the <action data='learn about paradoxes'>paradox</action> of ${this.host.particle()} ${this.host.name()}.`  
    }
    if(this.host.parent().is_paradox()){
      return `You are ${this.host.particle()} <action data='warp to ${this.host.id}'>${this.host.name()}</action> in ${this.host.parent().particle()} ${this.host.parent().name()}.`
    }
    return `You are ${this.host.particle()} <action data='warp to ${this.host.id}'>${this.host.name()}</action> in ${this.host.parent().particle()} <action data='leave'>${this.host.parent().name()}</action>.`
  }

  this._note = function()
  {
    return this.host.parent().data.note ? new Wildcard(this.host,this.host.parent().data.note).toString() : ''
  }

  this._view = function()
  {
    let siblings = this.host.siblings()
    if(siblings.length > 4){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()}, ${siblings[2].to_a()} and <action data='inspect'>${siblings.length-3} other vessels</action>.` }
    if(siblings.length == 4){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()}, ${siblings[2].to_a()} and <action data='inspect'>1 other vessel</action>.` }
    if(siblings.length == 3){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()} and ${siblings[2].to_a()}.` }
    if(siblings.length > 1){ return `You see ${siblings[0].to_a()} and ${siblings[1].to_a()}.` }
    if(siblings.length > 0){ return `You see ${siblings[0].to_a()}.` }
    return "You see nothing."
  }

  this._passive = function()
  {
    let html = ''

    let children = this.host.children()
    for(let id in children){
      let v = children[id];
      let p = v.passive();
      html += p ? `${new Wildcard(this.host,p).toString(false)} | ` : ''
    }

    return html.substr(0,html.length-2).trim();
  }

  this.action = function()
  {
    let siblings = this.host.siblings()

    for(let id in siblings){
      let v = siblings[id];
      if(!v.is_program()){ continue; }
      return `Would you like to <action data='${v.trigger()} the ${v.name()}'>${v.trigger()} with the ${v.name()}</action>?`;
    }
    return null
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
    if(this.host.parent().trigger()){
      a.push(`This vessel grants the <action>${this.host.parent().trigger()}</action> action.`)
    }

    //Find custom actions
    let siblings = this.host.siblings()
    for(let id in siblings){
      let v = siblings[id];
      if (v.usable())
      {
        a.push(`The ${v.name()} vessel grants you the <action data='${v.trigger()}'>${v.trigger()}</action> action.`)
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

  // Errors
  
  this.err_NOTARGET = function(params,type = "visible")
  {
    let target = this.remove_articles(params);
    return `<p>There is no ${type} vessel "${target}". ${this.err_LEARN()}</p>`
  }

  this.err_NOPARAM = function()
  {
    return `<p>The ${this.name} action requires more information. ${this.err_LEARN()}</p>`
  }

  this.err_NOVALID = function()
  {
    return `<p>Invalid use of the "${this.name}" action. ${this.err_LEARN()}</p>`
  }

  this.err_UNKNOWN = function()
  {
    return `<p>Unknown action, to see a list of available actions, type "<action data='learn'>learn</action>".</p>`
  }

  this.err_LEARN = function()
  {
    return `For more details on how to ${this.name}, type "<action data='learn to ${this.name}'>learn to ${this.name}</action>".`
  }

  // Helpers

  String.prototype.to_base = function(){ return this.toLowerCase().replace(/ /g,"_").replace(/[^0-9a-z\+]/gi,"").trim(); }
  String.prototype.capitalize = function(){ return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase(); }
}

module.exports = Action
