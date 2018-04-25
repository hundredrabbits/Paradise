function Cast(host)
{
  require(`../action`).call(this,host,"cast");

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.parade.world);

    if(target){
      this.host.cmd(target.data.program)
    }
    else{
      console.log(`! missing ${params}`)
    }
  }
}

module.exports = Cast