
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { GenericType } from './GenericType'
import { StaticType } from './Type'

/**
 * Blackbox Type Creator.
 *
 * A Black Type is a Type for which we cannot really assert
 * the static type.
 *
 * e.g. Integer, Positive, Odd numbers, etc...
 */
export const BlackType = <T extends StaticType>(test: (x: any) => x is T) =>
  GenericType('black', null, test)
