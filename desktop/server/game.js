"use strict";

function Game()
{
  this.load = function()
  {
    try{
      return JSON.parse(localStorage.getItem("world"));
    }
    catch(err){

    }
  }

  this.save = function(paradise)
  {
    try{
      localStorage.setItem("world", JSON.stringify(paradise.to_h()));  
    }
    catch(err){

    }
  }  
}

module.exports = new Game()