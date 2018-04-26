function Leave(host)
{
  require(`../action`).call(this,host,"leave");

  this.docs = "Exit the parent vessel."
  
  this.operate = function(params)
  {
    this.host.move(this.host.parent().parent())
  }

  this.reaction = function()
  {
    return "You are leaving.."
  }
}

module.exports = Leave