function Action(ghost)
{
  this.ghost = ghost;

  this.run = function()
  {
    var h = {}
    h.host = this.ghost;
    h.reaction = this.reaction();
    return h
  }

  this.reaction = function()
  {
    return ""
  }
}

module.exports = Action