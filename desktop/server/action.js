function Action(host,name)
{
  this.name = name;
  this.host = host;
  this.docs = `No documentation for '${name}'`

  this.run = function(params = "")
  {
    var reaction = this.operate(params);

    var h = {
      sight: {
        h1:this.header(),
        page:this.page(),
        note:this.note(),
        view:this.view(),
        tips:this.tips(),
        reaction: reaction
      },
      docs: this.documentation(),
      visibles: this.visibles()
    }
    return h
  }
  
  this.operate = function()
  {
    return ""
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

  // Formatters

  this.header = function()
  {
    if(this.host.is_paradox()){
      return `You are the paradox of ${this.host.particle()} ${this.host.name()}.`  
    }
    return `You are ${this.host.particle()} <action data='warp to ${this.host.id}'>${this.host.name()}</action> in ${this.host.parent().particle()} <action data='leave'>${this.host.parent().name()}</action>.`
  }

  this.view = function()
  {
    var siblings = this.host.siblings()

    if(siblings.length > 2){
      return `You see ${siblings[0]}, ${siblings[1]} and ${siblings[2]}.`
    }
    if(siblings.length > 1){
      return `You see ${siblings[0]} and ${siblings[1]}.`
    }
    if(siblings.length > 0){
      return `You see ${siblings[0]}.`
    }
    return "You see nothing."
  }

  this.page = function()
  {
    // find Root
    var v = this.host.parent()
    var i = 0
    while(i < 50){
      if(v.parent().is_paradox()){
        v = v.parent()
        break;
      }
      i += 1
    }
    return `— <action data='warp to ${v.id}'>${v.name()}</action> —`
  }

  this.note = function()
  {
    return this.host.parent().data.note ? this.host.parent().data.note : ''
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

      move:require('./actions/move'),
      note:require('./actions/note'),
      transform:require('./actions/transform'),
      transmute:require('./actions/transmute'),

      inspect:require('./actions/inspect'),
      program:require('./actions/program'),
      use:require('./actions/use'),
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
      a.push("Your vessel is a paradox, you cannot leave.")
    }
    // Paradox
    if(this.host.parent().is_paradox()){
      a.push(`The ${this.host.parent().name()} vessel is a paradox, you cannot leave.`)
    }
    // Empty
    if(this.host.siblings().length < 1){
      a.push("This vessel is empty, why don't you <action data='create '>create</action> something.")
    }
    // Note/Program
    if(!this.host.parent().data.note && !this.host.parent().is_program()){
      a.push("This vessel has no description, you should <action data='note '>add one</action>.")
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

  function remove_articles(str)
  {
    var s = ` ${str} `;
    s = s.replace(/ a /g,'')
    s = s.replace(/ an /g,'')
    s = s.replace(/ the /g,'')
    s = s.replace(/ to /g,'')
    s = s.replace(/ in /g,'')
    s = s.replace(/ some /g,'')
    s = s.replace(/ one /g,'')
    s = s.replace(/ two /g,'')
    return s
  }

  String.prototype.to_base = function()
  {
    return this.toLowerCase().replace(/ /g,"_").replace(/[^0-9a-z\+]/gi,"").trim();
  }
}

module.exports = Action