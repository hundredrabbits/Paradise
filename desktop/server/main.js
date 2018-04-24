function Server()
{
  this.act = function(action,params)
  {
    console.log(action)
    console.log(params)
    
  }
}

module.exports = new Server()