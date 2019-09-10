'use strict'

/* global */

function Walkthrough (client, paradise) {
  this.chapters = {
    errors: [
      'create',
      'create ?!',
      'create a house & create a house',
      'become',
      'become unseen',
      'enter',
      'enter unseen',
      'take',
      'take unseen',
      'drop',
      'drop unseen',
      'warp',
      'warp unseen',
      'move',
      'move unseen'
    ],
    basics: [
      'warp to the library',
      'create a yellow house',
      'become the yellow house',
      'become the ghost',
      'enter the house',
      'leave'
    ],
    warp: [
      'warp to the library',
      'create a red house',
      'create a blue house',
      'create a yellow house',
      'warp to the red house',
      'warp in the red house',
      'leave'
    ],
    move: [
      'warp to the library',
      'create a red house',
      'create a blue house',
      'create a yellow house',
      'move the yellow house in the blue house',
      'take the blue house',
      'move the blue house in the red house'
    ],
    program: [
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
    ],
    alchemy: [
      'warp to the library',
      'create a lead teacup',
      'transform the teacup into a house',
      'transform into a foggy bat',
      'transform into glass',
      'transform the house into a golden cat'
    ],
    spells: [
      'warp to the library',
      'create a storm scroll',
      'enter the scroll',
      'program warp in the ghost',
      'leave',
      'create blue bug',
      'cast the storm scroll on the blue bug'
    ]
  }

  this.run = (chapter = 'all') => {
    this.chapters.all = []
    for (const chapter in this.chapters) {
      this.chapters.all = this.chapters.all.concat(this.chapters[chapter])
    }
    client.reset()
    for (const cmd of this.chapters[chapter]) {
      client.validate(cmd)
    }
  }
}
