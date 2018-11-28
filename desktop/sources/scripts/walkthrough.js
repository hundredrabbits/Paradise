'use strict'

function Walkthrough () {
  this.basics = [
    '_RESET',
    'warp to the library',
    'create a yellow house',
    'become the yellow house',
    'become the ghost',
    'enter the yellow house',
    'leave'
  ]

  this.warping = [
    '_RESET',
    'warp to the library',
    'create a red house',
    'create a blue house',
    'create a yellow house',
    'warp to any house',
    'warp into any house',
    'warp to the red house',
    'warp into the red house',
    'warp anywhere',
    'leave'
  ]

  this.inventory = [
    '_RESET',
    'warp to the library',
    'create a red house',
    'create a blue house',
    'create a yellow house',
    'take the yellow house',
    'drop any house'
  ]

  this.programing = [
    '_RESET',
    'warp to the library',
    'create a red house',
    'create a blue house',
    'create a yellow house',
    'enter the blue house',
    'program warp into any house',
    'trigger open',
    'leave',
    'open the blue house',
    'leave'
  ]

  this.metas = [
    '_RESET',
    'warp to the library',
    'create a red house',
    'create a blue house',
    'create a yellow house',
    'inspect the red house',
    'learn',
    'learn to program',
    'learn to use',
    'learn to trigger',
    'note It is raining. Again.'
  ]

  this.alchemy = [
    '_RESET',
    'warp to the library',
    'create a lead teacup',
    'transform the teacup into a house',
    'transform into a foggy bat',
    'transform into glass',
    'transform the house into a golden cat'
  ]

  this.spells = [
    '_RESET',
    'warp to the library',
    'create a storm scroll',
    'enter the scroll',
    'program warp in the ghost',
    'leave',
    'create blue bug',
    'cast the storm scroll on the blue bug'
  ]

  // TODO: Expand
  this.cards = [
    '_RESET',
    'echo @(self)',
    'echo @(vessel self "name")',
    'create @( random "chair" "table" "sofa" )'
  ]

  this.errors = [
    '_RESET',
    'become',
    'cast',
    'create',
    'drop',
    'enter',
    'move',
    'note',
    'program',
    'take',
    'transform',
    'trigger',
    'use',
    'warp'
  ]

  this.all = []
  this.all = this.all.concat(this.warping)
  this.all = this.all.concat(this.inventory)
  this.all = this.all.concat(this.programing)
  this.all = this.all.concat(this.basics)
  this.all = this.all.concat(this.metas)
  this.all = this.all.concat(this.alchemy)
  this.all = this.all.concat(this.spells)
  this.all = this.all.concat(this.cards)
  this.all = this.all.concat(this.errors)

  this.index = 0
  this.speed = 500

  this.start = function (speed = 50, log = false) {
    const backup_world = browser.save_string()
    console.log(backup_world);

    this.speed = speed
    this.index = 0
    browser.reset()
    this.run(function (backup_world, browser) {
      console.log(backup_world);
      browser.load_string(backup_world)
      browser.query('look')
    }, [backup_world, browser], this.all, log)
  }

  this.run = function (callback, callback_params, target = this.all, log = false) {
    if (log) {
      console.log(target[this.index])
    }
    if (target[this.index] === '_RESET') {
      browser.reset()
    } else {
      const sight = browser.query(target[this.index])
      if (log) {
        console.log(`> ${sight.reaction}`);
      }
    }
    this.index += 1

    if (target[this.index]) {
      setTimeout(() => { this.run(callback, callback_params, target, log) }, this.speed)
    } else {
      callback.apply(this, callback_params)
    }
  }
}
