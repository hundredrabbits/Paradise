function Drop(host)
{
  require(`../action`).call(this,host,"create");

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.children());

    if(target){
      console.log(`target:${target.to_s()}`)
      target.move(this.host)
    }
    else{
      console.log(`missing:${target.to_s()}`)
    }
  }
}

module.exports = Drop