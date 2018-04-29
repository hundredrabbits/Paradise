function Transform(host)
{
  require(`../action`).call(this,host,"transform");

  this.docs = "Change your current vessel name."

  this.operate = function(params)
  {
    var parts = this.remove_articles(params).split(" ")
    var name = parts[parts.length-1].toLowerCase()
    var target = parts.length > 2 ? this.find(parts[0]) : this.host
    var origin = target.data.name

    target.set("name",name)
    return `<p>You transformed the ${target.id != this.host.id ? origin : ''} into a <action>${name}</action>.</p>`
  }
}

module.exports = Transform