function Note(host)
{
  require(`../action`).call(this,host,"note");

  this.docs = "Add a description to the current parent vessel."

  this.operate = function(params)
  {
    var is_update = !this.host.parent().data.note ? false : true;

    this.host.parent().set("note",params)

    var verb = 'added a'
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