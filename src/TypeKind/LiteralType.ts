
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Primitive } from '../Primitive'
import { AbstractType } from '../AbstractType'

/**
 * Literal Type Creator.
 */
export type LiteralType<L extends Primitive> = AbstractType<'literal', L, { literal: true }, L>

export const LiteralType = <L extends Primitive>(literal: L): LiteralType<L> =>
  AbstractType(
    'literal',
    literal,
    { literal: true },
    (x: any): x is L => x === literal
  )
