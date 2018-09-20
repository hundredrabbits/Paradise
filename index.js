const Paradise = require('./desktop/server/paradise')
const parade   = new Paradise()
const blessed  = require('blessed');


var screen = blessed.screen();

var body = blessed.box({
  top: 2,
  left: 5,
  height: '100%-4',
  width: '100%-10',
  keys: true,
  mouse: true,
});

var icon = blessed.box({
  bottom: 2,
  left: 4,
  height: 1,
  width: 1,
  style: { fg: '#fff' }
});

var inputBar = blessed.textbox({
  bottom: 2,
  left: 6,
  height: 1,
  width: '100%-12',
  keys: true,
  mouse: true,
  inputOnFocus: true,
  style: { fg: '#fff' }
});

var status = blessed.box({
  bottom: 1,
  left: 4,
  height: 1,
  width: '100%-10',
  style: { fg: '#000', bg: '#fff' }
});

screen.append(body);
screen.append(inputBar);
screen.append(icon);
screen.append(status);

screen.key(['escape', 'q', 'C-c'], (ch, key) => (process.exit(0)));

inputBar.on('submit', (text) => {
  icon.setContent(":");
  log(text);
  inputBar.clearValue();
  inputBar.focus();
  screen.render();
});

inputBar.on("keypress", (text) => {
  icon.setContent(text.trim() == "" ? ":" : ">");
  screen.render();
});

const log = (input) => {
  let response = parade.query(0,input)
  let sight = response.sight
  body.setContent(sight.cli);
  status.setContent(sight.passive)
  screen.render();
}

screen.key('enter', (ch, key) => {
  inputBar.focus();
});

inputBar.focus();
log();
screen.render();