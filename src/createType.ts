
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type, TypeTestFunction, TYPE_IDENTIFIER } from './types'

/**
 * Low-level Type Creator.
 * Only meant to be used internally by Structype.
 */
export const createType = <T>(
  validator: TypeTestFunction<T>
): Type<T> => ({
  type: null as any,
  [TYPE_IDENTIFIER]: true,
  test: validator
})
