function Commander(el,hint_el)
{
  this.el = el;
  this.hint_el = hint_el

  this.validate = function(value = this.el.value)
  {
    var q = this.el.value
    this.el.value = "";
    this.update(parade.query(q))
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

    this.hint_el.innerHTML = `<t class='ghost'>${target}</t>${name.substr(target.length)}`
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
    var target = this.action()

    for(name in client.docs){
      var action = client.docs[name]
      if(name.substr(0,target.length) == target){
        
        break;
      }      
    }
  }

  this.vessel_hint = function()
  {

  }
}