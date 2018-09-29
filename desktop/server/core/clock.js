"use strict";

function Clock()
{
  const clock = this;

  this.time = function()
  {
    const d = new Date(), e = new Date(d);
    const msSinceMidnight = e - d.setHours(0,0,0,0);
    const val = (msSinceMidnight/864) * 10;
    return parseInt(val);
  }

  this.toString = function()
  {
    const t = this.time().toString();
    return `${t.substr(0,3)}:${t.substr(3,3)}`;
  }

  this.beat = function()
  {
    const t = this.time().toString();
    return t.substr(0,3);
  }

  this.pulse = function()
  {
    const t = this.time().toString();
    return t.substr(3,3);
  }
}

module.exports = Clock

