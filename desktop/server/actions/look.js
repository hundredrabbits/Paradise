"use strict";

const Action = require(`../core/action`)

function Look(host)
{
  Action.call(this,host,"look");

  this.operate = function()
  {
    return;
  }
}

module.exports = Look