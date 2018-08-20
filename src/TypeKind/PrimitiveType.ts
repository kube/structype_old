
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
  C extends PrimitiveConstructor
>(constructor: C): IdentifierFromPrimitive<PrimitiveFromPrimitiveConstructor<C>>

export function identifierFromPrimitiveConstructor<
  C extends PrimitiveConstructor
>(c: C) {
  return c === Number ? 'number' : c === String ? 'string' : 'boolean'
}

export type PrimitiveType<P extends Primitive> = AbstractType<
  'primitive',
  P,
  {},
  IdentifierFromPrimitive<P>
>

/**
 * Primitive Type Creator.
 */
export const PrimitiveType = <C extends PrimitiveConstructor>(
  constructor: C
): PrimitiveType<PrimitiveFromPrimitiveConstructor<C>> => {
  const identifier = identifierFromPrimitiveConstructor(constructor)

  return AbstractType(
    'primitive',
    identifier,
    {},
    (x: any): x is PrimitiveFromPrimitiveConstructor<C> => {
      return typeof x === identifier
    }
  )
}
