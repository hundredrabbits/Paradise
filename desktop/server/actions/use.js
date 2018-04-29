function Use(host)
{
  require(`../action`).call(this,host,"use");

  this.docs = "Trigger a vessel's program."

  this.operate = function(params)
  {
    if(params.trim() == ""){ return `<p>Huh?! For more details on how to use, type <action data='help with use'>help</action>.</p>`; }

    var target = this.find(params,this.host.siblings());

    if(target){
      if(target.data.program.indexOf("@and") > -1){
        var cmds = target.data.program.split("@and")
        for(id in cmds){
          var cmd = cmds[id].trim()
          console.log(cmd)
          this.host.cmd(cmd)
        }
      }
      else{
        this.host.cmd(target.data.program)
      }
      return `<p>You used <action>${target}</action>.</p>`
    }
    else{
      return this.err_NOTARGET(params,"available")
    }
  }
}

module.exports = Use