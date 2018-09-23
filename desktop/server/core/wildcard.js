"use strict";

const Lisp = require('./lisp')
const Clock = require('./clock')

function Wildcard(host,input,query,responder)
{
  let lib = {

    // Sights
    self: function()
    {
      return host.id;
    },
    parent: function()
    {
      return host.parent().id;
    },
    stem: function()
    {
      return host.stem().id;
    },

    // Transform
    lc: function(str)
    {
      return str ? `${str}`.toLowerCase() : ''
    },
    cc: function(str)
    {
      return str ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : ''
    },
    uc: function(str)
    {
      return str ? `${str}`.toUpperCase() : ''
    },

    // Programming
    query: function()
    {
      return query;
    },
    responder: function()
    {
      return responder.id;
    },

    // Logic
    equal: function(a,b)
    {
      return (typeof a === "function" ? a() : a) == (typeof b === "function" ? b() : b)
    },
    if: function(i,t,e)
    {
      return typeof id === "function" ? i() : i ? t : e;
    },

    // Main
    vessel: function(id,field){
      if(typeof id === "function"){ id = id(); }
      if(typeof id != 'number'){ return '(error:misformated function)'; }
      let target = host.paradise.world[id]
      if(!target){ return `(error:unknown vessel-${id})`; }
      return field && target.data[field] ? target.data[field] : target
    },
    carry: function(id,target){
      if(typeof id === "function"){ id = id(); }
      let children = host.children()
      for(let i in children){
        if(children[i].is(target)){ return true; }
      }
      return false;
    },
    random: function(...items){
      return items[Math.floor((Math.random() * items.length))]
    }
  }
  Lisp.call(this,input,lib)
}

module.exports = Wildcard
