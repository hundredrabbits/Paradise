function Leave(host)
{
  require(`../action`).call(this,host,"leave");

  this.docs = "Exit the parent vessel."

  this.operate = function(params)
  {
    var origin = this.host.parent().name()
    
    if(this.host.is_paradox()){
      return `You cannot leave the <action>${this.host.name()}</action> paradox.`
    }
    if(this.host.parent().is_paradox()){
      return `You cannot leave the <action>${this.host.parent().name()}</action> paradox.`
    }

    this.host.move(this.host.parent().parent())

    return `You left the <action data='enter the ${origin}'>${origin}</action>.`
  }
}

module.exports = Leave