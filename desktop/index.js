const parade = require('./server/paradise')

const arg = process.argv.splice(2,process.argv.length-2)
const act = arg.splice(0,1)[0]
const cmd = arg.join(' ')

console.log(parade.ghost().act(act,cmd)) // 