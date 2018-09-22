"use strict";

const Lisp = require('./lisp')
const Clock = require('./clock')

function Wildcard(input,query,responder)
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
