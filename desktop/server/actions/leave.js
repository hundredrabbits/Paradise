function Leave(host)
{
  require(`../action`).call(this,host,"leave");

  this.docs = "Exit the parent vessel."

  this.operate = function(params)
  {
    var origin = this.host.parent().name()
    if(this.host.parent().id == this.host.id){
      return `You cannot leave the ${this.host.name()} paradox.`
    }

    this.host.move(this.host.parent().parent())

    return `You left the ${origin}.`
  }
}

module.exports = Leave