function Wildcard(str)
{
  this.str = str;

  this.toString = function()
  {
    var s = this.str;
    s = s.replace('@FULL',`${parade.ghost().name()}`)
    s = s.replace('@NAME',`${parade.ghost().data.name}`)
    s = s.replace('@ATTR',`${parade.ghost().data.attr}`)
    return s;
  }
}