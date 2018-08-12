
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { GenericType } from './GenericType'
import {
  Type,
  TypeProps,
  TypeFromTypeProps,
  StaticTypeFromTypeProps
} from './Type'

export interface UnionType<P1 extends TypeProps, P2 extends TypeProps>
  extends GenericType<
      'union',
      StaticTypeFromTypeProps<P1> | StaticTypeFromTypeProps<P2>,
      {
        left: TypeFromTypeProps<P1>
        right: TypeFromTypeProps<P2>
      }
    > {}

/**
 * Union Type Creator.
 */
export function UnionType<P1 extends TypeProps, P2 extends TypeProps>(
  leftTypeProps: P1,
  rightTypeProps: P2
): UnionType<P1, P2> {
  // Create Types from TypeProps
  const leftType = Type(leftTypeProps)
  const rightType = Type(rightTypeProps)

  return GenericType(
    'union',
    {
      left: leftType,
      right: rightType
    },
    (x: any): x is any => {
      return leftType.test(x) || rightType.test(x)
    }
  )
}
