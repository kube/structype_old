
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { AbstractType } from './AbstractType'
import { Type, TypeDescription, StaticTypeFromTypeDescription } from './Type'

export type ObjectDescription = {
  [key: string]: TypeDescription
}

export type StaticTypeFromObjectDescription<P extends ObjectDescription> = {
  [K in keyof P]: StaticTypeFromTypeDescription<P[K]>
}

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
