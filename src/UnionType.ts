
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

export const UnionType = <A, B>(typeA: Type<A>, typeB: Type<B>) =>
  RawType((x: any): x is A | B => {
    return typeA.test(x) || typeB.test(x)
  })

type UnionableType<T extends Type<any>> = T extends Type<infer A>
  ? T & { or: <B>(_: Type<B>) => Type<A | B> }
  : never

/**
 * Decorator exposing Union method on Type.
 */
export const Unionable = <A, T extends Type<A>>(
  type: T
): UnionableType<T> => {
  const unionableType: any = type

  unionableType.or = <S>(rightType: Type<S>) =>
    UnionType(type, rightType)

  return unionableType
}
