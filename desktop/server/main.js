function Server()
{
  this.ghost = null

  this.act = function(action,params)
  {
    const responder = this.response(action)
    return new responder(this.ghost).run(params)
  }

  this.response = function(action)
  {
    try{
      return require(`./actions/${action}`);
    }
    catch(ex){
      return require(`./action`);
    } 
    return require(`./action`);
  }
}

module.exports = new Server()