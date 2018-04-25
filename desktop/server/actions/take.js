function Take(host)
{
  require(`../action`).call(this,host,"take");

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.siblings());

    if(target){
      target.move(this.host)
    }
    else{
      console.log(`! missing ${params}`)
    }
  }
}

module.exports = Take