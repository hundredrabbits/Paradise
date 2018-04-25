function Look(host)
{
  require(`../action`).call(this,host,"look");

  this.reaction = function()
  {
    return "You are looking.."
  }
}

module.exports = Look