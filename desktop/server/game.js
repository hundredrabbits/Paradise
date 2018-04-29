function Game()
{
  this.load = function()
  {
    return JSON.parse(localStorage.getItem("world"));
  }

  this.save = function(parade)
  {
    console.log("save")
    localStorage.setItem("world", JSON.stringify(parade.to_h()));
  }  
}

module.exports = new Game()