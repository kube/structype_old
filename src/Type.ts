
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

/**
 * To prevent coupling a Type to the library,
 * we use a simple property string to mark a Type
 * to be able to detect it at runtime.
 */
const TYPE_IDENTIFIER = '__structypeType__'

export type Type<T> = {
  Type: T
  test: (x: any) => x is T
  or: <U>(type: Type<U>) => Type<T | U>
  and: <U>(type: Type<U>) => Type<T & U>
}

const markAsType = (type: any) => {
  type[TYPE_IDENTIFIER] = true
  return type
}

export const isType = (obj: any): obj is Type<any> =>
  obj[TYPE_IDENTIFIER] === true

export const Type = <T>(test: (x: any) => x is T): Type<T> =>
  markAsType({
    // Type is not meant to be used at runtime
    Type: null as any,

    test,

    or: <U>(type2: Type<U>): Type<T | U> =>
      Type((x: any): x is T | U => test(x) || type2.test(x)),

    and: <U>(type2: Type<U>): Type<T & U> =>
      Type((x: any): x is T & U => test(x) && type2.test(x))
  })
