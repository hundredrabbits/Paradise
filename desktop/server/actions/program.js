function Program(host)
{
  require(`../action`).call(this,host,"program");

  this.operate = function(params)
  {
    this.host.parent().set("program",params)
  }
}

module.exports = Program