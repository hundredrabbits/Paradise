"use strict";

function Note(host)
{
  require(`../action`).call(this,host,"note");

  this.docs = "Add a description to the current parent vessel."

  this.operate = function(action,params)
  {
    if(!this.host.parent().data.note && params.trim() == ""){ return `<p>Huh?! For more details on note, type <action data='learn to note'>learn</action>.</p>`; }

    let is_update = !this.host.parent().data.note ? false : true;

    this.host.parent().set("note",params)

    let verb = 'added a'
    
    if(params == ""){
      verb = 'removed the'
    }
    else if(is_update){
      verb = 'updated the'
    }

    return `<p>You ${verb} description to <action>${this.host.parent()}</action>.</p>`
  }
}

module.exports = Note