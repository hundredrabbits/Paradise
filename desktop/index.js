const Paradise = new require('./server/paradise')

const arg = process.argv.splice(2,process.argv.length-2)
const act = arg.splice(0,1)[0]
const cmd = arg.join(' ')

let parade = new Paradise()

parade.ghost().act("help")
parade.ghost().act("help","with drop")

parade.ghost().act("enter","the teacup")
parade.ghost().act("leave")
parade.ghost().act("warp","to 1")
parade.ghost().act("create","a table")
parade.ghost().act("take","the table")
parade.ghost().act("drop","the table")
parade.ghost().act("enter","the table")
parade.ghost().act("note","This space is vast.")
parade.ghost().act("transform","into a frog")
parade.ghost().act("transmute","into gold")