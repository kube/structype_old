
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import {
  Type,
  TypeTestFunction,
  TYPE_IDENTIFIER,
  RUNTIME_STATIC_TYPE_VALUE
} from './types'
import { Intersectionable } from './IntersectionType'
import { Unionable } from './UnionType'

/**
 * Low-level Type Creator.
 * Only meant to be used internally by Structype.
 */
export const RawType = <T>(testFunction: TypeTestFunction<T>) =>
  Intersectionable(
    Unionable({
      [TYPE_IDENTIFIER]: true,
      type: RUNTIME_STATIC_TYPE_VALUE,
      test: testFunction
    } as Type<T>)
  )
