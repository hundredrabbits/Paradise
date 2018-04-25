function Action(host)
{
  this.host = host;

  this.run = function(params)
  {
    this.operate(params);

    var h = {}
    h.host = this.host;
    h.reaction = this.reaction();
    h.visibles = this.host.sight();
    return h
  }

  this.reaction = function()
  {
    return ""
  }

  this.visibles = function()
  {
    return []
  }

  this.operate = function()
  {
    console.log("Nothing to do..")
  }
}

module.exports = Action