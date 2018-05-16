
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Type } from './types'
import { isType } from './isType'
import { createType } from './createType'

export type SchemaDescription = {
  [key: string]: Type<any> | SchemaDescription
}

/**
 * Get expected static type from a SchemaDescription.
 */
type TypeFromSchemaDescription<D extends SchemaDescription> = {
  [K in keyof D]: D[K] extends Type<infer T>
    ? T
    : D[K] extends SchemaDescription
      ? TypeFromSchemaDescription<D[K]>
      : never
}

/**
 * Create an Object Type from an object description.
 */
export const SchemaType = <
  D extends SchemaDescription,
  T extends TypeFromSchemaDescription<D>
>(
  schemaDescription: D
): Type<T> => {
  // Record containing all key/Type couples
  const schemaRecord: { [key: string]: Type<any> } = {}

  // Populate schemaRecord with a Type for each property
  for (const key in schemaDescription) {
    const value: SchemaDescription[keyof SchemaDescription] =
      schemaDescription[key]

    schemaRecord[key] = isType(value) ? value : SchemaType(value)
  }

  return createType((x: any): x is T => {
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
