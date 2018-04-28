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

    // Test usage
    "enter the teapot",
    "usage open",
    "leave",
    "open the teapot"
  ]

  this.default = [
    "create a red house",
    "create a blue house",
    "create a yellow house",
    "warp into any house",
    "warp into the red house",
  ]

  this.index = 0;
  this.speed = 500;

  this.start = function(speed = 1000)
  {
    this.speed = speed;
    this.index = 0;
    this.run()
  }

  this.run = function(target = this.default)
  {
    client.query(0,target[this.index]);
    this.index += 1

    if(target[this.index]){
      setTimeout(()=>{
        this.run();
      },this.speed)
    }
  }

}