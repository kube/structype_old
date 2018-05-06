
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

/**
 * To prevent coupling a schema to the library,
 * we use a simple property flag to mark a schema
 * to be able to detect it at runtime.
 */
const SCHEMA_IDENTIFIER = '__structypeSchema__'

export type Schema<T> = {
  Type: T
  test: (x: any) => x is T
  or: <U>(schema: Schema<U>) => Schema<T | U>
  and: <U>(schema: Schema<U>) => Schema<T & U>
}

const markAsSchema = (schema: any) => {
  schema[SCHEMA_IDENTIFIER] = true
  return schema
}

export const isSchema = (obj: any): obj is Schema<any> =>
  obj[SCHEMA_IDENTIFIER] === true

export const createSchema = <T>(
  test: (x: any) => x is T
): Schema<T> =>
  markAsSchema({
    // Type is not meant to be used at runtime
    Type: null as any,

    test,

    or: <U>(schema2: Schema<U>): Schema<T | U> =>
      createSchema(
        (x: any): x is T | U => test(x) || schema2.test(x)
      ),

    and: <U>(schema2: Schema<U>): Schema<T & U> =>
      createSchema((x: any): x is T & U => test(x) && schema2.test(x))
  })
