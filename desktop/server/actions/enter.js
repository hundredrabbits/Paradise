function Enter(host)
{
  require(`../action`).call(this,host);

  this.operate = function(params)
  {
    var visibles = this.host.sight();
    var target = this.find_target(params,visibles);

    if(target){
      this.move(target)
    }
    else{
      console.log("no target")
    }
  }

  this.reaction = function()
  {
    return "You are entering.."
  }
}

module.exports = Enter