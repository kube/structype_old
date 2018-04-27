
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

interface Schema<T> extends Function {
  Type: T
  (x: any): x is T
  or: <U>(schema: Schema<U>) => Schema<T | U>
  and: <U>(schema: Schema<U>) => Schema<T & U>
}

export const createSchema = <T>(
  test: (x: any) => x is T
): Schema<T> => {
  const schema: any = (x: any) => test(x)

  schema.or = <U>(schema2: Schema<U>): Schema<T | U> =>
    createSchema((x: any): x is T | U => schema(x) || schema2(x))

  schema.and = <U>(schema2: Schema<U>): Schema<T & U> =>
    createSchema((x: any): x is T & U => schema(x) && schema2(x))

  return schema as any
}
