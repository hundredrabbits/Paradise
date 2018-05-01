function Inventory(host)
{
  require(`../action`).call(this,host,"inventory");
  
  this.docs = "View the contents of your inventory."

  this.operate = function () {
    let children = this.host.children();
    if(children.length == 0){
      return `<p>You are not carrying any vessels.</p>`;
    }
    let r = `<p>You are carrying the following vessels: `;
    for (i in children) {
      let vessel = children[i];
      r += vessel.to_a();
      if(children.length-1 != i){
        r+=`, `;
      }
    }
    r += `</p>`
    return r;
  }
}

module.exports = Inventory