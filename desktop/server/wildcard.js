function Wildcard(str,query)
{
  this.str = str;
  this.query = query;

  this.toString = function(convert_vessels = true)
  {
    var s = this.str;

    // Basics
    s = s.replace('@FULL',`${parade.ghost().name().toUpperCase()}`)
    s = s.replace('@NAME',`${parade.ghost().data.name.toUpperCase()}`)
    s = s.replace('@ATTR',`${parade.ghost().data.attr ? parade.ghost().data.attr.toUpperCase() : ''}`)
    s = s.replace('@full',`${parade.ghost().name().toLowerCase()}`)
    s = s.replace('@name',`${parade.ghost().data.name.toLowerCase()}`)
    s = s.replace('@attr',`${parade.ghost().data.attr ? parade.ghost().data.attr.toLowerCase() : ''}`)
    s = s.replace('@Full',`${parade.ghost().name().toLowerCase().capitalize()}`)
    s = s.replace('@Name',`${parade.ghost().data.name.toLowerCase().capitalize()}`)
    s = s.replace('@Attr',`${parade.ghost().data.attr ? parade.ghost().data.attr.toLowerCase() : ''.capitalize()}`)
    s = s.replace('@size',`${parade.ghost().children().length}`)
    s = s.replace('@note',`${parade.ghost().data.note}`)
    // Parent
    s = s.replace('@_FULL',`${parade.ghost().parent().name().toUpperCase()}`)
    s = s.replace('@_NAME',`${parade.ghost().parent().data.name.toUpperCase()}`)
    s = s.replace('@_ATTR',`${parade.ghost().parent().data.attr ? parade.ghost().parent().data.attr.toUpperCase() : ''}`)
    s = s.replace('@_full',`${parade.ghost().parent().name().toLowerCase()}`)
    s = s.replace('@_name',`${parade.ghost().parent().data.name.toLowerCase()}`)
    s = s.replace('@_attr',`${parade.ghost().parent().data.attr ? parade.ghost().parent().data.attr.toLowerCase() : ''}`)
    s = s.replace('@_Full',`${parade.ghost().parent().name().toLowerCase().capitalize()}`)
    s = s.replace('@_Name',`${parade.ghost().parent().data.name.toLowerCase().capitalize()}`)
    s = s.replace('@_Attr',`${parade.ghost().parent().data.attr ? parade.ghost().parent().data.attr.toLowerCase() : ''.capitalize()}`)
    s = s.replace('@_size',`${parade.ghost().siblings().length}`)
    s = s.replace('@_note',`${parade.ghost().parent().data.note}`)
    // Stem
    s = s.replace('@STEM',`${parade.ghost().parent().stem().name().toUpperCase()}`)
    s = s.replace('@stem',`${parade.ghost().parent().stem().name().toLowerCase()}`)
    s = s.replace('@Stem',`${parade.ghost().parent().stem().name().capitalize()}`)
    // Paradise
    s = s.replace('@__size',`${parade.world.length}`)
    s = s.replace('@__RANDOM',`${parade.random().name().toUpperCase()}`)
    s = s.replace('@__random',`${parade.random().name().toLowerCase()}`)
    s = s.replace('@__Random',`${parade.random().name().capitalize()}`)
    // Custom
    s = s.replace(/@query/g,this.query ? this.query : '')

    s = this.parse_complex(s);

    if(convert_vessels){
      var known = []
      var children = parade.ghost().siblings();
      for(id in children){
        var v = children[id];
        if(known.indexOf(v.data.name) > -1){ continue; }
        s = s.replace(v.name(),v.to_a(false))
        known.push(v.data.name)
      }
    }
  
    return s;
  }

  this.parse_complex = function(s)
  {
    if(s.indexOf("@") < 0){ return s; }
    if(s.indexOf("(") < 0){ return s; }
    if(s.indexOf(")") < 0){ return s; }

    var words = s.split(" ")
    for(id in words){
      var word = words[id]
      if(word.substr(0,1) != "@" || word.indexOf("(") < 0){ continue; }
      var command = word.split("(")[0].replace("@","").trim()
      var params = s.split(command+"(")[1].split(")")[0]
      s = s.replace("@"+command+"("+params+")",this.operate(command.toLowerCase(),params))
    }
    return s
  }

  this.operate = function(cmd,params)
  {
    if(cmd == ''){
      return this.vessel(params)
    }
    return this[cmd] ? this[cmd](params.trim()) : `@error(Unknown Method ${cmd})`
  }

  this.if = function(params)
  {
    var a = params.split("IS")[0].trim(); if(!a){ return ""; }
    var b = params.split("IS")[1].trim().split("THEN")[0].trim()
    var c = params.indexOf("ELSE") > -1 ? params.split("THEN")[1].trim().split("ELSE")[0].trim() : params.split("THEN")[1].trim()
    var d = params.indexOf("ELSE") > -1 ? params.split("ELSE")[1].trim() : ''
    return a == b ? c : d
  }

  this.vessel = function(params)
  {
    if(parseInt(params) > 0){
      return parade.world[parseInt(params)] ? parade.world[parseInt(params)].to_a(false) : `@error(Unknown Vessel #${params})`;  
    }
    return "?"
  }

  this.random = function(params)
  {
    var parts = params.split(" ")
    return parts[Math.floor((Math.random() * parts.length))]
  }
}

module.exports = Wildcard
