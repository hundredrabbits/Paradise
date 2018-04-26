function Client()
{
  this.controller = new Controller();

  this.input = null;
  this.h1   = null;
  this.page = null;
  this.note = null;
  this.view = null;
  this.tips = null;
  this.hint = null;

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

    this.h1 = document.getElementById("h1");
    this.page = document.getElementById("page");
    this.note = document.getElementById("note");
    this.view = document.getElementById("view");
    this.tips = document.getElementById("tips");
    this.hint = document.getElementById("hint");
    this.input = document.getElementById("input");

    // Events
    this.input.oninput = (key) => { this.update_hint(key); };
    this.input.onkeyup = (key) => { if(key.key == "Enter"){ this.validate(); } };

    this.query();
  }

  this.update_hint = function()
  {
    this.hint.innerHTML = this.input.value+" <"
  }

  this.validate = function(value = this.input.value)
  {
    this.input.value = "";
    console.log("VALIDATE",value); 
  }

  this.query = function(id = 0,q = "")
  {
    this.update(parade.query(q))
  }

  this.update = function(response)
  {
    this.h1.innerHTML = response.sight.h1
    this.page.innerHTML = response.sight.page
    this.note.innerHTML = response.sight.note
    this.view.innerHTML = response.sight.view
    this.tips.innerHTML = response.sight.tips

    this.update_hint();

    console.log(response)
  }
}