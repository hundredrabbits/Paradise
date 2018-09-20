"use strict";

function Look(host)
{
  require(`../action`).call(this,host,"look");

  this.operate = function()
  {
    return;
  }
}

module.exports = Look