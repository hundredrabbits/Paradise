function Warp(host)
{
  require(`../action`).call(this,host);

  this.operate = function(params)
  {
    console.log("Warping",params)

    var parts = params.split(" ")
    var id = parseInt(parts[parts.length-1]);
    var target = this.host.parade.world[id];

    if(target){
      this.host.move(target)
    }
  }

  this.reaction = function()
  {
    return "You are warping.."
  }
}

module.exports = Warp