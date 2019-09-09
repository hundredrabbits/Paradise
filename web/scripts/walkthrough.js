'use strict'

/* global */

function Walkthrough (client, paradise) {
  this.chapters = {
    errors: [
      'create',
      'create ?!',
      'become',
      'become unseen',
      'enter',
      'enter unseen',
      'take',
      'take unseen',
      'drop',
      'drop unseen',
      'warp',
      'warp unseen'
    ],
    basics: [
      'warp to the library',
      'create a yellow house',
      'become the yellow house',
      'become the ghost',
      'enter the yellow house',
      'leave'
    ],
    inventory: [
      'warp to the library',
      'create a red house',
      'create a blue house',
      'create a yellow house',
      'take the yellow house',
      'drop any house'
    ],
    warping: [
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
    ],
    programing: [
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

  this.run = () => {
    for (const chapter in this.chapters) {
      console.log('Walkthrough: ' + chapter)
      client.reset()
      for (const cmd of this.chapters[chapter]) {
        client.validate(cmd)
      }
    }
  }
}
