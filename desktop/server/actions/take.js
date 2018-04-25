function Take(host)
{
  require(`../action`).call(this,host,"take");

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.siblings());

    if(target){
      console.log(`- target:${target.to_s()}`)
      target.move(this.host)
    }
    else{
      console.log(`! missing:${target.to_s()}`)
    }
  }
}

module.exports = Take