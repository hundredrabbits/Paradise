function Move(host)
{
  require(`../action`).call(this,host,"move");

  this.operate = function(params)
  {
    var relation = params.split(" ")[0].toLowerCase()
    this.host.set("relationship",relation)
  }
}

module.exports = Move