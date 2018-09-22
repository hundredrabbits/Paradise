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
      header:_header,
      note:_note,
      view:_view,
      tips:_tips,
      reaction: _reaction,
      action: this.action(),
      cli: cli.replace(/\<br \/\>/g,"\n").replace(/(<([^>]+)>)/ig,''),
      passive: passive
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
      if(v.is_program()){ 
        this.host.cmd(this.render(v.data.program,params,v));
      }
      return v.data.reaction ? `<p>${this.render(v.data.reaction,params,v)}</p>` : `<p>You used the ${v.name()} to ${v.data.program}.</p>`
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
    let parent = this.host.parent()
    return parent.data.note ? this.render(parent.data.note) : ''
  }

  this._view = function()
  {
    let siblings = this.host.siblings()
    if(siblings.length > 4){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()}, ${siblings[2].to_a()} and <action data='inspect'>${siblings.length-3} other vessels</action>.` }
    if(siblings.length == 4){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()}, ${siblings[2].to_a()} and <action data='inspect'>1 other vessel</action>.` }
    if(siblings.length == 3){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()} and ${siblings[2].to_a()}.` }
    if(siblings.length > 1){ return `You see ${siblings[0].to_a()} and ${siblings[1].to_a()}.` }
    if(siblings.length > 0){ return `You see ${siblings[0].to_a()}.` }
    return
  }

  this._passive = function()
  {
    let html = ''

    let children = this.host.children()
    for(let id in children){
      let v = children[id];
      let p = v.passive();
      html += p ? `${this.render(p).toString(false)} | ` : ''
    }

    return html.substr(0,html.length-2).trim();
  }

  this.action = function()
  {
    let siblings = this.host.siblings()

    for(let id in siblings){
      let v = siblings[id];
      if(!v.is_program()){ continue; }
      return `Would you like to <action data='${v.trigger()} the ${v.name()}'>${v.trigger()} the ${v.name()}</action>?`;
    }
    return null
  }

  this.tips = function()
  {
    let a = []
    // Paradox
    if(this.host.is_paradox()){
      a.push("Your vessel is a paradox, you may not leave.")
    }
    // Paradox
    if(this.host.parent().is_paradox()){
      a.push(`The ${this.host.parent().name()} is a paradox, you may not leave.`)
    }
    // Empty
    if(this.host.siblings().length < 1){
      a.push(`The ${this.host.parent().name()} is empty, why don't you create something.`)
    }
    // Note/Program
    if(!this.host.parent().data.note && !this.host.parent().is_program()){
      a.push(`The ${this.host.parent().name()} has no description, you should add a note.`)
    }
    // Note/Program
    if(this.host.parent().is_program()){
      a.push(`The ${this.host.parent().name()} has the "${this.host.parent().data.program}" program.`)
    }
    // Note/Program
    if(this.host.parent().trigger()){
      a.push(`The ${this.host.parent().name()} grants the "${this.host.parent().trigger()}"" action.`)
    }

    //Find custom actions
    let siblings = this.host.siblings()
    for(let id in siblings){
      let v = siblings[id];
      if(!v.usable()){ continue; }
      a.push(`The ${v.name()} grants you the "${v.trigger()}" action.`)
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

  this.render = function(str,query = null,responder = null)
  {
    if(str.indexOf("@(") < 0){ return str; } // No Templating

    while(str.indexOf("@(") > -1){
      let segment = this.extract(str);
      try{
        str = str.replace(`@${segment}`,`${new Wildcard(segment,query,responder)}`);
      }
      catch(err){
        str = str.replace(`@${segment}`,segment);
        console.warn(err)
      }
    }
    return str
  }

  this.extract = function(str)
  {
    let from = str.indexOf("@(")
    let segment = str.substr(from,str.length-from)

    let i = 0
    let opening = 0
    let closing = 0

    while(i < segment.length){
      let ch = segment[i]
      if(ch == "("){ opening++; }
      if(ch == ")"){ closing++; }
      if(opening > 0 && closing > 0 && opening == closing){
        return str.substr(from+1,i)
      }
      i++;
    }
    return str
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
