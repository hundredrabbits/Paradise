"use strict";

const Clock = require('./clock')

function Wildcard(host,str,query,responder)
{
  this.host = host;
  this.str = str;
  this.query = query;
  this.responder = responder;

  const paradise = this.host.paradise;

  this.toString = function(convert_vessels = true)
  {
    return this.str;
    
    const s = this.str;

    s = s.replace(/\-\-/g,`<br />`)
    s = s.replace(/ \&\& /g,` & `)

    // Basics
    s = s.replace('@FULL',`${paradise.ghost().name().toUpperCase()}`)
    s = s.replace('@NAME',`${paradise.ghost().data.name.toUpperCase()}`)
    s = s.replace('@ATTR',`${paradise.ghost().data.attr ? paradise.ghost().data.attr.toUpperCase() : ''}`)
    s = s.replace('@full',`${paradise.ghost().name().toLowerCase()}`)
    s = s.replace('@name',`${paradise.ghost().data.name.toLowerCase()}`)
    s = s.replace('@attr',`${paradise.ghost().data.attr ? paradise.ghost().data.attr.toLowerCase() : ''}`)
    s = s.replace('@Full',`${paradise.ghost().name().toLowerCase().capitalize()}`)
    s = s.replace('@Name',`${paradise.ghost().data.name.toLowerCase().capitalize()}`)
    s = s.replace('@Attr',`${paradise.ghost().data.attr ? paradise.ghost().data.attr.toLowerCase() : ''.capitalize()}`)
    s = s.replace('@size',`${paradise.ghost().children().length}`)

    // Parent
    s = s.replace('@_FULL',`${paradise.ghost().parent().name().toUpperCase()}`)
    s = s.replace('@_NAME',`${paradise.ghost().parent().data.name.toUpperCase()}`)
    s = s.replace('@_ATTR',`${paradise.ghost().parent().data.attr ? paradise.ghost().parent().data.attr.toUpperCase() : ''}`)
    s = s.replace('@_full',`${paradise.ghost().parent().name().toLowerCase()}`)
    s = s.replace('@_name',`${paradise.ghost().parent().data.name.toLowerCase()}`)
    s = s.replace('@_attr',`${paradise.ghost().parent().data.attr ? paradise.ghost().parent().data.attr.toLowerCase() : ''}`)
    s = s.replace('@_Full',`${paradise.ghost().parent().name().toLowerCase().capitalize()}`)
    s = s.replace('@_Name',`${paradise.ghost().parent().data.name.toLowerCase().capitalize()}`)
    s = s.replace('@_Attr',`${paradise.ghost().parent().data.attr ? paradise.ghost().parent().data.attr.toLowerCase() : ''.capitalize()}`)
    s = s.replace('@_size',`${paradise.ghost().siblings().length}`)
    // Stem
    s = s.replace('@STEM',`${paradise.ghost().parent().stem().name().toUpperCase()}`)
    s = s.replace('@stem',`${paradise.ghost().parent().stem().name().toLowerCase()}`)
    s = s.replace('@Stem',`${paradise.ghost().parent().stem().name().capitalize()}`)
    // Time
    s = s.replace('@time',`${new Clock()}`)  
    s = s.replace('@time-beat',`${new Clock().beat()}`)  
    s = s.replace('@time-pulse',`${new Clock().pulse()}`)    
    // Paradise
    s = s.replace('@__size',`${paradise.world.length}`)
    s = s.replace('@__RANDOM',`${paradise.random().name().toUpperCase()}`)
    s = s.replace('@__random',`${paradise.random().name().toLowerCase()}`)
    s = s.replace('@__Random',`${paradise.random().name().capitalize()}`)
    // Custom
    s = s.replace(/@query/g,this.query ? this.query : '')
    s = s.replace(/@responder/g,this.responder ? this.responder.id : '')
    s = s.replace(/@parent/g,this.host.parent() ? this.host.parent().id : '')

    s = this.parse_complex(s);

    if(convert_vessels){
      const known = []
      const children = paradise.ghost().siblings();
      for(const id in children){
        const v = children[id];
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

    const words = s.split(" ")
    for(const id in words){
      const word = words[id]
      if(word.substr(0,1) != "@" || word.indexOf("(") < 0){ continue; }
      const command = word.split("(")[0].replace("@","").trim()
      const params = s.split(command+"(")[1].split(")")[0]
      s = s.replace("@"+command+"("+params+")",this.operate(command.toLowerCase(),params))
    }
    return s
  }

  this.operate = function(cmd,params)
  {
    return this[cmd] ? this[cmd](params.trim()) : `@error(Unknown Method ${cmd})`
  }

  this.if = function(params)
  {
    const a = params.split("IS")[0].trim(); if(!a){ return ""; }
    const b = params.split("IS")[1].trim().split("THEN")[0].trim()
    const c = params.indexOf("ELSE") > -1 ? params.split("THEN")[1].trim().split("ELSE")[0].trim() : params.split("THEN")[1].trim()
    const d = params.indexOf("ELSE") > -1 ? params.split("ELSE")[1].trim() : ''
    return a == b ? c : d
  }

  this.vessel = function(params)
  {
    const parts = params.split(" ")
    const id = parts.length > 0 ? parseInt(parts[0]) : null
    const field = parts.length > 1 ? parts[1] : null;

    if(!id){ return `@error(Unknown Vessel #${id})`; }

    const target = paradise.world[id];

    if(field && paradise.world[id].data[field]){
      return paradise.world[id].data[field];
    }
    if(parseInt(params) > 0){
      return paradise.world[parseInt(params)] ? paradise.world[parseInt(params)].to_a(false) : `@error(Unknown Vessel #${params})`;  
    }
    return "?"
  }

  this.random = function(params)
  {
    const parts = params.split(" ")
    return parts[Math.floor((Math.random() * parts.length))]
  }
}

module.exports = Wildcard
