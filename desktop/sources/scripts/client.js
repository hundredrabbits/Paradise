"use strict";

function Client()
{
  this.theme = new Theme({
    background: "#efefef",
    f_high: "#000000",
    f_med: "#999999",
    f_low: "#cccccc",
    f_inv: "#000000",
    b_high: "#999999",
    b_med: "#cccccc",
    b_low: "#ffffff",
    b_inv: "#ffffff"
  });

  this.controller = new Controller();
  this.walkthrough = new Walkthrough();
  this.speaker = new Speaker();

  this.id = 0;

  this.el = null;
  this.input = null;
  this.h1   = null;
  this.page = null;
  this.note = null;
  this.view = null;
  this.tips = null;
  this.action = null;
  this.inventory = null;
  this.inventory_toggle = null;
  this.reaction = null;

  this.docs = {}
  this.visibles = []

  this.install = function(host)
  {
    this.theme.install(document.body)
  }

  this.start = function()
  {
    this.theme.start();

    this.el = document.body;
    this.h1 = document.getElementById("h1");
    this.page = document.getElementById("page");
    this.note = document.getElementById("note");
    this.view = document.getElementById("view");
    this.tips = document.getElementById("tips");
    this.action = document.getElementById("action");
    this.inventory = document.getElementById("inventory");
    this.inventory_toggle = document.getElementById("inventory_toggle");
    this.input = new Commander(document.getElementById("input"),document.getElementById("hint"));
    this.reaction = document.getElementById("reaction");

    // Events
    this.input.el.oninput   = (key) => { this.input.update(key); this.speaker.play("click2"); };
    this.input.el.onkeydown = (key) => { if(key.key == "Tab"){ this.input.complete(); } }
    this.input.el.onkeyup   = (key) => { if(key.key == "Enter"){ this.input.validate(); this.speaker.play("click4"); } };

    this.query(this.id, "look");
  }

  this.query = function(id = this.id,q = "")
  {
    if(q.indexOf("&") > -1){
      return this.multi(q.split("&"));
    }
    this.el.className = "loading"
    setTimeout(()=>{ 
      this.update(paradise.query(this.id,q))
      this.el.className = "ready" 
    },250)
  }

  this.multi = function(stack)
  {
    this.el.className = "loading"
    for(let id in stack){
      paradise.query(this.id,stack[id].trim())
    }
    setTimeout(()=>{ 
      this.update(paradise.query())
      this.el.className = "ready" 
    },250)
  }

  this.update = function(response)
  {
    this.h1.innerHTML = response.sight.h1
    this.page.innerHTML = response.sight.page
    this.view.innerHTML = response.sight.view

    // Note

    this.note.className = response.sight.note ? 'visible' : 'hidden'
    this.note.innerHTML = response.sight.note ? response.sight.note : ''

    // Reaction
    this.reaction.className = response.sight.reaction ? 'visible' : 'hidden'
    this.reaction.innerHTML = response.sight.reaction ? response.sight.reaction : ''

    // Action
    this.action.className = response.sight.action ? 'visible' : 'hidden'
    this.action.innerHTML = response.sight.action ? response.sight.action : ''

    // Tips
    let html = ""
    for(let id in response.sight.tips){
      let tip = response.sight.tips[id];
      html += `<ln>${tip}</ln>`;
    }
    this.tips.innerHTML = html

    // Inventory
    html = ""
    for(let id in response.sight.inventory){
      let v = response.sight.inventory[id]
      html += `<ln>${v.to_a(false)}${v.is_program() ? '('+v.data.program.split(" ")[0]+')' : ''}</ln>`;      
    }
    this.inventory.innerHTML = html
    this.inventory_toggle.innerHTML = `≡${response.sight.inventory.length}`

    if(response.sight.inventory.length < 1){
      this.hide_inventory();
      this.inventory_toggle.className = "hidden"
    }
    else{
      this.inventory_toggle.className = "visible"
    }

    this.docs = response.docs
    this.visibles = response.visibles

    this.input.update();
  }

  this.change_vessel = function(id)
  {
    console.log(`~ change vessel ${this.id} -> ${id}`)
    this.id = id;
    setTimeout(()=>{ this.query(this.id); this.speaker.play("click1"); }, 250)
  }

  // 

  this.import = function()
  {
    let paths = dialog.showOpenDialog({properties: ['openFile'],filters:[{name:"Paradise World",extensions:["teapot"]}]});

    if(!paths){ console.log("Nothing to load"); return; }

    fs.readFile(paths[0], 'utf-8', (err, data) => {
      if(err){ alert("An error ocurred reading the file :" + err.message); return; }
      paradise.import(JSON.parse(data))
      setTimeout(()=>{ client.query(); client.speaker.play("click1"); }, 500)
    });
  }

  this.export = function()
  {
    dialog.showSaveDialog({title:"Save World",filters: [{name: "Teapot Format", extensions: ["teapot"]}]},(fileName) => {
      if (fileName === undefined){ return; }
      fileName = fileName.substr(-5,5) != ".grid" ? fileName+".grid" : fileName;
      fs.writeFileSync(fileName, paradise.export());
    });
  }

  this.toggle_inventory = function()
  {
    if(this.inventory.className == "hidden"){
      this.show_inventory();
    }
    else{
      this.hide_inventory();
    }
  }

  this.show_inventory = function()
  {
    this.inventory.className = "visible"
  }

  this.hide_inventory = function()
  {
    this.inventory.className = "hidden"
  }

  // Misc

  this.reset = function()
  {
    console.warn("-- APOCALYPSE --")
    this.theme.reset();
    paradise.reset();
    setTimeout(()=>{ this.query(this.id); this.speaker.play("click1"); }, 250)
  }

  document.onclick= function(event)
  {
    if(event===undefined){ event = window.event; }
    let target = 'target' in event? event.target : event.srcElement;
    if(target.tagName.toLowerCase() == "action"){
      client.input.inject(target.getAttribute("data"))
    }
  };
}