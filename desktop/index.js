const Paradise = new require('./server/paradise')

const arg = process.argv.splice(2,process.argv.length-2)
const act = arg.splice(0,1)[0]
const cmd = arg.join(' ')

let parade = new Paradise()

parade.ghost().act("enter","the teacup")
parade.ghost().act("leave")
parade.ghost().act("warp","to 1")
parade.ghost().act("create","a table")