let basic = {
  name: "ghost",
  attr: "hungry",

  parent: 0,
  owner: -1,
}

function Vessel(data = basic)
{
  this.data = data;

  this.act = function(parade,action,params)
  {
    const responder = this.response(action)
    return new responder(parade,this).run(params)
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

  this.to_h = function()
  {
    return {
      name: this.name,
      attr: this.attr
    }
  }
}

module.exports = Vessel