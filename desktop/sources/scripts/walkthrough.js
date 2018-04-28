function Walkthrough()
{
  this.benchmark = [
    "warp to 1",
    "create a red vessel",
    "become the red vessel",
    "create a teapot",
    "enter the teapot",
    "leave",

    "take the teapot",
    "drop the teapot",

    "transform into a cat",
    "transmute into gold",
    
    "note it is raining in the teacup.",

    "enter the teapot",
    "program create a coffee",
    "leave",
    "inspect the teapot",
    "use the teapot",

    "help",
    "help with drop",

    "enter the teapot",
    "usage open"
  ]

  this.index = 0;
  this.speed = 500;

  this.start = function(speed = 1000)
  {
    this.speed = speed;
    this.index = 0;
    this.run()
  }

  this.run = function()
  {
    client.query(0,this.benchmark[this.index]);
    this.index += 1

    if(this.benchmark[this.index]){
      setTimeout(()=>{
        this.run();
      },this.speed)
    }
  }

}