function Note(host)
{
  require(`../action`).call(this,host,"note");

  this.docs = "Add a description to the current parent vessel."

  this.operate = function(params)
  {
    var is_update = !this.host.parent().data.note ? false : true;

    this.host.parent().set("note",params)

    return `You ${is_update ? 'updated the' : 'added a'} description to <action>${this.host.parent()}</action>.`
  }
}

module.exports = Note