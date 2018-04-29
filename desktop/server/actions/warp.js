function Warp(host)
{
  require(`../action`).call(this,host,"warp");

  this.docs = "Enter a distant vessel by either its name, or its warp id. The vessel must be visible. Use <action data='warp to'>warp to</action> to move at a vessel's parent location."

  this.operate = function(params)
  {
    var parts = this.remove_articles(params).split(" ")
    var relation = parts[0];
    var target = this.find(parts.length > 1 ? params.replace(relation,'').trim() : params)

    if(!target){
      return `You cannot warp to this location.`
    }
    if(relation == "at" || relation == "by" || relation == "to"){
      this.host.move(target.parent())
      return `<p>You warped by the <action>${target.name()}</action>, inside the ${target.parent().name()}.</p>`
    }
    
    this.host.move(target)
    return `<p>You warped in <action>${target}</action>.</p>`
  }
}

module.exports = Warp