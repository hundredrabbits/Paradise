function Enter(host)
{
  require(`../action`).call(this,host);

  this.operate = function(params)
  {
    var visibles = this.host.sight();
    console.log(visibles)
    console.log(params)
  }

  this.reaction = function()
  {
    return "You are entering.."
  }
}

module.exports = Enter