
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type } from './Type'

// Expose API on default export for conciseness in usage
export default Object.assign(Type, {
  Optional: () => console.log('OPTIONAL'),
  SayHello: () => console.log('Hello')
})
