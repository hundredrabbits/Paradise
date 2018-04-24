const Paradise = require('./server/paradise')
const Vessel = require('./server/vessel')
const server = require('./server/main')

const arg = process.argv.splice(2,process.argv.length-2)
const act = arg.splice(0,1)[0]
const cmd = arg.join(' ')

server.parade = new Paradise()
server.ghost = server.parade.find_ghost()

console.log(server.ghost.act(server.parade,act,cmd))