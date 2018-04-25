function Help(host)
{
  require(`../action`).call(this,host,"help");

  this.operate = function(params)
  {
    var parts = params.split(" ")
    var action = parts[parts.length-1].toLowerCase()

    try{
      var a = require(`./${action}`);
      console.log(new a().docs)
    }
    catch(err){
      if(action){
        console.log(`Unknown action ${action}`)
      }
      else{
        console.log("You are asking for help..")  
      }
    }
  }
}

module.exports = Help