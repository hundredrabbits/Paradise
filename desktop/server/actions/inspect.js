function Inspect(host)
{
  require(`../action`).call(this,host,"inspect");

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.siblings());

    if(target){
      console.log(`? target ${target.name()}`)
      // TODO
    }
    else{
      console.log(`! missing ${target}`)
    }
  }
}

module.exports = Inspect