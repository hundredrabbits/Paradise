function Transform(host)
{
  require(`../action`).call(this,host,"transform");

  this.docs = "Change your current vessel name."

  this.operate = function(params)
  {
    var parts = params.split(" ")
    var name = parts[parts.length-1].toLowerCase()

    this.host.set("name",name)
    return `You transformed into <action>${this.host}</action>.`
  }
}

module.exports = Transform