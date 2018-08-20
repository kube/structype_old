
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { AbstractType } from '../AbstractType'
import { Type, TypeDescription, StaticTypeFromTypeDescription } from '../Type'
import { OptionalType } from '../Optional'

export interface ObjectDescription {
  [key: string]: TypeDescription
}

// export type StaticTypeFromObjectDescription<P extends ObjectDescription> = {
//   [K in keyof P]: StaticTypeFromTypeDescription<P[K]>
// }

// export type StaticTypeFromObjectDescription<P extends {}> = RequiredTypeProperties<P>

// export type FilterProperties<Predicate extends (prop: any) => boolean>

export type MapProperties<P extends {}> = {

}

export type StaticTypeFromObjectDescription<P extends { [key: string]: any }> = {
  [K in OptionalTypeProperties<P>]: P[K]
}

export type OptionalTypeProperties<T extends {}> = {
  [K in keyof T]: T[K] extends OptionalType ? K : never
}[keyof T]

export type RequiredTypeProperties<T extends {}> = {
  [K in keyof T]: T[K] extends OptionalType ? never : K
}[keyof T]

export interface ObjectType<D extends ObjectDescription>
  extends AbstractType<
      'object',
      StaticTypeFromTypeDescription<D>,
      {},
      { [key: string]: Type }
    > {}

export function ObjectType<D extends ObjectDescription>(
  description: D
): ObjectType<D>

/**
 * Object Type Creator.
 */
export function ObjectType(description: ObjectDescription): ObjectType<any> {
  const properties: { [key: string]: Type } = {}

  for (const key in description) {
    properties[key] = Type(description[key])
  }

  const test = (x: { [key: string]: any }): x is any => {
    for (const key in properties) {
      if (!properties[key].test(x[key])) {
        return false
      }
    }
    return true
  }

  return AbstractType('object', properties, {}, test)
}
