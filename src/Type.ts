
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

const STRUCTYPE_FLAG = '__STRUCTYPE__'

/**
 * Generic Type Creator.
 */
export type GenericType<K extends string, T, P> = {
  [STRUCTYPE_FLAG]: true
  type: T
  kind: K
  // TODO: Rename props to something else
  // to avoid ambiguity with TypeProps
  props: P
  test: (x: any) => x is T
}

export const GenericType = <K extends string, T, P>(
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
export const BlackType = <T>(test: (x: any) => x is T) =>
  GenericType('black', null, test)

/**
 * Primitive.
 */
type Primitive = string | boolean | number

const isPrimitive = (x: any): x is Primitive =>
  typeof x === 'string' ||
  typeof x === 'boolean' ||
  typeof x === 'number'

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
type ObjectType = GenericType<
  'object',
  {},
  {
    [key: string]: Type
  }
>

type ObjectDescription = {
  [key: string]: TypeProps
}

export function ObjectType(description: ObjectDescription): ObjectType

export function ObjectType(description: ObjectDescription): ObjectType {
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
      : P extends ObjectDescription ? ObjectType : never

/**
 * Type Creator.
 */
export type Type = LiteralType<Primitive> | RegexType | ObjectType

export const isType = (x: any): x is Type =>
  x && x[STRUCTYPE_FLAG] === true

export function Type<P extends TypeProps>(
  props: P
): TypeFromTypeProps<P>

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
export type UnionType<
  P1 extends TypeProps = TypeProps,
  P2 extends TypeProps = TypeProps
> = GenericType<
  'union',
  TypeFromTypeProps<P1>['type'] | TypeFromTypeProps<P2>['type'],
  {
    left: TypeFromTypeProps<P1>
    right: TypeFromTypeProps<P2>
  }
>

export function UnionType<P1 extends TypeProps, P2 extends TypeProps>(
  leftTypeProps: P1,
  rightTypeProps: P2
): UnionType<P1, P2>

export function UnionType(
  leftTypeProps: TypeProps,
  rightTypeProps: TypeProps
): UnionType {
  // Create Types from TypeProps
  const leftType = Type(leftTypeProps)
  const rightType = Type(rightTypeProps)

  type ResultType = typeof leftType.type | typeof rightType.type

  return GenericType(
    'union',
    {
      left: leftType,
      right: rightType
    },
    (x: any): x is ResultType => {
      return leftType.test(x) || rightType.test(x)
    }
  )
}
