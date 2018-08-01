
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

const STRUCTYPE_FLAG = '__STRUCTYPE__'

export type StaticType = Primitive | { [key: string]: StaticType }

/**
 * Generic Type Creator.
 */
export type GenericType<K extends string, T extends StaticType, P> = {
  [STRUCTYPE_FLAG]: true
  type: T
  kind: K
  // TODO: Rename props to something else
  // to avoid ambiguity with TypeProps
  props: P
  test: (x: any) => x is T
}

export const GenericType = <
  K extends string,
  T extends StaticType,
  P
>(
  kind: K,
  props: P,
  test: (x: any) => x is T
): GenericType<K, T, P> => ({
  [STRUCTYPE_FLAG]: true,
  type: (null as any) as T,
  kind,
  props,
  test
})

/**
 * Blackbox Type Creator.
 *
 * A Black Type is a Type for which we cannot really assert
 * the static type.
 *
 * e.g. Integer, Positive, Odd numbers, etc...
 */
export const BlackType = <T extends StaticType>(
  test: (x: any) => x is T
) => GenericType('black', null, test)

/**
 * Primitive.
 */
type Primitive = string | number | boolean

const isPrimitive = (x: any): x is Primitive =>
  typeof x === 'string' ||
  typeof x === 'number' ||
  typeof x === 'boolean'

/**
 * Literal Type Creator.
 */
type LiteralType<L extends Primitive> = GenericType<'literal', L, L>

export const LiteralType = <L extends Primitive>(
  literal: L
): LiteralType<L> =>
  GenericType(
    'literal',
    literal,
    (x: any): x is L => {
      return x === literal
    }
  )

/**
 * Regex Type Creator.
 */
type RegexType = GenericType<'regex', string, RegExp>

export const RegexType = (regex: RegExp): RegexType =>
  GenericType(
    'regex',
    regex,
    (x: any): x is string => {
      return typeof x === 'string' && regex.test(x)
    }
  )

/**
 * Object Type Creator.
 */
type ObjectDescription = {
  [key: string]: TypeProps
}

interface ObjectType<D extends ObjectDescription>
  extends GenericType<
      'object',
      StaticTypeFromTypeProps<D>,
      { [key: string]: Type }
    > {}

export function ObjectType<D extends ObjectDescription>(
  description: D
): ObjectType<D>

export function ObjectType(
  description: ObjectDescription
): ObjectType<any> {
  const props: { [key: string]: Type } = {}

  for (const key in description) {
    props[key] = Type(description[key])
  }

  const test = (x: { [key: string]: any }): x is any => {
    for (const key in props) {
      if (!props[key].test(x[key])) {
        return false
      }
    }
    return true
  }

  return GenericType('object', props, test)
}

/**
 * TypeProps
 */
type TypeProps = Type | Primitive | RegExp | ObjectDescription

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

export type StaticTypeFromObjectDescription<
  P extends ObjectDescription
> = { [K in keyof P]: StaticTypeFromTypeProps<P[K]> }

export type StaticTypeFromTypeProps<
  P extends TypeProps
> = P extends GenericType<any, infer T, any>
  ? T
  : P extends Primitive
    ? P
    : P extends RegExp
      ? string
      : P extends ObjectDescription
        ? StaticTypeFromObjectDescription<P>
        : never

/**
 * Type Creator.
 */
export type Type =
  // `any` is used to prevent circular references, as `TypeProps` references `Type`
  | LiteralType<Primitive>
  | RegexType
  | ObjectType<any>
  | UnionType<any, any>

export const isType = (x: any): x is Type =>
  x && x[STRUCTYPE_FLAG] === true

export function Type<P extends TypeProps>(
  props: P
): TypeFromTypeProps<P>


///<TEST>

declare function TestType <P extends any>(p: P): P

const Paco = TestType({ firstName: 'Paco', lastName: 'de Lucia' })

//</TEST>


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

/**
 * Union Type Creator.
 */
export interface UnionType<
  P1 extends TypeProps,
  P2 extends TypeProps
>
  extends GenericType<
      'union',
      StaticTypeFromTypeProps<P1> | StaticTypeFromTypeProps<P2>,
      {
        left: TypeFromTypeProps<P1>
        right: TypeFromTypeProps<P2>
      }
    > {}

export function UnionType<P1 extends TypeProps, P2 extends TypeProps>(
  leftTypeProps: P1,
  rightTypeProps: P2
): UnionType<P1, P2> {
  // Create Types from TypeProps
  const leftType = Type(leftTypeProps)
  const rightType = Type(rightTypeProps)

  return GenericType(
    'union',
    {
      left: leftType,
      right: rightType
    },
    (x: any): x is any => {
      return leftType.test(x) || rightType.test(x)
    }
  )
}

/**
 * Intersection Type Creator.
 */
export interface IntersectionType<
  P1 extends TypeProps,
  P2 extends TypeProps
>
  extends GenericType<
      'intersection',
      StaticTypeFromTypeProps<P1> & StaticTypeFromTypeProps<P2>,
      {
        left: TypeFromTypeProps<P1>
        right: TypeFromTypeProps<P2>
      }
    > {}
