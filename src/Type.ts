
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

export function Type<P extends TypeProps>(props: P): TypeFromTypeProps<P>

/**
 * Type Creator.
 */
export function Type(x: TypeProps): Type {
  if (isType(x)) {
    return x
  } else if (isPrimitiveConstructor(x)) {
    return PrimitiveType(x)
  } else if (isPrimitive(x)) {
    return LiteralType(x)
  } else if (x instanceof RegExp) {
    return RegexType(x)
  } else {
    return ObjectType(x)
  }
}

export const isType = (x: any): x is Type => x && x[STRUCTYPE_FLAG] === true
