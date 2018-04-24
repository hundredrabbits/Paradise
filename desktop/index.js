const server = require('./server/main');

let arg = process.argv.splice(2,process.argv.length-2)
let act = arg.splice(0,1)[0]
let cmd = arg.join(' ')

console.log(server.act(act,cmd))