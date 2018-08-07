
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Primitive } from './Primitive'
import { GenericType } from './GenericType'

/**
 * Literal Type Creator.
 */
export type LiteralType<L extends Primitive> = GenericType<'literal', L, L>

export const LiteralType = <L extends Primitive>(literal: L): LiteralType<L> =>
  GenericType(
    'literal',
    literal,
    (x: any): x is L => {
      return x === literal
    }
  )
