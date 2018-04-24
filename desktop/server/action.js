function Action(parade,host)
{
  this.parade = parade;
  this.host = host;

  this.run = function()
  {
    var h = {}
    h.host = this.host;
    h.reaction = this.reaction();
    h.visibles = this.parade.find_visibles_for(this.host);
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
}

module.exports = Action