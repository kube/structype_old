
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { RawType } from './RawType'
import { Primitive } from './Primitives'

/**
 * Create a Type for a specific Literal
 */
export const LiteralType = <T extends Primitive>(literal: T) =>
  RawType((x: any): x is T => {
    return x === literal
  })
