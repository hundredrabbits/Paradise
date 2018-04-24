function Server()
{
  this.act = function(action,params)
  {
    const responder = this.response(action)
    console.log(new responder)
    return new responder().run(params)
  }

  this.response = function(action)
  {
    try {
      return require(`./actions/${action}`);
    }
    catch(ex) {
      return require(`./action`);
    } 
    return require(`./action`);
  }
}

module.exports = new Server()