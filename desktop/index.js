const Paradise = new require('./server/paradise')

const arg = process.argv.splice(2,process.argv.length-2)
const act = arg.splice(0,1)[0]
const cmd = arg.join(' ')

let parade = new Paradise()

console.log(parade.ghost().debug())
parade.ghost().act(act,cmd)
console.log(parade.ghost().debug())