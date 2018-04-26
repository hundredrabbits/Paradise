function Leave(host)
{
  require(`../action`).call(this,host,"leave");

  this.docs = "Exit the parent vessel."

  this.operate = function(params)
  {
    var origin = this.host.parent().name()
    
    if(this.host.is_paradox()){
      return `You cannot leave the ${this.host.name()} paradox.`
    }
    if(this.host.parent().is_paradox()){
      return `You cannot leave the ${this.host.parent().name()} paradox.`
    }

    this.host.move(this.host.parent().parent())

    return `You left the <action data='enter the ${origin}'>${origin}</action>.`
  }
}

module.exports = Leave