function Inspect(host)
{
  require(`../action`).call(this,host,"inspect");

  this.docs = `Inspect a vessel to see its program, precise location and various details. An excellent tool to find issues with vessels.`;

  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.siblings());

    if(target){
      console.log(`? target ${target.name()}`)
      return `<p>You are inspecting <action>${target}</action>.</p>`
    }
    else{
      return this.err_NOTARGET(params)
    }
  }
}

module.exports = Inspect