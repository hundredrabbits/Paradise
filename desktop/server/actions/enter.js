function Enter(host)
{
  require(`../action`).call(this,host,"enter");

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.siblings());

    if(target){
      console.log(`? target ${target.to_s()}`)
      this.host.move(target)
    }
    else{
      console.log(`! missing ${params}`)
    }
  }
}

module.exports = Enter