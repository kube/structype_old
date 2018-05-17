
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { RawType } from './RawType'
import { UnionType } from './UnionType'

export const Boolean = RawType((x: any): x is boolean => {
  return typeof x === 'boolean'
})

export const Number = RawType((x: any): x is number => {
  return typeof x === 'number'
})

export const String = RawType((x: any): x is string => {
  return typeof x === 'string'
})

export const Primitive = UnionType(Boolean, UnionType(String, Number))
export type Primitive = typeof Primitive.type

export const Null = RawType((x: any): x is null => {
  return x === null
})

export const Undefined = RawType((x: any): x is undefined => {
  return typeof x === 'undefined'
})
