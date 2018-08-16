
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

export type IsOptionalType<
  T extends AbstractType<any, any, any, any>
> = T['flags'] extends { optional: true } ? true : false

export type OptionalType<T extends AbstractType<any, any, any, any>> = T & {
  flags: {
    optional: true
  }
}

export const setOptional = <T extends AbstractType<any, any, any, any>>(
  type: T
): OptionalType<T> => {
  type.flags.optional = true
  return type
}

export const Optional = <D extends TypeDescription>(
  description: TypeDescription
): OptionalType<TypeFromTypeDescription<D>> =>
  setOptional(Type(description)) as any
