
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type } from './types'
import { RawType } from './RawType'

export const IntersectionType = <A, B>(
  typeA: Type<A>,
  typeB: Type<B>
) =>
  RawType((x: any): x is A & B => {
    return typeA.test(x) && typeB.test(x)
  })

export type IntersectionableType<
  T extends Type<any>
> = T extends Type<infer A>
  ? T & { and: <B>(_: Type<B>) => Type<A & B> }
  : never

/**
 * Decorator exposing Intersection method on Type.
 */
export const Intersectionable = <T, X extends Type<T>>(
  type: X
): IntersectionableType<X> => {
  const intersectionableType: any = type

  intersectionableType.and = <S>(rightType: Type<S>) =>
    IntersectionType(type, rightType)

  return intersectionableType
}
