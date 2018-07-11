Wildcard = require('./wildcard')

function Action(host,name)
{
  this.name = name;
  this.host = host;
  this.docs = `No documentation for '${name}'`

  this.run = function(params = "",action_name = null)
  {
    var reaction = this.operate(params,action_name);

    var h = {
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
    // Check if is custom action
    var siblings = this.host.siblings()
    for(id in siblings){
      var v = siblings[id];
      if(v.usage() != action){ continue; }
      if(v.is_program()){ this.host.cmd(new Wildcard(v.data.program,params).toString(false)); }
      return v.data.reaction ? `<p>${new Wildcard(v.data.reaction,params).toString(false)}</p>` : `<p>You used the ${v.name()} to ${v.data.program}.</p>`
    }

    // Otherwise..
    if(params == ""){ return ""; }
    return `<p>Unknown action, to see a list of available actions, type <action data='help'>help</action>.</p>`
  }

  this.change_vessel = function(params)
  {
    return null;
  }

  // Parsers

  this.find = function(params,a = this.host.parade.world)
  {
    var parts = this.remove_articles(params).toLowerCase().split(" ")
    var is_any = parts[0] == "any"
    var attr  = parts[parts.length-2] != parts[parts.length-1] && !is_any ? parts[parts.length-2] : null
    var name  = parts[parts.length-1]
    var is_numeric = parseInt(name) > -1

    if(is_numeric){ return this.find_id(a,id); }

    if(name == "anywhere" || name == "anything"){ return this.find_random(a); }

    return is_any ? this.find_any(a,attr,name) : this.find_target(a,attr,name);
  } 

  this.find_id = function(a,target)
  {
    for(id in a){
      if(a[id].id == target){
        return a[id]
      }
    }
    return null
  }

  this.find_any = function(a,attr,name)
  {
    var candidates = []
    for(id in a){
      var v = a[id]
      if(v.data.name != name){ continue; }
      candidates.push(v);
    }
    var id = Math.floor((Math.random() * candidates.length));
    return candidates[id]
  }

  this.find_target = function(a,attr,name)
  {
    // With attr
    for(id in a){
      var v = a[id]
      if(v.data.name != name){ continue; } 
      if(attr && v.data.attr != attr){ continue; } 
      return v
    }

    // Without attr
    for(id in a){
      var v = a[id]
      if(v.data.name != name){ continue; }
      return v
    }
  }

  this.find_random = function(a)
  {
    var id = Math.floor((Math.random() * a.length));
    return a[id]
  }

  // Formatters

  this.header = function()
  {
    if(this.host.is_paradox()){
      return `You are the <action data='help with paradoxes'>paradox</action> of ${this.host.particle()} ${this.host.name()}.`  
    }
    if(this.host.parent().is_paradox()){
      return `You are ${this.host.particle()} <action data='warp to ${this.host.id}'>${this.host.name()}</action> in ${this.host.parent().particle()} ${this.host.parent().name()}.`
    }
    return `You are ${this.host.particle()} <action data='warp to ${this.host.id}'>${this.host.name()}</action> in ${this.host.parent().particle()} <action data='leave'>${this.host.parent().name()}</action>.`
  }

  this.view = function()
  {
    var siblings = this.host.siblings()
    if(siblings.length > 4){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()}, ${siblings[2].to_a()} and <action data='inspect'>${siblings.length-3} other vessels</action>.` }
    if(siblings.length == 4){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()}, ${siblings[2].to_a()} and <action data='inspect'>1 other vessel</action>.` }
    if(siblings.length == 3){ return `You see ${siblings[0].to_a()}, ${siblings[1].to_a()} and ${siblings[2].to_a()}.` }
    if(siblings.length > 1){ return `You see ${siblings[0].to_a()} and ${siblings[1].to_a()}.` }
    if(siblings.length > 0){ return `You see ${siblings[0].to_a()}.` }
    return "You see nothing."
  }

  this.page = function()
  {
    var v = this.host.parent().stem()

    return this.host.parent().is_circular() ? `•` : `— <action data='warp to ${v.id}'>${v.name()}</action> —`
  }

  this.note = function()
  {
    return this.host.parent().data.note ? new Wildcard(this.host.parent().data.note).toString() : ''
  }

  this.action = function()
  {
    var siblings = this.host.siblings()

    for(id in siblings){
      var v = siblings[id];
      if(!v.is_program()){ continue; }
      return `Would you like to <action data='${v.usage()} the ${v.name()}'>${v.usage()} with the ${v.name()}</action>?`;
    }
    return null
  }

  this.documentation = function()
  {
    var actions = {}
    var _actions = {
      create:require('./actions/create'),
      become:require('./actions/become'),
      enter:require('./actions/enter'),
      leave:require('./actions/leave'),

      help:require('./actions/help'),
      warp:require('./actions/warp'),
      take:require('./actions/take'),
      drop:require('./actions/drop'),
      inventory:require('./actions/inventory'),

      note:require('./actions/note'),
      transform:require('./actions/transform'),
      transmute:require('./actions/transmute'),

      inspect:require('./actions/inspect'),
      program:require('./actions/program'),
      use:require('./actions/use'),
      usage:require('./actions/usage'),
      cast:require('./actions/cast'),
    }
    for(id in _actions){
      var action = new _actions[id]
      actions[id] = action.docs
    }
    return actions
  }

  this.tips = function()
  {
    var a = []
    // Paradox
    if(this.host.is_paradox()){
      a.push("Your vessel is a <action data='help with paradoxes'>paradox</action>, you cannot leave.")
    }
    // Paradox
    if(this.host.parent().is_paradox()){
      a.push(`The ${this.host.parent().name()} vessel is a <action data='help with paradoxes'>paradox</action>, you cannot leave.`)
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
    var siblings = this.host.siblings()
    for(id in siblings){
      var v = siblings[id];
      if (v.usable())
      {
        a.push(`The ${v.name()} vessel grants you the <action data='${v.usage()}'>${v.usage()}</action> action.`)
      }
    }

    return a
  }

  this.visibles = function()
  {
    var a = []
    a = a.concat(this.host.siblings())
    a = a.concat(this.host.children())
    return a
  }

  this.err_NOTARGET = function(params,type = "visible")
  {
    var target = this.remove_articles(params);
    return `<p>There is no ${type} <action>${target}</action>. Do you need <action data='help with ${this.name}'>help</action>?</p>`
  }

  this.remove_articles = function(str)
  {
    var s = ` ${str} `;
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
