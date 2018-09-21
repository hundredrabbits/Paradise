"use strict";

function Clock()
{
  let clock = this;

  this.time = function()
  {
    let d = new Date(), e = new Date(d);
    let msSinceMidnight = e - d.setHours(0,0,0,0);
    let val = (msSinceMidnight/864) * 10;
    return parseInt(val);
  }

  this.toString = function()
  {
    let t = this.time().toString();
    return `${t.substr(0,3)}:${t.substr(3,3)}`;
  }

  this.beat = function()
  {
    let t = this.time().toString();
    return t.substr(0,3);
  }

  this.pulse = function()
  {
    let t = this.time().toString();
    return t.substr(3,3);
  }
}

module.exports = Clock

