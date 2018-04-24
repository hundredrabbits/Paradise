function Server()
{
  this.act = function(action,params)
  {
    try {
      const response = require(`./actions/${action}`);
      const responder = new response()
      return responder.run(params)
    } catch (ex) {
      console.log(`Unknown command!`)
    }   

    return "--" 
  }

  this.respond = function()
  {

  }
}

module.exports = new Server()