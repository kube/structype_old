
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type } from './types'
import { createType } from './createType'

export const LiteralType = <T extends string | number | boolean>(
  literal: T
): Type<T> =>
  createType((x: any): x is T => {
    return x === literal
  })
