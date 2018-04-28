function Warp(host)
{
  require(`../action`).call(this,host,"warp");

  this.docs = "Enter a distant vessel by either its name, or its warp id. The vessel must be visible. Use <action data='warp to'>warp to</action> to move at a vessel's parent location."

  this.operate = function(params)
  {
    var parts = this.remove_articles(params).trim().split(" ")
    var relation = parts[0].toLowerCase()
    var is_any = parts[1] == "any"
    var is_id = parseInt(parts[parts.length-1]) > 0

    var target = is_any ? this.find_any(parts) : this.find_name(parts);

    console.log(relation,target)

    if(!target){
      return `<p>There is no ${parts[parts.length-1]} vessel.</p>`
    }
    if(relation == "inside" || relation == "in" || relation == "within" || relation == "into"){
      return this.warp_in(target)
    }
    if(relation == "at" || relation == "by" || relation == "to"){
      return this.warp_to(target)
    }
    return `<p>Huh?</p>`
  }

  this.find_any = function(parts)
  {
    var name = parts[parts.length-1]
    var candidates = []
    for(id in this.host.parade.world){
      var v = this.host.parade.world[id]
      if(v.data.name == name){
        candidates.push(v);
      }
    }
    var id = Math.floor((Math.random() * candidates.length));
    return candidates[id]
  }

  this.find_name = function(parts)
  {
    var attr  = parts[parts.length-2] != parts[parts.length-1] ? parts[parts.length-2] : null
    var name  = parts[parts.length-1]

    for(id in this.host.parade.world){
      var v = this.host.parade.world[id]
      if(attr && v.data.attr == attr && v.data.name == name){
        return v
      }
      if(v.data.name == name){
        return v
      }
    }
    return null
  }

  this.warp_to = function(target)
  {
    this.host.move(target.parent())
    return `<p>You warped to <action>${target}</action>.</p>`
  }

  this.warp_in = function(target)
  {
    this.host.move(target)
    return `<p>You warped in <action>${target}</action>.</p>`
  }
}

module.exports = Warp