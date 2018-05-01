function Inventory(host)
{
  require(`../action`).call(this,host,"inventory");

  this.docs = "View the contents of your inventory."

  this.operate = function ()
  {
    let children = this.host.children();

    if(children.length == 0){ return `<p>You are not carrying any vessels.</p>`; }

    client.hide_inventory();
    
    let html = `<p>You are carrying the following vessels: `;

    for (i in children) {
      let vessel = children[i];
      html += vessel.to_a();
      if(children.length-1 != i){
        html +=`, `;
      }
    }
    html += `</p>`
    return html;
  }
}

module.exports = Inventory