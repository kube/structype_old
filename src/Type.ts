
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { AbstractType, STRUCTYPE_FLAG } from './AbstractType'
import { RegexType } from './TypeKind/RegexType'
import { UnionType } from './TypeKind/UnionType'
import { LiteralType } from './TypeKind/LiteralType'
import {
  PrimitiveType,
  PrimitiveConstructor,
  PrimitiveFromPrimitiveConstructor,
  isPrimitiveConstructor
} from './TypeKind/PrimitiveType'
import {
  ObjectType,
  ObjectDescription,
  StaticTypeFromObjectDescription
} from './TypeKind/ObjectType'
import { Composable } from './Composable'

export type StaticType = Primitive | { [key: string]: StaticType }

/**
 * Primitive.
 */
export type Primitive = string | number | boolean

export const isPrimitive = (x: any): x is Primitive =>
  typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean'

/**
 * TypeDescription
 */
export type TypeDescription =
  | Type
  | RegExp
  | Primitive
  | PrimitiveConstructor
  | ObjectDescription

/**
 * Type From TypeDescription.
 */
export type TypeFromTypeDescription<D extends TypeDescription> = D extends Type
  ? D
  : D extends PrimitiveConstructor
    ? PrimitiveType<PrimitiveFromPrimitiveConstructor<D>>
    : D extends Primitive
      ? LiteralType<D>
      : D extends RegExp
        ? RegexType
        : D extends ObjectDescription
          ? ObjectType<StaticTypeFromObjectDescription<D>>
          : never

export type StaticTypeFromTypeDescription<
  D extends TypeDescription
> = D extends AbstractType<any, infer T, any, any>
  ? T
  : D extends PrimitiveConstructor
    ? PrimitiveFromPrimitiveConstructor<D>
    : D extends Primitive
      ? D
      : D extends RegExp
        ? string
        : D extends ObjectDescription
          ? StaticTypeFromObjectDescription<D>
          : never

export type Type =
  | LiteralType<Primitive>
  | RegexType
  | ObjectType<any>
  | UnionType<any, any>
  | PrimitiveType<any>

export function Type<D extends TypeDescription>(
  description: D
): Composable<TypeFromTypeDescription<D>>

/**
 * Type Creator.
 */
export function Type(x: TypeDescription) {
  return Composable(
    isType(x)
      ? x
      : isPrimitiveConstructor(x)
        ? PrimitiveType(x)
        : isPrimitive(x)
          ? LiteralType(x)
          : x instanceof RegExp
            ? RegexType(x)
            : ObjectType(x)
  )
}

export function isType (x: any): x is Type {
  return x && x[STRUCTYPE_FLAG] === true
}
