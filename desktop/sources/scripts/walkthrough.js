function Walkthrough()
{
  this.benchmark = [
    "warp to 1",
    "create a red vessel",
    "become the red vessel",
    "create a teapot",
    "enter the teapot",
    "leave",

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

  this.warping = [
    "warp to the library",
    "create a red house",
    "create a blue house",
    "create a yellow house",
    "warp to any house",
    "warp into any house",
    "warp to the red house",
    "warp into the red house",
    "leave"
  ]

  this.inventory = [
    "warp to the library",
    "create a red house",
    "create a blue house",
    "create a yellow house",
    "take the yellow house",
    "drop any house",
  ]

  this.programing = [
    "warp to the library",
    "create a red house",
    "create a blue house",
    "create a yellow house",
    "enter the blue house",
    "program warp into any house",
    "usage open",
    "leave",
    "open the blue house",
    "leave"
  ]

  this.all = []
  this.all = this.all.concat(this.warping)
  this.all = this.all.concat(this.inventory)
  this.all = this.all.concat(this.programing)

  this.index = 0;
  this.speed = 500;

  this.start = function(speed = 1000)
  {
    this.speed = speed;
    this.index = 0;
    this.run()
  }

  this.run = function(target = this.programing)
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