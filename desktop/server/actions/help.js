function Help(host)
{
  require(`../action`).call(this,host,"help");

  this.operate = function(params)
  {
    var parts = params.split(" ")
    var action = parts[parts.length-1].toLowerCase()

    try{
      var a = require(`./${action}`);
      return new a().docs
    }
    catch(err){
      if(action){
        return `Unknown action ${action}`
      }
      else{
        return this.general();
      }
    }
  }

  this.general = function()
  {
    var html = ""

    var docs = this.documentation()

    for(id in docs){
      html += `- ${id}<br />`
    }
    return html
  }
}

module.exports = Help