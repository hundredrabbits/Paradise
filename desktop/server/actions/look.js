function Look(ghost)
{
  require(`../action`).call(this,ghost);

  this.ghost = ghost;

  this.reaction = function()
  {
    return "You are looking.."
  }
}

module.exports = Look