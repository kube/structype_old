
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { AbstractType } from './AbstractType'
import {
  Type,
  TypeDescription,
  TypeFromTypeDescription,
  StaticTypeFromTypeDescription
} from './Type'

export interface UnionType<P1 extends TypeDescription, P2 extends TypeDescription>
  extends AbstractType<
      'union',
      StaticTypeFromTypeDescription<P1> | StaticTypeFromTypeDescription<P2>,
      {},
      {
        left: TypeFromTypeDescription<P1>
        right: TypeFromTypeDescription<P2>
      }
    > {}

/**
 * Union Type Creator.
 */
export function UnionType<P1 extends TypeDescription, P2 extends TypeDescription>(
  leftTypeDescription: P1,
  rightTypeDescription: P2
): UnionType<P1, P2> {
  // Create Types from TypeDescription
  const leftType = Type(leftTypeDescription)
  const rightType = Type(rightTypeDescription)

  return AbstractType(
    'union',
    {
      left: leftType,
      right: rightType
    },
    {},
    (x: any): x is any => {
      return leftType.test(x) || rightType.test(x)
    }
  )
}
