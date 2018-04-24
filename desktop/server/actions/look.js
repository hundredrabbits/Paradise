function Look(parade,host)
{
  require(`../action`).call(this,parade,host);

  this.reaction = function()
  {
    return "You are looking.."
  }
}

module.exports = Look