
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
  Type: T
  kind: K
  props: P
  test: (x: any) => x is T
}

export const AbstractType = <K extends string, T, P>(
  kind: K,
  props: P,
  test: (x: any) => x is T
): GenericType<K, T, P> => ({
  // Flag object as Structype for simple recognition
  [STRUCTYPE_FLAG]: true,
  // Type is not meant to be used at runtime
  Type: (null as any) as T,
  kind,
  props,
  test
})

/**
 * Blackbox Type Creator.
 */
export const BlackType = <T>(test: (x: any) => x is T) =>
  AbstractType('black', null, test)

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
  AbstractType(
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
  AbstractType(
    'regex',
    regex,
    (x: any): x is string => {
      return typeof x === 'string' && regex.test(x)
    }
  )

/**
 * TypeProps
 */
type TypeProps = Type | Primitive | RegExp

/**
 * Type From TypeProps
 */
export type TypeFromTypeProps<P extends TypeProps> = P extends Type
  ? P
  : P extends Primitive
    ? LiteralType<P>
    : P extends RegExp ? RegexType : never

/**
 * Type Creator.
 */
export type Type = LiteralType<Primitive> | RegexType

export const isType = (x: any): x is Type =>
  typeof x === 'object' && x[STRUCTYPE_FLAG] === true

export function Type<P extends TypeProps>(props: P): TypeFromTypeProps<P>
export function Type(x: TypeProps) {
  if (isType(x)) {
    x
    return x
  } else if (isPrimitive(x)) {
    return LiteralType(x)
  } else {
    return RegexType(x)
  }
}

/**
 * Union Type.
 */
export const UnionType = <P1 extends TypeProps, P2 extends TypeProps>(
  typeProps1: P1,
  typeProps2: P2
): Type => {
  // Create Types from typeProps
  const type1 = Type(typeProps1)
  const type2 = Type(typeProps2)

  type T1 = typeof type1.Type
  type T2 = typeof type2.Type

  return AbstractType(
    'union',
    [type1, type2],
    (x: any): x is T1 | T2 => {
      return type1.test(x) || type2.test
    }
  )
}
