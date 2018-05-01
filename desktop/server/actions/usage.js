function Usage(host)
{
  require(`../action`).call(this,host,"usage");

  this.docs = 'Usage sets an action word to a program vessel. You can also set a custom reaction to a program use by adding a short sentence after the usage action word.'

  this.operate = function(params)
  {
    if(params.trim() == ""){ return `<p>Huh?! For more details on how to set usage, type <action data='help with usage'>help</action>.</p>`; }

    var parts = params.split(" ")
    var action = parts[0]
    var reaction = params.replace(action,"").trim()

    if(this.host.parent().is_program()){
      this.host.parent().set("usage",action.toLowerCase())
      if(reaction){
        this.host.parent().set("reaction",reaction)
      }
      return `<p>You set the usage of ${this.host.parent()} to '${action}'(${reaction}).</p>`
    }
    else{
      return `<p>The ${this.host.parent().name()} is not a program.</p>`
    }
  }
}

module.exports = Usage