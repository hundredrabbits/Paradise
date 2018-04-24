function Look()
{
  require(`../action`).call(this);

  this.reaction = function()
  {
    return "You are looking.."
  }
}

module.exports = Look