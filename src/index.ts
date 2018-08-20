
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type } from './Type'
import { OptionalType } from './OptionalType'

// Expose API on default export for conciseness in usage
export default Object.assign(Type, { Optional: OptionalType })
