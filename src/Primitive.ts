
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

/**
 * Primitive.
 */
export type Primitive = string | number | boolean

export const isPrimitive = (x: any): x is Primitive =>
  typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean'
