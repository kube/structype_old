
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { GenericType } from './GenericType'
import { Type, TypeProps, StaticTypeFromTypeProps } from './Type'

export type ObjectDescription = {
  // TypeProps can't be used, as Primitive won't be infered as literal.
  // https://github.com/Microsoft/TypeScript/issues/26158
  [key: string]: TypeProps
}

export type StaticTypeFromObjectDescription<P extends ObjectDescription> = {
  [K in keyof P]: StaticTypeFromTypeProps<P[K]>
}

export interface ObjectType<D extends ObjectDescription>
  extends GenericType<
      'object',
      StaticTypeFromTypeProps<D>,
      { [key: string]: Type }
    > {}

export function ObjectType<D extends ObjectDescription>(
  description: D
): ObjectType<D>

/**
 * Object Type Creator.
 */
export function ObjectType(description: ObjectDescription): ObjectType<any> {
  const props: { [key: string]: Type } = {}

  for (const key in description) {
    props[key] = Type(description[key])
  }

  const test = (x: { [key: string]: any }): x is any => {
    for (const key in props) {
      if (!props[key].test(x[key])) {
        return false
      }
    }
    return true
  }

  return GenericType('object', props, test)
}
