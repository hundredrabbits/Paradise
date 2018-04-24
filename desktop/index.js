const server = require('./server/main');
const arg = process.argv.splice(2,process.argv.length-2)
const act = arg.splice(0,1)[0]
const cmd = arg.join(' ')

console.log(server.act(act,cmd))

module.exports = server.act(act,cmd)