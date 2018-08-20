
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { AbstractType } from '../AbstractType'
import { StaticType } from '../Type'

/**
 * Blackbox Type Creator.
 *
 * A Black Type is a Type for which we cannot really assert
 * the static type.
 *
 * e.g. Integer, Positive, Odd numbers, etc...
 */
export const BlackType = <T extends StaticType>(test: (x: any) => x is T) =>
  AbstractType('black', null, { black: true }, test)
