function Client(paradise)
{
  this.paradise = paradise;
  this.paradise.client = this;

  this.id = 0;

  this.install = function()
  {

  }

  this.start = function()
  {

  }

  this.update = function(sight)
  {

  }

  // I/O

  this.import = function(JSON)
  {

  }

  this.export = function()
  {

  }

  this.save = function()
  {

  }

  this.load = function()
  {

  }

  //

  this.query = function(input = "", on_query = this.update)
  {
    let sight;
    let lines = `${input}`.split(" & ");
    for(let id in lines){
      sight = this.paradise.query(this.id,lines[id])  
    }
    this.update(sight)
  }

  this.change_vessel = function(id)
  {
    this.id = id;
    this.query();
  }
}

module.exports = Client