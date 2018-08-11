
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

export type PrimitiveConstructor =
  | NumberConstructor
  | StringConstructor
  | BooleanConstructor

  export const isPrimitiveConstructor = (x: any): x is PrimitiveConstructor =>
    x === String || x === Boolean || x === Number

export type IdentifierFromPrimitive<P extends Primitive> = P extends number
  ? 'number'
  : P extends string ? 'string' : 'boolean'

export type PrimitiveFromPrimitiveConstructor<
  P extends PrimitiveConstructor
> = P extends NumberConstructor
  ? number
  : P extends StringConstructor ? string : boolean

//TODO: RENAME!

export function identifierFromPrimitiveConstructor<
  P extends PrimitiveConstructor
>(p: P): IdentifierFromPrimitive<PrimitiveFromPrimitiveConstructor<P>>

export function identifierFromPrimitiveConstructor<
  P extends PrimitiveConstructor
>(p: P) {
  return p === Number ? 'number' : p === String ? 'string' : 'boolean'
}

export type PrimitiveType<P extends Primitive> = GenericType<
  'primitive',
  P,
  IdentifierFromPrimitive<P>
>

/**
 * Primitive Type Creator.
 */
export const PrimitiveType = <C extends PrimitiveConstructor>(
  constructor: C
): PrimitiveType<PrimitiveFromPrimitiveConstructor<C>> => {
  const identifier = identifierFromPrimitiveConstructor(constructor)

  return GenericType(
    'primitive',
    identifier,
    (x: any): x is PrimitiveFromPrimitiveConstructor<C> => {
      return typeof x === identifier
    }
  )
}
