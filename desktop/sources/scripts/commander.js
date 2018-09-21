"use strict";

function Commander(el,hint_el)
{
  this.el = el;
  this.hint_el = hint_el

  this.validate = function(value = this.el.value)
  {
    let q = this.el.value
    this.el.value = "";
    browser.query(q)
    this.el.focus();
  }

  this.action = function()
  {
    return this.el.value.split(" ")[0].toLowerCase();
  }

  this.inject = function(value)
  {
    this.el.value = value;
    this.el.focus();
  }

  this.update = function()
  {
    if(!this.el.value || this.el.value.length < 2){ this.hint_el.innerHTML = ""; return; }

    this.hint_el.innerHTML = `<t class='ghost'>${this.el.value}</t>${this.autocomplete()}`
  }

  this.complete = function()
  {
    if(this.el.value.length < 2){ return; }

    this.el.value += this.autocomplete()
    setTimeout(() => { this.el.focus(); },500)
  }

  this.autocomplete = function()
  {
    if(this.el.value.split(" ").length < 2){
      return this.action_hint()
    }
    else{
      return this.vessel_hint()
    }
  }

  this.action_hint = function()
  {
    let target = this.action()

    for(name in browser.docs){
      let action = browser.docs[name]
      if(name.substr(0,target.length) == target){
        return name.substr(target.length)
      }      
    }
    return ""
  }

  this.vessel_hint = function()
  {
    let param = this.el.value.replace(this.action(),"").trim()
    let article = param.split(" ")[0]
    let target = param.split(" ")[1]

    if(article == "the" && target && target != article){
      for(let id in browser.visibles){
        let name = browser.visibles[id].data.name
        if(name.substr(0,target.length) == target){
          return name.substr(target.length)
        }      
      }
    }
    return ""
  }
}