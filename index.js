const Paradise = require('./desktop/server/paradise')
const parade   = new Paradise()

const blessed = require('blessed');

var screen = blessed.screen();

var body = blessed.box({
  top: 2,
  left: 5,
  height: '100%-4',
  width: '100%-10',
  keys: true,
  mouse: true,
  alwaysScroll: true,
  scrollable: true,
  scrollbar: {
    ch: ' ',
    bg: 'red'
  }
});

var inputBar = blessed.textbox({
  bottom: 2,
  left: 5,
  height: 1,
  width: '100%-10',
  keys: true,
  mouse: true,
  inputOnFocus: true,
  style: {
    fg: '#fff',
    bg: '#333'  // Blue background so you see this is different from body
  }
});

// Add body to blessed screen
screen.append(body);
screen.append(inputBar);

// Close the example on Escape, Q, or Ctrl+C
screen.key(['escape', 'q', 'C-c'], (ch, key) => (process.exit(0)));

// Handle submitting data
inputBar.on('submit', (text) => {
  log(text);
  inputBar.clearValue();
  inputBar.focus();
  screen.render();
});

// Add text to body (replacement for console.log)
const log = (input) => {
  let response = parade.query(0,input)
  let sight = response.sight

  body.setContent(sight.cli);
  screen.render();
}

screen.key('enter', (ch, key) => {
  inputBar.focus();
});

inputBar.focus();
screen.render();