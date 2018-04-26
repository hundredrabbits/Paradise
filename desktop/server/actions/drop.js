function Drop(host)
{
  require(`../action`).call(this,host,"drop");

  this.docs = "Move a child vessel into the parent vessel."

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.children());

    if(target){
      target.move(this.host.parent())
      return `You dropped ${target.particle()} <action data='take the ${target.name()}'>${target.name()}</action>.`
    }
    else{
      console.log(`! missing ${target}`)
    }
  }
}

module.exports = Drop