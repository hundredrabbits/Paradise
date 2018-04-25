function Note(host)
{
  require(`../action`).call(this,host,"note");

  this.operate = function(params)
  {
    this.host.parent().set("note",params)
  }
}

module.exports = Note