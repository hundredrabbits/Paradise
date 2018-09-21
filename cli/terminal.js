const blessed  = require('blessed');
const Client  = require('../desktop/server/core/client');

function Terminal(paradise)
{
  Client.call(this,paradise);
  
  this._screen = blessed.screen();
  this._body = blessed.box({ top: 2, left: 2, height: '100%-4', width: 54, keys: true, mouse: true });
  this._icon = blessed.box({ bottom: 2, left: 2, height: 1, width: 1, style: { fg: '#fff' } });
  this._input = blessed.textbox({ bottom: 2, left: 4, height: 1, width: '100%-6', keys: true, mouse: true, inputOnFocus: true, style: { fg: '#fff' }});
  this._status = blessed.box({ bottom: 1, left: 2, height: 1, width: '100%-4', style: { fg: '#000', bg: '#333' }});

  this.install = function()
  {
    this._screen.append(this._body);
    this._screen.append(this._input);
    this._screen.append(this._icon);
    this._screen.append(this._status);
  }

  this.start = function()
  {
    paradise.reset();
    this._screen.key(['escape', 'q', 'C-c'], (ch, key) => (process.exit(0)));
    this._input.on('submit', (text)=>{ this.on_submit(text) });
    this._input.on('keypress', (text)=>{ this.on_keypress(text) });
    this._input.focus();
    this.query();
  }

  this.update = function(sight)
  {
    this._body.setContent(sight.cli);
    this._status.setContent('- '+sight.passive)
    this._icon.setContent(">");
    this._screen.render();
  }

  // Events

  this.on_submit = function(text)
  {
    this.query(text);
    this._icon.setContent(":");
    this._input.clearValue();
    this._input.focus();
    this._screen.render();
  }

  this.on_keypress = function(text)
  {
    this._icon.setContent(text.trim() == "" ? ":" : ">");
    this._screen.render();
  }
}

module.exports = Terminal
