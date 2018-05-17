
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type } from './types'
import { isType } from './isType'
import { Primitive } from './Primitives'
import { LiteralType } from './LiteralType'
import {
  SchemaType,
  SchemaDescription,
  StaticTypeFromSchemaDescription
} from './SchemaType'

export type GenericTypeProps =
  | Type<any>
  | Primitive
  | SchemaDescription

export function GenericType<T extends Primitive>(x: T): Type<T>
export function GenericType<T>(x: Type<T>): Type<T>
export function GenericType<D extends SchemaDescription>(
  x: D
): Type<StaticTypeFromSchemaDescription<D>>

/**
 * Creates a Type by calling Type Creator associated to input type.
 */
export function GenericType(x: GenericTypeProps) {
  if (isType(x)) {
    return x
  } else if (Primitive.test(x)) {
    return LiteralType(x)
  } else {
    return SchemaType(x)
  }
}
