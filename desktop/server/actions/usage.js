function Usage(host)
{
  require(`../action`).call(this,host,"usage");

  this.operate = function(params)
  {
    var parts = params.split(" ")
    var word = parts[parts.length-1].toLowerCase()

    if(this.host.parent().is_program()){
      this.host.parent().set("usage",word)
      return `<p>You set the usage of ${this.host.parent()} to '${word}'.</p>`
    }
    else{
      return `<p>The ${this.host.parent().name()} is not a program.</p>`
    }
  }
}

module.exports = Usage