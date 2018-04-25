function Client()
{
  this.controller = new Controller();

  this.start = function()
  {
    this.controller.add("default","*","About",() => { require('electron').shell.openExternal('https://github.com/hundredrabbits/Left'); },"CmdOrCtrl+,");
    this.controller.add("default","*","Fullscreen",() => { app.toggle_fullscreen(); },"CmdOrCtrl+Enter");
    this.controller.add("default","*","Hide",() => { app.toggle_visible(); },"CmdOrCtrl+H");
    this.controller.add("default","*","Inspect",() => { app.inspect(); },"CmdOrCtrl+.");
    this.controller.add("default","*","Documentation",() => { left.controller.docs(); },"CmdOrCtrl+Esc");
    this.controller.add("default","*","Reset",() => { left.theme.reset(); },"CmdOrCtrl+Backspace");
    this.controller.add("default","*","Quit",() => { left.project.quit(); },"CmdOrCtrl+Q");
    
    this.controller.commit();
  }
}