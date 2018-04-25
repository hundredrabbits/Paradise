function Take(host)
{
  require(`../action`).call(this,host);

  this.operate = function(params)
  {
    console.log(`Take..${params}`)

    var target = this.find_target(params,this.host.siblings());

    if(target){
      console.log(`target:${target.to_s()}`)
      target.move(this.host)
    }
    else{
      console.log(`missing:${target.to_s()}`)
    }
  }
}

module.exports = Take