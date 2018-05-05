
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

export type Schema<T> = {
  Type: T
  test: (x: any) => x is T
  or: <U>(schema: Schema<U>) => Schema<T | U>
  and: <U>(schema: Schema<U>) => Schema<T & U>
}

export const createSchema = <T>(
  test: (x: any) => x is T
): Schema<T> => ({
  // Type is not meant to be used at runtime
  Type: null as any,

  test,

  or: <U>(schema2: Schema<U>): Schema<T | U> =>
    createSchema((x: any): x is T | U => test(x) || schema2.test(x)),

  and: <U>(schema2: Schema<U>): Schema<T & U> =>
    createSchema((x: any): x is T & U => test(x) && schema2.test(x))
})
