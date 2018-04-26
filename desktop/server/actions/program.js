function Program(host)
{
  require(`../action`).call(this,host,"program");

  this.docs = "Add an automation program to a vessel, making it available to the use command. A program cannot exceed 60 characters in length.";

  this.operate = function(params)
  {
    this.host.parent().set("program",params)
  }
}

module.exports = Program