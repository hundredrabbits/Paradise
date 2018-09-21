"use strict";

const Client  = require('../../desktop/server/core/client');

function Browser(paradise)
{
  Client.call(this,paradise)

  this.theme = new Theme({
    background: "#ffffff",
    f_high: "#000000",
    f_med: "#999999",
    f_low: "#cccccc",
    f_inv: "#000000",
    b_high: "#999999",
    b_med: "#cccccc",
    b_low: "#efefef",
    b_inv: "#ffffff"
  });

  this.controller = new Controller();
  this.walkthrough = new Walkthrough();
  this.speaker = new Speaker();

  this.el = null;
  this.input = null;
  this.h1   = null;
  this.passive = null;
  this.note = null;
  this.view = null;
  this.tips = null;
  this.action = null;
  this.reaction = null;

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
    this.passive = document.getElementById("passive");
    this.note = document.getElementById("note");
    this.view = document.getElementById("view");
    this.tips = document.getElementById("tips");
    this.action = document.getElementById("action");
    this.input = new Commander(document.getElementById("input"),document.getElementById("hint"));
    this.reaction = document.getElementById("reaction");

    // Events
    this.input.el.oninput   = (key) => { this.input.update(key); this.speaker.play("click2"); };
    this.input.el.onkeydown = (key) => { if(key.key == "Tab"){ this.input.complete(); } }
    this.input.el.onkeyup   = (key) => { if(key.key == "Enter"){ this.input.validate(); this.speaker.play("click4"); } };

    // Resume?

    this.resume();
    this.query();
  }

  this.update = function(sight)
  {
    this.save();

    this.el.className = "loading"
    this.h1.innerHTML = sight.header
    this.passive.innerHTML = sight.passive ? sight.passive : '<action data="learn about passive">Learn</action>'
    this.view.innerHTML = sight.view

    this.reaction.className = sight.reaction ? 'visible' : 'hidden'
    this.reaction.innerHTML = sight.reaction ? sight.reaction : ''
    
    this.note.className = sight.note ? 'visible' : 'hidden'
    this.note.innerHTML = sight.note ? sight.note : ''

    this.action.className = sight.action ? 'visible' : 'hidden'
    this.action.innerHTML = sight.action ? sight.action : ''

    // Tips
    let html = ""
    for(let id in sight.tips){
      let tip = sight.tips[id];
      html += `<ln>${tip}</ln>`;
    }
    this.tips.innerHTML = html

    this.input.update();
    setTimeout(()=>{ this.el.className = "ready" },250)
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

  this.save = function(paradise)
  {
    // localStorage.setItem("world", JSON.stringify(paradise.to_h()));  
  }  

  this.load = function()
  {
    // return JSON.parse(localStorage.getItem("world"));
  }

  this.resume = function()
  {
    this.reset();
    // let previous = this.load()
    
    // if(previous){
    //   console.info("Loaded world")
    //   this.import(previous)
    // }
    // else{
    //   console.info("New world")
    //   this.reset();
    // }
  }

  // Misc

  this.reset = function()
  {
    console.warn("-- APOCALYPSE --")
    this.theme.reset();
    paradise.reset();
    setTimeout(()=>{ this.query(); this.speaker.play("click1"); }, 250)
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