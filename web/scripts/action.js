function Action (name, docs, flags, fn) {
  this.name = name
  this.flags = flags
  this.docs = docs
  this.fn = fn

  this.run = function (host, q) {
    let input = q
    let target = null
    let relation = null
    let cast = null
    // Filters
    if (this.flag('words')) { input = removeParticles(input) }
    // Checks
    if (this.flag('unique') && paradise.find(input)) { return `you cannot create another ${input}.` }
    if (this.flag('valid') && !isValid(input)) { return `you cannot create the ${input}.` }
    if (this.flag('notparadox') && host.parent().isParadox()) { return `you cannot leave a paradox.` }
    if (this.flag('notempty') && !input) { return `you cannot use this action without parameter.` }
    // Targets
    if (this.flag('visible')) { target = paradise.find(q, host.sight()) }
    if (this.flag('inventory')) { target = paradise.find(q, host.inventory()) }
    if (this.flag('distant')) { target = paradise.find(q, paradise.vessels()) }

    if (this.flag('relation')) { relation = createRelation(input) }

    if (this.flag('target') && !target) { return `Missing target vessel.` }

    if (this.flag('cast')) {
      relation = findRelation(input)
      const parts = input.split(` ${relation} `)
      target = paradise.find(parts[0], host.sight())
      cast = paradise.find(parts[1], host.sight())
      if (!target) { return `Missing ${parts[0]}.` }
      if (!cast) { return `Missing ${parts[1]}.` }
    }

    return this.fn(input, target, relation, cast)
  }

  this.flag = (id) => {
    return this.flags.indexOf(id) >= 0
  }
}
