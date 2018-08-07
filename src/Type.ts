
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
import { LiteralType } from './LiteralType'
import { ObjectType, ObjectDescription } from './ObjectType'
import { UnionType } from './UnionType'

export type StaticType = Primitive | { [key: string]: StaticType }

/**
 * TypeProps
 */
export type TypeProps = Type | Primitive | RegExp | ObjectDescription

/**
 * Type From TypeProps.
 */
export type TypeFromTypeProps<P extends TypeProps> = P extends Type
  ? P
  : P extends Primitive
    ? LiteralType<P>
    : P extends RegExp
      ? RegexType
      : P extends ObjectDescription
        ? ObjectType<StaticTypeFromObjectDescription<P>>
        : never

export type StaticTypeFromObjectDescription<P extends ObjectDescription> = {
  [K in keyof P]: StaticTypeFromTypeProps<P[K]>
}

export type StaticTypeFromTypeProps<
  P extends TypeProps
> = P extends GenericType<any, infer T, any>
  ? T
  : P extends Primitive
    ? P
    : P extends RegExp
      ? string
      : P extends ObjectDescription ? StaticTypeFromObjectDescription<P> : never

export type Type =
  | LiteralType<Primitive>
  | RegexType
  | ObjectType<any>
  | UnionType<any, any>

export function Type<P extends TypeProps>(props: P): TypeFromTypeProps<P>

/**
 * Type Creator.
 */
export function Type(x: TypeProps): Type {
  if (isType(x)) {
    return x
  } else if (isPrimitive(x)) {
    return LiteralType(x)
  } else if (x instanceof RegExp) {
    return RegexType(x)
  } else {
    return ObjectType(x)
  }
}

export const isType = (x: any): x is Type => x && x[STRUCTYPE_FLAG] === true
