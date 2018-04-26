function Note(host)
{
  require(`../action`).call(this,host,"note");

  this.docs = "Add a description to the current parent vessel."

  this.operate = function(params)
  {
    this.host.parent().set("note",params)
  }
}

module.exports = Note