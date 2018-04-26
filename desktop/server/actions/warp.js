function Warp(host)
{
  require(`../action`).call(this,host,"warp");

  this.docs = "Enter a distant vessel by either its name, or its warp id. The vessel must be visible."

  this.operate = function(params)
  {
    var parts = params.split(" ")
    var id = parseInt(parts[parts.length-1]);
    var target = this.host.parade.world[id];

    if(target){
      this.host.move(target)
    }
  }
}

module.exports = Warp