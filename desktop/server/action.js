function Action()
{
  this.run = function()
  {
    var h = {}
    h.reaction = this.reaction();
    return h
  }
}

module.exports = Action