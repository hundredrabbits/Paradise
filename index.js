const Paradise = require('./desktop/server/core/paradise')
const Terminal = require('./cli/terminal')

const paradise = new Paradise()
const terminal = new Terminal(paradise)

terminal.install();
terminal.start();
