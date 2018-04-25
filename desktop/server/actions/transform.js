function Transform(host)
{
  require(`../action`).call(this,host,"transform");

  this.operate = function(params)
  {
    var parts = params.split(" ")
    var name = parts[parts.length-1].toLowerCase()

    this.host.set("name",name)
  }
}

module.exports = Transform