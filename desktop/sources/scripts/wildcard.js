function Wildcard(str)
{
  this.str = str;

  this.toString = function(convert_vessels = true)
  {
    var s = this.str;

    // Basics
    s = s.replace('@FULL',`${parade.ghost().name().toUpperCase()}`)
    s = s.replace('@NAME',`${parade.ghost().data.name.toUpperCase()}`)
    s = s.replace('@ATTR',`${parade.ghost().data.attr ? parade.ghost().data.attr.toUpperCase() : ''}`)
    s = s.replace('@full',`${parade.ghost().name().toLowerCase()}`)
    s = s.replace('@name',`${parade.ghost().data.name.toLowerCase()}`)
    s = s.replace('@attr',`${parade.ghost().data.attr ? parade.ghost().data.attr.toLowerCase() : ''}`)
    s = s.replace('@Full',`${parade.ghost().name().toLowerCase().capitalize()}`)
    s = s.replace('@Name',`${parade.ghost().data.name.toLowerCase().capitalize()}`)
    s = s.replace('@Attr',`${parade.ghost().data.attr ? parade.ghost().data.attr.toLowerCase() : ''.capitalize()}`)
    s = s.replace('@size',`${parade.ghost().children().length}`)
    // Parent
    s = s.replace('@_FULL',`${parade.ghost().parent().name().toUpperCase()}`)
    s = s.replace('@_NAME',`${parade.ghost().parent().data.name.toUpperCase()}`)
    s = s.replace('@_ATTR',`${parade.ghost().parent().data.attr ? parade.ghost().parent().data.attr.toUpperCase() : ''}`)
    s = s.replace('@_full',`${parade.ghost().parent().name().toLowerCase()}`)
    s = s.replace('@_name',`${parade.ghost().parent().data.name.toLowerCase()}`)
    s = s.replace('@_attr',`${parade.ghost().parent().data.attr ? parade.ghost().parent().data.attr.toLowerCase() : ''}`)
    s = s.replace('@_Full',`${parade.ghost().parent().name().toLowerCase().capitalize()}`)
    s = s.replace('@_Name',`${parade.ghost().parent().data.name.toLowerCase().capitalize()}`)
    s = s.replace('@_Attr',`${parade.ghost().parent().data.attr ? parade.ghost().parent().data.attr.toLowerCase() : ''.capitalize()}`)
    s = s.replace('@_size',`${parade.ghost().siblings().length}`)
    // Stem
    s = s.replace('@STEM',`${parade.ghost().parent().stem().name().toUpperCase()}`)
    s = s.replace('@stem',`${parade.ghost().parent().stem().name().toLowerCase()}`)
    s = s.replace('@Stem',`${parade.ghost().parent().stem().name().capitalize()}`)
    // Paradise
    s = s.replace('@__size',`${parade.world.length}`)
    s = s.replace('@__RANDOM',`${parade.random().name().toUpperCase()}`)
    s = s.replace('@__random',`${parade.random().name().toLowerCase()}`)
    s = s.replace('@__Random',`${parade.random().name().capitalize()}`)

    if(convert_vessels){
      var known = []
      var children = parade.ghost().siblings();
      for(id in children){
        var v = children[id];
        if(known.indexOf(v.data.name) > -1){ continue; }
        s = s.replace(v.name(),v.to_a(false))
        known.push(v.data.name)
      }
    }
  
    return s;
  }
}