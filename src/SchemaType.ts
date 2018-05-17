
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
import { RawType } from './RawType'

export type SchemaDescription = {
  [key: string]: Type<any> | SchemaDescription
}

/**
 * Get expected static type from a SchemaDescription.
 */
export type StaticTypeFromSchemaDescription<
  D extends SchemaDescription
> = {
  [K in keyof D]: D[K] extends Type<infer T>
    ? T
    : D[K] extends SchemaDescription
      ? StaticTypeFromSchemaDescription_<D[K]>
      : never
}

// Copied to force evaluation of recursive type,
// and see associated static type in a depth of 4
export type StaticTypeFromSchemaDescription_<
  D extends SchemaDescription
> = {
  [K in keyof D]: D[K] extends Type<infer T>
    ? T
    : D[K] extends SchemaDescription
      ? StaticTypeFromSchemaDescription__<D[K]>
      : never
}

export type StaticTypeFromSchemaDescription__<
  D extends SchemaDescription
> = {
  [K in keyof D]: D[K] extends Type<infer T>
    ? T
    : D[K] extends SchemaDescription
      ? StaticTypeFromSchemaDescription___<D[K]>
      : never
}

export type StaticTypeFromSchemaDescription___<
  D extends SchemaDescription
> = {
  [K in keyof D]: D[K] extends Type<infer T>
    ? T
    : D[K] extends SchemaDescription
      ? StaticTypeFromSchemaDescription<D[K]>
      : never
}

/**
 * Create a Type from an Object Description.
 */
export const SchemaType = <
  D extends SchemaDescription,
  T extends StaticTypeFromSchemaDescription<D>
>(
  schemaDescription: D
) => {
  // Record containing all key/Type couples
  const schemaRecord: { [key: string]: Type<any> } = {}

  // Populate schemaRecord with a Type for each property
  for (const key in schemaDescription) {
    const value: SchemaDescription[keyof SchemaDescription] =
      schemaDescription[key]

    schemaRecord[key] = isType(value) ? value : SchemaType(value)
  }

  return RawType((x: any): x is T => {
    if (typeof x !== 'object') {
      return false
    }

    // Simply check that all nested types match in the input object
    for (const key in schemaRecord) {
      if (!schemaRecord[key].test(x[key])) {
        return false
      }
    }
    return true
  })
}
