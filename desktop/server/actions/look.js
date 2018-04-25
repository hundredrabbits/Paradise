function Look(host)
{
  require(`../action`).call(this,host);

  this.reaction = function()
  {
    return "You are looking.."
  }
}

module.exports = Look