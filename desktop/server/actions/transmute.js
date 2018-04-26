function Transmute(host)
{
  require(`../action`).call(this,host,"transmute");

  this.docs = "Change your current vessel attribute."

  this.operate = function(params)
  {
    var parts = params.split(" ")
    var attr = parts[parts.length-1].toLowerCase()

    this.host.set("attr",attr)
    return `<p>You transmuted into <action>${this.host}</action>.</p>`
  }
}

module.exports = Transmute