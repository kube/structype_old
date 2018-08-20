
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type, TypeDescription, TypeFromTypeDescription } from './Type'
import { UnionType } from './UnionType'

export type Composable<T extends Type> = T & {
  or: <R extends TypeDescription>(
    rightType: R
  ) => UnionType<T, TypeFromTypeDescription<R>>
}

// DECORATION for COMPOSITION using UNION and INTERSECTION TYPES
export const Composable = <T extends Type>(type: T): Composable<T> => {
  const output = type as Composable<T>
  if (!output.or) {
    output.or = <R extends TypeDescription>(rightType: R) =>
      UnionType(type, rightType) as any
  }
  return output
}
