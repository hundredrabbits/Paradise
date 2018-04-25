function Drop(host)
{
  require(`../action`).call(this,host,"drop");

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.children());

    if(target){
      console.log(`? target ${target.to_s()}`)
      target.move(this.host.parent())
    }
    else{
      console.log(`! missing ${target}`)
    }
  }
}

module.exports = Drop