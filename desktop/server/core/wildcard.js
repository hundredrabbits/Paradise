"use strict";

const Lisp = require('./lisp')
const Clock = require('./clock')

function Wildcard(host,input,query,responder)
{
  let lib = {
    first: function(x) {
      return x[0];
    },
    add: function(...items){
      return items.reduce((acc,value) => { return acc + value; },0);
    },
    random: function(...items){
      return items[Math.floor((Math.random() * items.length))]
    },
    vessel: function(...items){
      if(!items[0]){ return 'error(misformated)'; }
      let id = parseInt(items[0])
      let target = host.paradise.world[id]
      if(!target){ return 'error(unknown vessel)'; }
      let field = items[1]
      if(!target.data[field]){ return 'error(unknown '+field+' field)'; }
      return target.data[field]
    },
    rest: function(x) {
      return x.slice(1);
    },
    print: function(x) {
      console.log(x);
      return x;
    }
  }
  Lisp.call(this,input,lib)
}

module.exports = Wildcard
