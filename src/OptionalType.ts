
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { TypeDescription, Type, TypeFromTypeDescription } from './Type'
import { AbstractType } from './AbstractType'
import { Composable } from './Composable'

export type OptionalType<T extends AbstractType = AbstractType> = T & {
  flags: { optional: true }
}

export const setOptional = <T extends AbstractType>(type: T) => {
  type.flags.optional = true
  return type as OptionalType<T>
}

export function OptionalType<D extends TypeDescription>(
  description: D
): OptionalType<Composable<TypeFromTypeDescription<D>>>

export function OptionalType(description: TypeDescription) {
  return setOptional(Type(description)) as any
}
