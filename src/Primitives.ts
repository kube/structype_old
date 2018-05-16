
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { createType } from './createType'

export const Boolean = createType((x: any): x is boolean => {
  return typeof x === 'boolean'
})

export const Number = createType((x: any): x is number => {
  return typeof x === 'number'
})

export const String = createType((x: any): x is string => {
  return typeof x === 'string'
})
