
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type, TYPE_IDENTIFIER } from './types'

/**
 * Check if an object is a Type.
 */
export const isType = (obj: {}): obj is Type<any> =>
  obj && (obj as any)[TYPE_IDENTIFIER] === true
