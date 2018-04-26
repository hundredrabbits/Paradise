function Become(host)
{
  require(`../action`).call(this,host,"become");

  this.docs = "Become a visible vessel, the target vessel must be present and visible in the current parent vessel. Adding a bookmark with your browser will preserve your vessel id for your return."
  
  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.siblings());

    if(target){
      this.host.cmd(target.data.program)
    }
    else{
      console.log(`! missing ${params}`)
    }
  }
}

module.exports = Become