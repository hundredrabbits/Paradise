function Use(host)
{
  require(`../action`).call(this,host,"use");

  this.docs = "Trigger a vessel's program."

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.siblings());

    if(target){
      this.host.cmd(target.data.program)
      return `<p>You used <action>${target}</action>.</p>`
    }
    else{
      return this.err_NOTARGET(params,"available")
    }
  }
}

module.exports = Use