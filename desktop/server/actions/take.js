function Take(host)
{
  require(`../action`).call(this,host,"take");

  this.take = "Move a visible vessel into a child vessel."

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.siblings());

    if(target){
      target.move(this.host)
      return `You took ${target.particle()} <action data='drop the ${target.name()}'>${target.name()}</action>.`
    }
    else{
      console.log(`! missing ${params}`)
    }
  }
}

module.exports = Take