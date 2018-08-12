
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Primitive, isPrimitive } from './Primitive'
import { GenericType, STRUCTYPE_FLAG } from './GenericType'
import { RegexType } from './RegexType'
import { UnionType } from './UnionType'
import { LiteralType } from './LiteralType'
import {
  PrimitiveType,
  PrimitiveConstructor,
  PrimitiveFromPrimitiveConstructor,
  isPrimitiveConstructor
} from './PrimitiveType'
import {
  ObjectType,
  ObjectDescription,
  StaticTypeFromObjectDescription
} from './ObjectType'
import { Composable } from './Composable'

export type StaticType = Primitive | { [key: string]: StaticType }

/**
 * TypeProps
 */
export type TypeProps =
  | Type
  | RegExp
  | Primitive
  | PrimitiveConstructor
  | ObjectDescription

/**
 * Type From TypeProps.
 */
export type TypeFromTypeProps<P extends TypeProps> = P extends Type
  ? P
  : P extends PrimitiveConstructor
    ? PrimitiveType<PrimitiveFromPrimitiveConstructor<P>>
    : P extends Primitive
      ? LiteralType<P>
      : P extends RegExp
        ? RegexType
        : P extends ObjectDescription
          ? ObjectType<StaticTypeFromObjectDescription<P>>
          : never

export type StaticTypeFromTypeProps<
  P extends TypeProps
> = P extends GenericType<any, infer T, any>
  ? T
  : P extends PrimitiveConstructor
    ? PrimitiveFromPrimitiveConstructor<P>
    : P extends Primitive
      ? P
      : P extends RegExp
        ? string
        : P extends ObjectDescription
          ? StaticTypeFromObjectDescription<P>
          : never

export type Type =
  | LiteralType<Primitive>
  | RegexType
  | ObjectType<any>
  | UnionType<any, any>
  | PrimitiveType<any>

export function Type<P extends TypeProps>(
  props: P
): Composable<TypeFromTypeProps<P>>

/**
 * Type Creator.
 */
export function Type(x: TypeProps) {
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

export const isType = (x: any): x is Type => x && x[STRUCTYPE_FLAG] === true
