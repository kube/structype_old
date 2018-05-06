
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Schema, createSchema, isSchema } from '../Schema'

type ObjectSchemaDescription = {
  [key: string]: Schema<any> | ObjectSchemaDescription
}

// Copied to enable expansion in depth of number of copies,
// as recursive types are lazily-evaluated in TypeScript.

export type TypeFromObjectSchemaDescription<
  D extends ObjectSchemaDescription
> = {
  [K in keyof D]: D[K] extends Schema<infer T>
    ? T
    : D[K] extends ObjectSchemaDescription
      ? TypeFromObjectSchemaDescription_<D[K]>
      : never
}

type TypeFromObjectSchemaDescription_<
  D extends ObjectSchemaDescription
> = {
  [K in keyof D]: D[K] extends Schema<infer T>
    ? T
    : D[K] extends ObjectSchemaDescription
      ? TypeFromObjectSchemaDescription__<D[K]>
      : never
}

type TypeFromObjectSchemaDescription__<
  D extends ObjectSchemaDescription
> = {
  [K in keyof D]: D[K] extends Schema<infer T>
    ? T
    : D[K] extends ObjectSchemaDescription
      ? TypeFromObjectSchemaDescription<D[K]>
      : never
}

/**
 * Create an Object Schema validator and type,
 * from a description of this object.
 */
export const ObjectSchema = <
  D extends ObjectSchemaDescription,
  T extends TypeFromObjectSchemaDescription<D>
>(
  schemaDescription: D
): Schema<T> => {
  const schemaRecord: { [key: string]: Schema<any> } = {}

  // Populate schemaRecord with a schema for each property
  for (const key in schemaDescription) {
    const value = schemaDescription[key]
    schemaRecord[key] = isSchema(value)
      ? value
      : ObjectSchema(value as ObjectSchemaDescription)
  }

  return createSchema((x: any): x is T => {
    if (typeof x !== 'object') {
      return false
    }

    // Simply check that all sub-schemas match in the input object
    for (const key in schemaRecord) {
      if (!schemaRecord[key].test(x[key])) {
        return false
      }
    }
    return true
  })
}
