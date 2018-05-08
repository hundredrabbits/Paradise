function Clock()
{
  var clock = this;

  this.time = function()
  {
    var d = new Date(), e = new Date(d);
    var msSinceMidnight = e - d.setHours(0,0,0,0);
    var val = (msSinceMidnight/864) * 10;
    return parseInt(val);
  }

  this.toString = function()
  {
    var t = this.time().toString();
    return `${t.substr(0,3)}:${t.substr(3,3)}`;
  }

  this.beat = function()
  {
    var t = this.time().toString();
    return t.substr(0,3);
  }

  this.pulse = function()
  {
    var t = this.time().toString();
    return t.substr(3,3);
  }
}

module.exports = Clock

