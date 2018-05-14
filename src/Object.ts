
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type, isType } from './Type'

type ObjectTypeDescription = {
  [key: string]: Type<any> | ObjectTypeDescription
}

// Copied to enable expansion in depth of number of copies,
// as recursive types are lazily-evaluated in TypeScript.

export type TypeFromObjectTypeDescription<
  D extends ObjectTypeDescription
> = {
  [K in keyof D]: D[K] extends Type<infer T>
    ? T
    : D[K] extends ObjectTypeDescription
      ? TypeFromObjectTypeDescription_<D[K]>
      : never
}

type TypeFromObjectTypeDescription_<
  D extends ObjectTypeDescription
> = {
  [K in keyof D]: D[K] extends Type<infer T>
    ? T
    : D[K] extends ObjectTypeDescription
      ? TypeFromObjectTypeDescription__<D[K]>
      : never
}

type TypeFromObjectTypeDescription__<
  D extends ObjectTypeDescription
> = {
  [K in keyof D]: D[K] extends Type<infer T>
    ? T
    : D[K] extends ObjectTypeDescription
      ? TypeFromObjectTypeDescription<D[K]>
      : never
}

/**
 * Create an Object Type from an object description.
 */
export const ObjectType = <
  D extends ObjectTypeDescription,
  T extends TypeFromObjectTypeDescription<D>
>(
  schemaDescription: D
): Type<T> => {
  const schemaRecord: { [key: string]: Type<any> } = {}

  // Populate schemaRecord with a Type for each property
  for (const key in schemaDescription) {
    const value = schemaDescription[key]
    schemaRecord[key] = isType(value)
      ? value
      : ObjectType(value as ObjectTypeDescription)
  }

  return Type((x: any): x is T => {
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
