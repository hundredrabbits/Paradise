"use strict";

function Program(host)
{
  require(`../action`).call(this,host,"program");

  this.docs = "Add an automation program to a vessel, making it available to the use command. A program cannot exceed 60 characters in length.";

  this.operate = function(action,params)
  {
    if(!this.host.parent().data.program && params.trim() == ""){ return `<p>Huh?! For more details on programming, type <action data='learn to program'>learn</action>.</p>`; }

    let is_update = !this.host.parent().data.program ? false : true;

    this.host.parent().set("program",params)
    return `<p>You ${is_update ? 'updated the' : 'added a'} program to <action>${this.host.parent()}</action>.</p>`
  }
}

module.exports = Program